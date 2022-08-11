import './App.css';
import React from 'react';

function App() {
  const images_url = 'https://jsonplaceholder.typicode.com/photos'
  const [images, setImages] = React.useState(); // what should default state be?
  
  // async function that gets images from API and sets state once complete
  async function getImages() {
    try {
      fetch(images_url)
      .then((response) => response.json())
      .then((data) => {
      setImages(data.map((image) => <img src={image.thumbnailUrl} alt='/' />));
      });
    } catch {
      console.log("error getting and setting images.");
    }
  }

  // calls API call to update state *after* all components rendered
  React.useEffect(() => {
    getImages();
  }, []);
  
  return (
    <>
    <h1>Convergence.</h1>
    <div>
      {images}
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
