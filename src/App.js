import './App.css';
import headingImage from './img/—Pngtree—adult man reading a book_4430409.png'
function App() {
  return (
    <div className="App">
      <div className='text-container'>
        <h1>Book Track</h1>
        <p>Some subtext</p>
      </div>
      <div className='image-container'> 
        <img src={headingImage} alt='Homepage image.'   className='headingImage'></img>
      </div>      
      <div className='button-container'>
        <button>Get started</button>
      </div>
    </div>

  );
}

export default App;
