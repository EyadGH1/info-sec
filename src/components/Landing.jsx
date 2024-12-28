import React from 'react';
import background from "../assets/undraw_mobile_encryption_re_yw3o.svg";
const Landing = () => {
  return (
    <section id="landing">
      <div className="container">
        <div className="landing-content">
          <div className="text-content">
            <h1 className="web-title">
              Ciphering 
              Techniques <span>Educational</span>
            </h1>
            <p className="by-eyad">by Eyad Al-Ghwanmeh</p>
            <p className="tagline">
              Explore a varity of Ciphering Techniques and try them your self
            </p>
            <a href="#main-section">
            <button className="cta-button" >Get Started</button>
            </a>
            
          </div>
          <div className="image-container">
            <img src={background} alt="Encryption Illustration" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
