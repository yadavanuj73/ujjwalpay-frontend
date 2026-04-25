import logoImg from '../assets/images/logo.png';

const Logo = ({ className = "h-12" }) => {
  return (
    <img src={logoImg} alt="Ujjwal Pay" className={`${className} object-contain inline-block drop-shadow-sm`} />
  );
};

export default Logo;
