import { CgAdd } from "react-icons/cg";

const FavoritesBar = () => {
    const myCity = {
        fullName: "Tel Aviv",
        code: "TLV",
        temp: "+31",
        img: "assets/img/tlv.jpeg",
      };
  return (
    <div
      className=" 
    flex flex-row gap-1
    text-white shadow-lg"
    >
      <i><FavoriteBubble city={myCity}/></i>
      <i><FavoriteBubble /></i>
      <i><FavoriteBubble /></i>
      <i><FavoriteBubble /></i>
      <i><FavoriteBubble /></i>
    </div>
  );
};

const FavoriteBubble = ({ city, addToFavoriteTooltip = 'Pin current city' }) => {
    // Check if city object is empty (falsy)
    const isEmpty = !city;
    return (
    <div className="favorite-bubble"
    style={{ backgroundImage: "url('img/tlv.jpeg')" }}>
      <p className="text-white text-center font-bold py-1 px-2 inset-0 z-10">
        {isEmpty ? (
          <div className="favorite-bubble group">
          <CgAdd />
          <span className="favorite-bubble-tooltip group-hover:scale-100">
            {addToFavoriteTooltip}
          </span>
        </div>
        ) : (
          <>
            {city.fullName} <br />
            <span className="text-xs">{city.temp}</span>
          </>
        )}
      </p>
    </div>
    );
  };
  



export default FavoritesBar;
