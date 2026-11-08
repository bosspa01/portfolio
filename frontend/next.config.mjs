const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    // ในเครื่อง: หน้าเว็บ 3000 ติดต่อหลังบ้าน 4000 โดยใช้ /api/contact
    const api = process.env.API_URL || 'http://localhost:4000';
    return [{ source: '/api/:path*', destination: `${api}/api/:path*` }];
  },
};
export default nextConfig;
