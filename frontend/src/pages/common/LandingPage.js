import React from 'react';
import ArticleList from '../kande/ArticleList';
import one from '../../images/common/slider/1.png';
import two from '../../images/common/slider/2.png';
import three from '../../images/thamuditha/fertilizer images/tsp.png';

import SlideShow from '../../Component/common/Slideshow';

const images = [{ url: one }, { url: two }, { url: three }];

const DealerSignUp = () => {
  const slideshowImages = [
    require('../../images/thamuditha/1.png'),
    require('../../images/thamuditha/2.png'),
    require('../../images/thamuditha/3.png'),
  ];

  return (
    <>
      <SlideShow images={slideshowImages} />
      <ArticleList />
    </>
  );
};

export default DealerSignUp;
