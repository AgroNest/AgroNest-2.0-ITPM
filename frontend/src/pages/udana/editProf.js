import React from 'react';
import EditProfile from '../../Component/udana/editProfile';
import '../../styles/udana/dealer_profile.css';

const DealerProfilePage = () => {
  return (
    <div className="profile-page-container">
      <div className="profile-page-content">
        <EditProfile />
      </div>
    </div>
  );
};

export default DealerProfilePage;
