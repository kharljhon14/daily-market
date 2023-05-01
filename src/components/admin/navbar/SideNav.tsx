import { FaUsers, FaDatabase, FaTags, FaShoppingBag } from 'react-icons/fa';
import Link from 'next/link';
import AdminNavItem from './NavItem';

export default function AdminSideNav() {
  return (
    <div className="stick top-0 h-screen w-[300px] bg-dark_blue text-white space-y-12">
      <h1 className="text-2xl bg-light_blue text-center p-6 uppercase font-bold">
        Daily Market
      </h1>
      <nav className="flex flex-col justify-center">
        <Link href="/admin">
          <AdminNavItem
            text="Database"
            icon={<FaDatabase />}
          />
        </Link>
        <Link href="/admin/users">
          <AdminNavItem
            text="Users"
            icon={<FaUsers />}
          />
        </Link>
        <Link href="/admin/brands">
          <AdminNavItem
            text="Brands"
            icon={<FaShoppingBag />}
          />
        </Link>
        <Link href="/admin/tags">
          <AdminNavItem
            text="Tags"
            icon={<FaTags />}
          />
        </Link>
      </nav>
    </div>
  );
}
