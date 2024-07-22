import '../../css/ItemView.css';
import LeftWing from '../../assets/img/GuestFavoriteLeftWing.png'
import RightWing from '../../assets/img/GuestFavoriteRightWing.png'

const ItemRating = ({ratings}) => {
  const generateRandomNumber = () => {
    const min = 200;
    const max = 5000;
    const decimalPlaces = 0;

    const randomNumber = Math.random() * (max - min) + min;
    const roundedNumber = randomNumber.toFixed(decimalPlaces);

    return parseFloat(roundedNumber);
};

// Example usage inside the component
const randomRatings = generateRandomNumber();

  const ImgPath = "/images";
  return (
    <>
      <div className="items-ratings">
        <div className="items-ratings-section">
          <div className="image-section">
            <img src={LeftWing} alt="Image" />
            <div className="item-guest-favorite-text">
              <p>Guest</p>
              <p>Favorite</p>
            </div>
            <img src={RightWing} alt="Image" />
          </div>
          <div className="item-spacer"></div>
          <div className="item-guest-text-description">
            <p>One of the most loved homes on </p>
            <p>Airbnb, according to guests</p>
          </div>
          <div className="item-spacer"></div>
          <div className="item-guest-text-stars">
            <p>{ratings?.toFixed(1)}</p>
            <p>&#9733;&#9733;&#9733;&#9733;&#9733;</p>
          </div>
          <div className="item-spacer"></div>
          <div className="item-guest-text-reviews">
            <p>{randomRatings}</p>
            <p>Reviews</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemRating;
