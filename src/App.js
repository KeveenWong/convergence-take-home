import './App.css';
import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

function App() {
  const images_url = 'https://jsonplaceholder.typicode.com/photos'
  const [images, setImages] = React.useState(); // what should default state be?
  
  // async function that gets images from API and sets state once complete
  async function getImages() {
    try {
      fetch(images_url)
      .then((response) => response.json())
      .then((data) => {
      setImages(data.map((image) => <img className='w-[370px] inline-block cursor-pointer hover:scale-105 ease-in-out duration-300'
                                          src={image.thumbnailUrl} 
                                          alt='a photo :D' />));
      });
    } catch {
      console.log("error getting and setting images.");
    }
  }

  const slideLeft = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 1200;
  }

  const slideRight = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 1200;
  }


  // calls API call to update state *after* all components rendered
  React.useEffect(() => {
    getImages();
  }, []);
  
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


// import React, { Component } from "react";
// import './App.css';
// import PhotoContainer from "./PhotoContainer";

// class App extends Component {
//     constructor() {
//       super();
//       this.state = {
//         photos: []
//       };
//     }

//     componentDidMount() {
//       fetch('https://api.thedogapi.com/v1/images/search?limit=10')
//       .then(response => {
//         console.log('response', response);
//         if (!response.ok) {
//           throw Error("Error fetching images :c")
//         }
//         return response.json()
//       .then(allData => {
//         this.setState({ photos: allData });
//       })
//       .catch(err => {
//         throw Error(err.message);
//       });
//     }
//       );
//   }

//     render() {
//       return (
//         <section className="app">
//           <p>Is this working?</p>
//           <PhotoContainer imgs={this.state.imgs} />
//         </section>
//       );
//     }
// }

export default App;
