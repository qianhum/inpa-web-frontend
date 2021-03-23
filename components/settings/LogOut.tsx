import { useContext } from 'react';
import { ServerContext } from '../Layout';
import { removeServerURL } from '../../lib/utils';

const LogOut: React.FC = () => {
  const { setServer } = useContext(ServerContext);
  const logOut = () => {
    removeServerURL();
    setServer('');
  };
  return (
    <div className="px-4 pb-12">
      <h2 className="py-2 font-bold">Logout</h2>
      <p className="pt-2 pb-4">
        Just in case you want to switch to another server,
        or want to wipe everything this website stored on your computer.
      </p>
      <button type="button" onClick={() => logOut()} className="mr-2 border border-gray-500 rounded p-2 hover:bg-green-500 hover:text-white hover:border-green-700 focus:outline-none transition-all duration-500 ease-in-out">Log Out</button>
    </div>
  );
};

export default LogOut;
