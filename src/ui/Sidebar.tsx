import Logo from "./Logo";
import Categories from "../components/Categories";
import Subcategories from "../components/Subcategories";

/* Sidebar only works on bigger screens i.e: Desktop, Laptop, etc... */
function Sidebar() {
  return (
    <div className="hidden lg:flex lg:h-[inherit]">
      <aside className="lg:flex lg:w-28 lg:flex-col lg:items-center lg:gap-10 lg:bg-white">
        <Logo />
        <Categories />
      </aside>
      <Subcategories />
    </div>
  );
}

export default Sidebar;
