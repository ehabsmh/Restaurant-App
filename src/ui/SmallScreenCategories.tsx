import Categories from "../components/Categories";
import Subcategories from "../components/Subcategories";

function SmallScreenCategories() {
  return (
    <div className="w-80 lg:hidden">
      <div className="cursor-pointer p-3">
        <p className="text-main-inactive mb-2 text-sm">Choose Category:</p>
        {/* <p className="text-secondary font-bold">Category</p> */}
        <Categories />
      </div>
      {/* <FiArrowRight /> */}
      <div className="cursor-pointer p-3">
        <p className="text-main-inactive mb-2 text-sm">Choose subcategory:</p>
        {/* <p className="text-secondary font-bold">Pasta</p> */}
        <Subcategories />
      </div>
    </div>
  );
}

export default SmallScreenCategories;
