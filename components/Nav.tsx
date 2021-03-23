/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { getProductName } from '../lib/utils';

const Nav: React.FC = () => (
  <nav className="flex items-center justify-between flex-wrap bg-green-500 p-6">
    <div className="flex items-center flex-shrink-0 text-white mr-6">
      <Link href="/">
        <a className="font-semibold text-xl tracking-tight">{getProductName()}</a>
      </Link>
    </div>
    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div className="text-sm lg:flex-grow">
        <Link href="/packages">
          <a className="block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white mr-4">
            Packages
          </a>
        </Link>
        <Link href="/settings">
          <a className="block mt-4 lg:inline-block lg:mt-0 text-green-200 hover:text-white mr-4">
            Settings
          </a>
        </Link>
      </div>
    </div>
  </nav>
);

export default Nav;
