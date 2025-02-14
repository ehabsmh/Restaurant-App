import { GrFavorite } from "react-icons/gr";

function AddToFavorite() {
  return (
    <div>
      <p className="text-sm">Add to favorite</p>
      <GrFavorite className="text-gradient-2 w-full" size={20} />
    </div>
  );
}

export default AddToFavorite;
