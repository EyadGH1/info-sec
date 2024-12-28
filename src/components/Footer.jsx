import React from 'react';

const Footer = () => {
  const footerContent = {
    text: 'Made by [Your Name]',  // Replace with your name
    instagramLink: 'https://www.instagram.com/eyadthegh/?utm_source=ig_web_button_share_sheet/',  // Replace with your Instagram handle
  };

  return (
    <footer style={footerStyle}>
      <p>Made by <a href={footerContent.instagramLink} target="_blank" rel="noopener noreferrer" style={linkStyle}>
        @eyadthegh
      </a></p>
      <p> this project is made for extra credits in network and information security course/Ali Maqousi </p>
      
    </footer>
  );
};

// Optional inline styles
const footerStyle = {
  textAlign: 'center',
  padding: '20px',
  backgroundColor: '#222',
  color: '#fff',
  bottom: 0,
  width: '100%',
};

const linkStyle = {
  color: '#fbad50',
  textDecoration: 'none',
  fontWeight: 'bold',
};

export default Footer;
