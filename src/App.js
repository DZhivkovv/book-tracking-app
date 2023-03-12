import './App.css';
import headingImage from './img/—Pngtree—hand drawn girl reading book_4050570.png'
function App() {
  return (
    <div className="App">
      <div className='text-container'>
        <h1>Book Track</h1>
        <p>Lorem ipsum dolor sit amet</p>
      </div>
      <div className='image-container'> 
        <img src={headingImage} alt='Homepage image.'   className='headingImage'></img>
      </div>      
    </div>

  );
}

export default App;
