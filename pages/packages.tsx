import Layout from '../components/Layout';
import Packages from '../components/packages/Packages';
import AddPackage from '../components/packages/AddPackage';
import { getProductName } from '../lib/utils';

const PackagesPage: React.FC = () => (
  <Layout title={`${getProductName()} - Packages`}>
    <div className="mx-auto w-4/5">
      <AddPackage />
      <Packages />
    </div>
  </Layout>
);

export default PackagesPage;
