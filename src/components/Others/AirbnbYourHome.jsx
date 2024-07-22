import AirbnbEasily from '../../assets/img/airbnb-it-easily.png';

export default AirbnbYourHome = () => {
return (
    <>
        <div className="your-home-container">
            <div className="your-home-column">
                <div className="your-home-content">
                    <h1>Airbnb it.</h1>
                    <h1>You could earn</h1>
                    <h1>₱ 27,782</h1>
                    <h3>7 nights at an estimated ₱3,969 a night</h3>
                    
                    <h3>Learn how we estimate your earnings</h3>
                </div>
            </div>
            <div className="your-home-column">
                <div className="your-home-content">
                    <div className="your-home-map"></div>
                </div>
            </div>
        </div>
        <div className="your-home-container">
            <div className="your-home-content">
                <h1>Airbnb it easily with Airbnb Setup</h1>
                <img src={AirbnbEasily} alt="Airbnb it!" />                
            </div>
        </div>
    </>
)
};