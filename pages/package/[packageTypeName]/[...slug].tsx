import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import Package from '../../../components/package/Package';
import PackageVersions from '../../../components/package/PackageVersions';
import { getProductName } from '../../../lib/utils';

type QueryResult = {
  packageTypeName: string
  slug: string[]
};

const PackagePage: React.FC = () => {
  const router = useRouter();
  const { packageTypeName, slug } = router.query as QueryResult;
  const packageName = slug ? slug.join('%2F') : '';
  return (
    <Layout title={`${getProductName()} - Package ${slug ? slug.join('/') : ''}`}>
      <div className="flex mx-auto w-4/5">
        <Package packageTypeName={packageTypeName} packageName={packageName} />
        <PackageVersions packageTypeName={packageTypeName} packageName={packageName} />
      </div>
    </Layout>
  );
};

export default PackagePage;
