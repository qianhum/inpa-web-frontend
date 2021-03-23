import Layout from '../components/Layout';
import PackageTypes from '../components/settings/PackageTypes';
import ForceUpdate from '../components/settings/ForceUpdate';
import LogOut from '../components/settings/LogOut';
import { getProductName } from '../lib/utils';

const SettingsPage: React.FC = () => (
  <Layout title={`${getProductName()} - Settings`}>
    <div className="mx-auto w-4/5">
      <ForceUpdate />
      <PackageTypes />
      <LogOut />
    </div>
  </Layout>
);

export default SettingsPage;
