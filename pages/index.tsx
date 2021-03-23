import Layout from '../components/Layout';
import PackageVersions from '../components/index/PackageVersions';
import { getProductName } from '../lib/utils';

const Home: React.FC = () => (
  <Layout title={getProductName()}>
    <PackageVersions />
  </Layout>
);

export default Home;
