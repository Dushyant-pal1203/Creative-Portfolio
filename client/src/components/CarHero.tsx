import { useEffect, useRef } from "react";
import carImage from "/images/moving-car3.webp";
import "./car.css";

const CarHero: React.FC = () => {
  const starsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!starsRef.current) return;

    const starsContainer = starsRef.current;
    starsContainer.innerHTML = "";

    for (let i = 0; i < 150; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 80}%`;
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      starsContainer.appendChild(star);
    }
  }, []);

  return (
    <>
      <div className="container-car">
        <div>
          <div className="stars" ref={starsRef}></div>
          <div className="moon"></div>

          <div className="road">
            <div className="road-line"></div>
          </div>

          <div className="car-wrapper">
            <img src={carImage} alt="Moving car" className="car-image-moving" />

            <div className="wheel front-wheel"></div>
            <div className="wheel rear-wheel"></div>
            <div className="headlamp"></div>
            <div className="tail-light"></div>

            {/* Smoke trails */}
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="smoke-trail"
                style={{ ["--i" as any]: i }}
              ></div>
            ))}
          </div>

          <div className="main-body">
            <div className="hero-content">
              <h1>Turning Ideas Into Elegant Web Solutions</h1>
              <h3>Crafting fast, responsive, and reliable web applications</h3>
              <p>
                I am a professional Web Developer with strong experience in
                designing and building modern, scalable, and high-performance
                web applications. I specialize in creating intuitive user
                interfaces and robust backend systems using contemporary
                technologies. With a focus on clean code, performance
                optimization, and seamless user experiences, I deliver digital
                solutions that help businesses grow and adapt in an
                ever-evolving technological landscape.
              </p>
            </div>
          </div>
        </div>

        <div className="brand-name">
          {"Web Developer".split("").map((char, index) => (
            <span key={index}>{char}</span>
          ))}
        </div>
      </div>
    </>
  );
};

export default CarHero;
