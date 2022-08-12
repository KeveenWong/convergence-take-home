import './App.css';
import React from 'react';
import { useRef } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { data } from 'autoprefixer';
import { useQuery } from 'react-query';


function App() {
  const cache = useRef({});
  const images_url = 'https://jsonplaceholder.typicode.com/photos'
  const [images, setImages] = React.useState(); // what should default state be?
  
  // async function that gets images from API and sets state once complete; attempt to cache images 
  async function getImages() {
    try {
      const response = await fetch(images_url);
      const data = await response.json();
      cache.current[images_url] = data;
      setImages(data.map((image) => 
      <div className='image-container'>
        <img className='hover:scale-105 ease-in-out duration-300' src={image.thumbnailUrl} alt='a photo :D' />
        <div class='text-on-image'>
          <h3>{image.title}</h3>
        </div>
      </div>
      ));
      console.log("NOT CACHED");
    } catch {
      console.log("error getting and setting images.");
   }
   return data;
  }



  // calls API call to update state *after* all components rendered; if already cached, getImages from cached
  React.useEffect(() => {
    if (cache.current[images_url]) {
      const data = cache.current[images_url];
      setImages(data.map((image) => 
      <div className='image-container'>
        <img className='hover:scale-105 ease-in-out duration-300' src={image.thumbnailUrl} alt='a photo :D' />
        <div class='text-on-image'>
          <h3>{image.title}</h3>
        </div>
      </div>
      ));
      console.log("CACHED");
    } else {
      getImages();
    }

  }, [images_url]);


  // slide images left 
  const slideLeft = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 1200;
  }

  // slide images right
  const slideRight = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 1200;
  }


  // setup page layout 
  return (
    <>
      <h1>Convergence.</h1>
      <div className='relative flex items-center'>
        <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
        <div id='slider' className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth hover:scroll-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300'>
          {images}
        </div>
        <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} />
      </div>
    </>
  )
}

export default App;
