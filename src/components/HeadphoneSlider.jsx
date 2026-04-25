import { useState, useEffect } from 'react';

const HeadphoneSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      src: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-green-202011?wid=940&hei=1112&fmt=png-alpha',
      alt: 'green headphone',
      bg: 'radial-gradient(50% 50% at 50% 50%, #C7F6D0 0%, #7CB686 92.19%)'
    },
    {
      src: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-skyblue-202011?wid=940&hei=1112&fmt=png-alpha',
      alt: 'blue headphone',
      bg: 'radial-gradient(50% 50% at 50% 50%, #D1E4F6 0%, #5F9CCF 100%)'
    },
    {
      src: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-pink-202011?wid=940&hei=1112&fmt=png-alpha',
      alt: 'red headphone',
      bg: 'radial-gradient(50% 50% at 50% 50%, #FFB7B2 0%, #ED746E 100%)'
    },
    {
      src: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-silver-202011?wid=940&hei=1112&fmt=png-alpha',
      alt: 'white headphone',
      bg: 'radial-gradient(50% 50% at 50% 50%, #D7D7D7 0%, #979797 100%)'
    },
    {
      src: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-spacegray-202011?wid=940&hei=1112&fmt=png-alpha',
      alt: 'black headphone',
      bg: 'radial-gradient(50% 50% at 50% 50%, #6B6B6B 0%, #292929 100%)'
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <section className="hp-slider-main">
        <div className="hp-container">
          <div className="hp-logo">
            <a href="#"><img src="/Images/logo.svg" alt="logo" /></a>
          </div>
          <div className="hp-slider-content-wrap">
            <div className="hp-slider-content">
              <h2 className="hp-heading">Apple AirPods Max Wireless Over-Ear Headphones.</h2>
              <p className="hp-p">Active Noise Cancelling, Transparency Mode, Spatial Audio, Digital Crown for Volume Control. Bluetooth Headphones for iPhone</p>
              <h3 className="hp-price">$699.99</h3>
              <div className="hp-social-icons">
                <a href="#"><img src="/Images/instagram.svg" alt="instagram" /></a>
                <a href="#"><img src="/Images/facebook.svg" alt="facebook" /></a>
                <a href="#"><img src="/Images/twitter.svg" alt="twitter" /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="hp-slider-images">
          {images.map((img, i) => {
            let status = 'hp-inactive';
            if (i === currentIndex) status = 'hp-active';
            else if (i === (currentIndex + 1) % images.length) status = 'hp-next';
            else if (i === (currentIndex - 1 + images.length) % images.length) status = 'hp-previous';

            return (
              <img
                key={i}
                className={`hp-slider-image ${status}`}
                src={img.src}
                alt={img.alt}
              />
            );
          })}
        </div>

        <div id="hp-backgrounds">
          {images.map((img, i) => (
            <div
              key={i}
              className={`hp-background ${i === currentIndex ? 'hp-active' : ''}`}
              style={{ background: img.bg }}
            ></div>
          ))}
        </div>
      </section>
    </>
  );
};

const CSS = `
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;900&display=swap");

.hp-slider-main { 
  min-height: 800px; 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  height: 100vh; 
  position: relative; 
  overflow: hidden; 
  font-family: "Montserrat", sans-serif;
  background: #000;
}

#hp-backgrounds { position: absolute; width: 100%; height: 100%; top: 0; z-index: 1; }
.hp-background { position: absolute; inset: 0; opacity: 0; transition: opacity 2s ease-in-out; }
.hp-background.hp-active { opacity: 1; }

.hp-container { position: relative; width: 50%; padding-left: 10%; z-index: 10; }
.hp-logo img { height: 60px; margin-bottom: 40px; }

.hp-heading { color: #fff; font-size: 50px; font-weight: 900; line-height: 50px; margin-bottom: 40px; text-shadow: 0 5px 15px rgba(0,0,0,0.3); }
.hp-p { color: #fff; font-size: 18px; line-height: 35px; margin-bottom: 28px; max-width: 500px; }
.hp-price { color: #fff; font-size: 50px; font-weight: 900; margin-bottom: 40px; }

.hp-social-icons { display: flex; gap: 15px; }
.hp-social-icons a { border: 2px solid white; border-radius: 50%; width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; transition: 0.3s; background: rgba(255,255,255,0.1); backdrop-filter: blur(5px); }
.hp-social-icons a:hover { background: #fff; transform: translateY(-5px); }
.hp-social-icons a:hover img { filter: invert(1); }
.hp-social-icons img { width: 20px; }

.hp-slider-images { position: relative; width: 50%; height: 100%; z-index: 5; }
.hp-slider-image { 
  position: absolute; 
  left: 100%; 
  top: 50%; 
  transform: translate(-50%, -50%) scale(0.3); 
  filter: blur(35px); 
  opacity: 0; 
  transition: 2s cubic-bezier(0.17, 0.67, 0.83, 0.67); 
  width: 550px; 
}

.hp-slider-image.hp-active { left: 50%; opacity: 1; transform: translate(-50%, -50%) scale(1); filter: blur(0); }
.hp-slider-image.hp-next { left: 100%; top: 10%; opacity: 0.5; filter: blur(35px); transform: translate(-50%, -50%) scale(0.5); }
.hp-slider-image.hp-previous { left: 100%; top: 90%; opacity: 0.5; filter: blur(25px); transform: translate(-50%, -50%) scale(0.5); }

@media (max-width: 1024px) {
  .hp-heading { font-size: 35px; line-height: 40px; }
  .hp-container { width: 60%; }
  .hp-slider-image { width: 400px; }
}

@media (max-width: 768px) {
  .hp-slider-main { flex-direction: column; text-align: center; justify-content: center; height: auto; padding: 100px 20px; }
  .hp-container { width: 100%; padding-left: 0; margin-bottom: 50px; }
  .hp-p { margin: 0 auto 30px; }
  .hp-social-icons { justify-content: center; }
  .hp-slider-images { width: 100%; height: 500px; }
  .hp-slider-image.hp-active { left: 50%; }
  .hp-slider-image.hp-next, .hp-slider-image.hp-previous { display: none; }
}
`;

export default HeadphoneSlider;
