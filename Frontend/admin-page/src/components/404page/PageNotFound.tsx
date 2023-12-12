import { Link } from 'react-router-dom'
import './pageNotFound.scss'

const PageNotFound = () => {
    const goBack = () => {
      window.history.back(); // Go back to the previous page
    };
  
    return (
      <div className="not-found">
        <img
          src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
          alt="not-found"
        />
        <h1>This site may not have been built yet or doesn't exist.</h1>
        <div className="links-container">
            <Link to="/" className="link-home">
                Go Home
            </Link>
            <button onClick={goBack} className="link-back">
                Go Back
            </button>
        </div>
      </div>
    );
  };

export default PageNotFound