import Link from 'next/link';
import useSWR from 'swr';
import { fetcher, getServerURL } from '../../lib/utils';
import { PackageVersion } from '../../lib/types';

type SWRResult = {
  data: {
    packageVersions: PackageVersion[]
  }
  error: Record<string, unknown>
};

const PackageVersions: React.FC = () => {
  const { data, error } = useSWR(`${getServerURL()}/package_versions`, fetcher) as SWRResult;
  if (error) return <div className="mx-auto w-4/5">failed to load</div>;
  if (!data) return <div className="mx-auto w-4/5">loading...</div>;
  return (
    <table className="mx-auto w-4/5">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left">
            Package
          </th>
          <th className="px-4 py-2 text-left">
            Version
          </th>
          <th className="px-4 py-2 text-left">
            Publish time
          </th>
        </tr>
      </thead>
      <tbody>
        {data.packageVersions.map(({
          packageName,
          packageTypeName,
          version,
          publishTime,
        }) => (
          <tr key={`${packageName}_${packageTypeName}_${version}`}>
            <td className="border px-4 py-2 text-2xl hover:underline">
              <Link href="/package/[slug1]/[slug2]" as={`/package/${packageTypeName}/${packageName}`}>
                {packageName}
              </Link>
            </td>
            <td className="border px-4 py-2">
              {version}
            </td>
            <td className="border px-4 py-2">
              {(new Date(publishTime)).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PackageVersions;
