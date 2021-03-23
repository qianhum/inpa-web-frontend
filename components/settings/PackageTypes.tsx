import useSWR from 'swr';
import { useEffect, useState } from 'react';
import PackageTypeItem from './PackageType';
import { fetcher, getServerURL } from '../../lib/utils';

type PackageType = {
  packageTypeName: string,
  registry: string,
};

type SWRResult = {
  data: {
    packageTypes: PackageType[]
  }
  error: Record<string, unknown>
};

const PackageTypes: React.FC = () => {
  const [packageTypes, setPackageTypes] = useState([] as PackageType[]);
  const { data } = useSWR(`${getServerURL()}/package_types`, fetcher) as SWRResult;
  // if (error) return <div>failed to load</div>
  // if (!data) return <div>loading...</div>
  useEffect(() => {
    if (data && data.packageTypes) {
      setPackageTypes(data.packageTypes);
    }
  }, [data]);

  return (
    <table className="table-auto flex-auto">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left">
            Registry
          </th>
        </tr>
      </thead>
      <tbody>
        {packageTypes.map(({
          packageTypeName,
          registry,
        }) => (
          <tr key={packageTypeName}>
            <PackageTypeItem packageTypeName={packageTypeName} registry={registry} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PackageTypes;
