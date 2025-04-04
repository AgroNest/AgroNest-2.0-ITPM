import React from 'react';
import AddTopfertilizer from '../../Component/kande/AddTopfertilizer';
import backgroundImage from '../../images/common/background.avif'; 
import '../../styles/udana/dealer_profile.css';

const Topfertilizer = () => {
  return (
    <div className="profile-page-container" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', minHeight: '100vh'}}>
      <header />
      <div className="profile-page-content">
        <AddTopfertilizer />
      </div>
    </div>
  );
};

export default Topfertilizer;
