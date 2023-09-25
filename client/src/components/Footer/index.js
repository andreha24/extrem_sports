import React from "react";

const Footer = () => {

  const socialMedia = [1,2,3,4];

  return (
    <footer>
      <img src="" alt="logo"/>
      <span>gmail</span>
      <div>
        {socialMedia.map((elem, index) => (
          <img key={index} src={elem} alt="social-link"/>
        ))}
      </div>
    </footer>
  );
};

export default Footer;