import { ArrowUpRight } from "lucide-react";

const ProjectArtwork = ({ variant }) => {
  if (variant === "commerce") {
    return (
      <div className="art art-commerce">
        <div className="art-grid" />
        <div className="commerce-browser">
          <div className="browser-head">
            <span className="traffic">
              <i />
              <i />
              <i />
            </span>
            <span className="browser-url">geargeek.store / shop</span>
            <span className="tiny-cross">+</span>
          </div>
          <div className="shop-nav">
            <b>
              GEAR<span>GEEK.</span>
            </b>
            <span>
              HOME&nbsp;&nbsp; / &nbsp;&nbsp;SHOP&nbsp;&nbsp; /
              &nbsp;&nbsp;ABOUT
            </span>
            <span className="shop-cart">BAG (2)</span>
          </div>
          <div className="shop-body">
            <div className="shop-caption">
              PLAY BEYOND LIMITS<em>PREMIUM SETUP / 01</em>
            </div>
            <div className="shop-main">
              <div className="headphone">
                <span className="headphone-top" />
                <i className="ear ear-left" />
                <i className="ear ear-right" />
                <span className="headphone-shine" />
              </div>
            </div>
            <div className="shop-bottom">
              <span>WIRELESS / SERIES X</span>
              <b>
                EXPLORE <ArrowUpRight size={12} />
              </b>
            </div>
          </div>
        </div>
        <span className="art-corner-label">FULL-STACK / COMMERCE</span>
      </div>
    );
  }
  if (variant === "solar") {
    return (
      <div className="art art-solar">
        <div className="art-grid" />
        <div className="sun-halo halo-one" />
        <div className="sun-halo halo-two" />
        <div className="sun-halo halo-three" />
        <div className="sun-core">
          <span>✳</span>
        </div>
        <div className="solar-head">
          <span className="status-light" /> SOLAR INTELLIGENCE{" "}
          <span>SYS / 002</span>
        </div>
        <div className="solar-query">
          <span className="solar-prefix">›</span>
          <span>How does solar energy work?</span>
          <i />
        </div>
        <div className="solar-bottom">
          <span>RETRIEVAL AUGMENTED GENERATION</span>
          <span>
            AI CONNECTED&nbsp; <i className="status-light" />
          </span>
        </div>
      </div>
    );
  }
  if (variant === "anime") {
    return (
      <div className="art art-anime">
        <div className="art-grid" />
        <div className="chat-window">
          <div className="chat-title">
            <span className="discord-dot">✦</span>
            <b># anime-recommendations</b>
            <span>● ● ●</span>
          </div>
          <div className="chat-message">
            <span className="chat-avatar">B</span>
            <div>
              <b>
                Boss Bot <small>BOT</small>
              </b>
              <p>Looking for your next favorite anime?</p>
            </div>
          </div>
          <div className="anime-pick">
            <span className="anime-cover">ア</span>
            <div>
              <small>RECOMMENDATION #001</small>
              <b>Your next obsession.</b>
              <span>Discover stories you'll love.</span>
              <span className="pick-chip">✧ MATCH FOUND</span>
            </div>
          </div>
          <div className="chat-typing">
            <span />
            <span />
            <span /> &nbsp; Boss Bot is typing...
          </div>
        </div>
        <span className="art-corner-label">RECOMMENDATION ENGINE</span>
      </div>
    );
  }
  if (variant === "meeting") {
    return (
      <div className="art art-meeting">
        <div className="art-grid" />
        <div className="audio-window">
          <div className="audio-top">
            <span>VOICE NOTE / 00:42</span>
            <span className="audio-rec">● LIVE INPUT</span>
          </div>
          <div className="waveform">
            {[
              22, 35, 47, 27, 56, 70, 41, 30, 54, 78, 62, 35, 28, 60, 86, 53,
              36, 58, 73, 40, 22, 49, 64, 32, 26, 44, 35,
            ].map((h, i) => {
              return (
                <span
                  key={i}
                  style={{ height: `${h}%`, animationDelay: `${i * 0.04}s` }}
                />
              );
            })}
          </div>
          <div className="audio-divider">
            <span>VOICE</span>
            <span>✦ AI PROCESSING</span>
            <span>SUMMARY</span>
          </div>
          <div className="summary-lines">
            <b>Meeting Summary</b>
            <span />
            <span />
            <span />
          </div>
        </div>
        <span className="art-corner-label">VOICE → INSIGHTS</span>
      </div>
    );
  }
  return (
    <div className="art art-food">
      <div className="art-grid" />
      <div className="food-phone">
        <div className="food-phone-top">
          <span>9:41</span>
          <span>●●●</span>
        </div>
        <div className="food-hi">
          Good food.
          <br />
          <em>Good mood.</em>
        </div>
        <div className="food-search">⌕ &nbsp; What are you craving?</div>
        <div className="food-menu">
          <div className="food-disc pizza">✦</div>
          <div className="food-disc burger">≋</div>
          <div className="food-disc drink">◉</div>
        </div>
        <div className="food-menu-label">
          <span>Pizza</span>
          <span>Burgers</span>
          <span>Drinks</span>
        </div>
        <div className="food-banner">
          YOUR ORDER <b>ON THE WAY →</b>
        </div>
      </div>
      <span className="art-corner-label">ORDER / DELIVER / ENJOY</span>
    </div>
  );
};

export default ProjectArtwork;
