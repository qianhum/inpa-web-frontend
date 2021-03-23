import Link from 'next/link';
import useSWR, { mutate } from 'swr';
import { fetcher, getServerURL } from '../../lib/utils';
import { Package } from '../../lib/types';

type SWRResult = {
  data: {
    packages: Package[]
  }
  error: Record<string, unknown>
};

const Packages: React.FC = () => {
  const { data, error } = useSWR(`${getServerURL()}/packages`, fetcher) as SWRResult;
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const deletePackage = async (packageName: string) => {
    await fetch(`${getServerURL()}/package/npm/${packageName}`, {
      method: 'DELETE',
    });
    await mutate(`${getServerURL()}/packages`);
  };
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left">
            Package
          </th>
          <th className="px-4 py-2 text-left">
            Latest version
          </th>
          <th className="px-4 py-2 text-left">
            Latest publish time
          </th>
          <th className="px-4 py-2 text-left">
            Latest check time
          </th>
          <th>
            {' '}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.packages.map(({
          packageName,
          packageTypeName,
          latestVersion,
          latestModifyTime,
          latestCheckTime,
        }) => (
          <tr key={`${packageName}_${packageTypeName}`}>
            <td className="border px-4 py-2 hover:underline">
              <Link href="/package/[slug1]/[slug2]" as={`/package/${packageTypeName}/${packageName}`}>
                {packageName}
              </Link>
            </td>
            <td className="border px-4 py-2">
              {latestVersion}
            </td>
            <td className="border px-4 py-2">
              {(new Date(latestModifyTime)).toLocaleString()}
            </td>
            <td className="border px-4 py-2">
              {(new Date(latestCheckTime)).toLocaleString()}
            </td>
            <td className="border px-4 py-2">
              <button type="button" onClick={() => deletePackage(packageName.split('/').join('%2F'))} className="border border-gray-500 rounded p-2 hover:bg-red-500 hover:text-white hover:border-red-700 focus:outline-none transition-all duration-500 ease-in-out">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Packages;
