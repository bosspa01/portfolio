# Deployment plan

This repository contains two independently deployed Node.js applications. Deployment is pending owner review; committing or pushing the repository does not publish a live site by itself unless hosting integrations have separately been configured.

## Proposed architecture

- Frontend: Vercel project with Root Directory set to frontend, framework Next.js.
- Backend: Render Web Service with Root Directory set to backend, runtime Node.js.
- Runtime: Node.js 24 LTS (.node-version is provided in each application).
- No database or persistent application storage is required.

Official references: [Vercel monorepos](https://vercel.com/docs/monorepos), [Vercel environment variables](https://vercel.com/docs/environment-variables), [Render web services](https://render.com/docs/web-services), [Render health checks](https://render.com/docs/health-checks).

## Backend settings

| Setting | Value |
| --- | --- |
| Root Directory | backend |
| Build command | npm ci --omit=dev |
| Start command | npm start |
| Health Check Path | /api/health |
| Auto deploy | Keep disabled until the owner approves publishing |

Environment variables:

```dotenv
NODE_ENV=production
FRONTEND_ORIGINS=https://YOUR_FRONTEND_HOST
TRUST_PROXY=1
SMTP_HOST=YOUR_SMTP_HOST
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=YOUR_SMTP_USER
SMTP_PASS=YOUR_SMTP_PASSWORD
CONTACT_TO_EMAIL=YOUR_CONTACT_ADDRESS
```

Use the platform's PORT value. TRUST_PROXY=1 assumes exactly one trusted proxy hop; check the actual platform path before enabling it. For implicit TLS on port 465, use SMTP_SECURE=true. Store real credentials in the hosting dashboard, never in Git. Confirm the chosen host and plan permit outbound SMTP on the provider's port before deploying the contact service.

The rate limiter stores counters in memory per process. This setup suits one backend instance. Multiple instances or stronger abuse protection require a shared rate-limit store. CORS is a browser policy, not authentication or complete spam protection.

GET /api/health checks that Express is responding. It does not verify SMTP credentials or confirm email delivery.

## Frontend settings

| Setting | Value |
| --- | --- |
| Root Directory | frontend |
| Framework | Next.js |
| Install command | npm ci |
| Build command | npm run build |
| Output Directory | Framework default |

Set API_URL to the backend HTTPS origin, without /api or a trailing slash, for example https://YOUR_BACKEND_HOST. Configure it before building: rewrites are generated from this value. Changing it requires a new frontend build/deployment.

Use the same intended frontend origin in backend FRONTEND_ORIGINS. If enabling preview deployments, add only intended preview origins; do not broaden CORS to every website.

## Release sequence after approval

1. Verify repository visibility, screenshots, public profile details and the commit selected for release.
2. Confirm hosting accounts, plan, region and permitted outbound SMTP. Do not accept paid upgrades without owner approval.
3. Deploy the backend and check its HTTPS /api/health endpoint.
4. Set frontend API_URL to that backend origin, deploy the frontend, then set the exact frontend origin on the backend.
5. Check desktop/mobile layout, language switch, project filters, gallery navigation and source links.
6. Send one owner-approved test enquiry and verify receipt in the destination inbox; SMTP connection verification alone is not end-to-end delivery proof.
7. Confirm invalid forms fail, the rate limit responds with 429 and .env files cannot be downloaded.

The website remains viewable with a direct email link if the backend is unavailable, but form delivery should not be described as ready until the deployed flow is tested.

## Rollback

Redeploy a previously verified commit using the hosting dashboard. Keep production credentials in hosting secrets. Do not erase repository history or local project files to roll back a release.
