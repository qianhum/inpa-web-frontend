import useSWR from 'swr';
import { fetcher, getServerURL } from '../../lib/utils';
import { PackageVersion } from '../../lib/types';

type Props = {
  packageTypeName: string
  packageName: string
};

type SWRResult = {
  data: {
    versions: PackageVersion[]
  }
  error: Record<string, unknown>
};

const PackageVersions: React.FC<Props> = ({ packageTypeName, packageName }: Props) => {
  const { data, error } = useSWR(`${getServerURL()}/package_versions/${packageTypeName}/${packageName}`, fetcher) as SWRResult;
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const { versions } = data;
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left">
            Version
          </th>
          <th className="px-4 py-2 text-left">
            Publish time
          </th>
        </tr>
      </thead>
      <tbody>
        {versions.map(({ version, publishTime }) => (
          <tr key={version}>
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
