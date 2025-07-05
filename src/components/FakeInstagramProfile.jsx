import React from 'react';
import styles from './FakeInstagramProfile.module.css';
import profileImage from '../assets/instagram-profile.jpg'; // Corrected to .jpg

const FakeInstagramProfile = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>تابعني على انستقرام</h3>
      <a 
        href="https://www.instagram.com/taqydev" 
        target="_blank" 
        rel="noopener noreferrer" 
        className={styles.profileLink}
      >
        <img 
          src={profileImage} 
          alt="ملف taqydev على انستجرام" 
          className={styles.profileImage}
        />
      </a>
    </div>
  );
};

export default FakeInstagramProfile;