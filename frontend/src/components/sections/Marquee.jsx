const Marquee = () => {
  return (
    <div className="marquee-section" aria-label="Technologies">
      <div className="marquee-track">
        {Array.from({ length: 2 }).map((_, i) => {
          return (
            <div className="marquee-copy" key={i}>
              CREATIVE THINKING <span>✳</span> CLEAN CODE <span>✳</span> USER
              EXPERIENCE <span>✳</span> FULL-STACK DEVELOPMENT <span>✳</span>{" "}
              ALWAYS LEARNING <span>✳</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Marquee;
