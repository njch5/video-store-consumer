import React from 'react';
import videostore from '/Users/nickychoi/Documents/ada-weekly-workspaces/week-twenty/video-store-consumer/src/_DSC2759.jpg'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/Homepage.css';

function Homepage() {
  return (
    <div>
      <img src={videostore} className="video_store_image" alt="logo" />
    </div>
  )
}

export default Homepage;
