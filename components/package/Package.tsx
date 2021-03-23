import useSWR from 'swr';
import { fetcher, getServerURL } from '../../lib/utils';

type Props = {
  packageTypeName: string
  packageName: string
};

type SWRResult = {
  data: {
    package: {
      latestVersion: string
      latestModifyTime: number
      latestCheckTime: number
    }
  }
  error: Record<string, unknown>
};

const Package: React.FC<Props> = ({ packageTypeName, packageName }: Props) => {
  const { data, error } = useSWR(`${getServerURL()}/package/${packageTypeName}/${packageName}`, fetcher) as SWRResult;
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const { package: { latestVersion, latestModifyTime, latestCheckTime } } = data;
  return (
    <div className="px-4 py-2">
      <h2 className="text-2xl">
        {packageName.split('%2F').join('/')}
      </h2>
      <p className="py-2">
        Latest version:
        {' '}
        {latestVersion}
      </p>
      <p className="py-2">
        Latest publish time:
        {' '}
        {(new Date(latestModifyTime)).toLocaleString()}
      </p>
      <p className="py-2">
        Latest check time:
        {' '}
        {(new Date(latestCheckTime)).toLocaleString()}
      </p>
    </div>
  );
};

export default Package;
