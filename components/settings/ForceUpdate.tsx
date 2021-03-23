import { getServerURL } from '../../lib/utils';

const checkUpdate = async () => {
  await fetch(`${getServerURL()}/force_update`);
};

const ForceUpdate: React.FC = () => (
  <div className="px-4 pb-12">
    <h2 className="py-2 font-bold">Force Update</h2>
    <p className="pt-2 pb-4">
      New package updates will be checked every hour,
      {' '}
      but if you indeed can not wait, you can use the button below.
    </p>
    <button type="button" onClick={() => checkUpdate()} className="mr-2 border border-gray-500 rounded p-2 hover:bg-green-500 hover:text-white hover:border-green-700 focus:outline-none transition-all duration-500 ease-in-out">Force Update</button>
  </div>
);

export default ForceUpdate;
