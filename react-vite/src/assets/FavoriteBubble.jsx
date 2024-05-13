import { CgAdd } from "react-icons/cg";

const FavoriteBubble = ({
  city,
  handleAddFavorite,
  addToFavoriteTooltip = "Pin",
}) => {
  // Check if city object is empty (falsy)
  const isEmpty = !city;
  return (
    <div
      className="favorite-bubble"
      style={{ backgroundImage: "url('img/tlv.jpeg')" }}
      onClick={handleAddFavorite}
    >
      <p className="text-white text-center font-bold py-1 px-2 inset-0 z-10">
        {isEmpty ? (
          <div className="favorite-bubble group">
            <CgAdd />{" "}
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
export default FavoriteBubble;
