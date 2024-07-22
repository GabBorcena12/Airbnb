import Avatar from '../../assets/img/avatar.jpg'
const ItemHost = () => {
  const randomHost = ["Gabriel", "AJ", "Andrei", "George", "Rey", "Miguel", "Alexa"];
  const selectRandomHost = () => {
    const randomIndex = Math.floor(Math.random() * randomHost.length);
    return randomHost[randomIndex];
  };
  const selectedHost = selectRandomHost();
  return (
    <>
      <div className="item-host-container">
        <div className="item-first-column">
          <img
            src={Avatar}
            alt="avatar"
            className="item-host-avatar"
          />
        </div>
        <div className="item-second-column">
          <p className="hosted-by">Hosted by {selectedHost}</p>
          <p className="hosted-rating">Superhost · 5 years hosting</p>
        </div>
      </div>
      <div className="item-host-characteristics">
        <div className="first-row">
          <div className="item-first-column">
            <i className="fas fa-bed"></i>
          </div>
          <div className="item-second-column">
            <p className="hosted-by">Dedicated Workspace</p>
            <p className="hosted-rating">
              A room with wifi that’s well-suited for working.
            </p>
          </div>
        </div>
        <div className="second-row">
          <div className="item-first-column">
            <i className="fas fa-door-open"></i>
          </div>
          <div className="item-second-column">
            <p className="hosted-by">Self check-in</p>
            <p className="hosted-rating">
              You can check in with the building staff.
            </p>
          </div>
        </div>
        <div className="third-row">
          <div className="item-first-column">
            <i className="fas fa-calendar"></i>
          </div>
          <div className="item-second-column">
            <p className="hosted-by">Free cancellation for 48 hours</p>
            <p className="hosted-rating">
              Get a full refund if you change your mind.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default ItemHost;
