import {
  FaUsers,
  FaDatabase,
  FaTags,
  FaShoppingBag,
  FaShoppingBasket,
} from 'react-icons/fa';
import NavItem from './NavItem';

export default function SideNav() {
  return (
    <div className="stick top-0 h-screen w-[300px] bg-dark_blue text-white space-y-12">
      <h1 className="text-3xl bg-light_blue text-center p-6 uppercase font-bold">
        Daily Market
      </h1>
      <nav className="flex flex-col justify-center">
        <NavItem
          text="Database"
          icon={<FaDatabase />}
        />
        <NavItem
          text="Users"
          icon={<FaUsers />}
        />
        <NavItem
          text="Brands"
          icon={<FaShoppingBag />}
        />
        <NavItem
          text="Products"
          icon={<FaShoppingBasket />}
        />
        <NavItem
          text="Types"
          icon={<FaTags />}
        />
      </nav>
    </div>
  );
}
