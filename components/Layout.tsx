import { useEffect, useState, createContext } from 'react';
import HtmlHead from './HtmlHead';
import Nav from './Nav';
import ServerURL from './ServerURL';
import { getServerURL } from '../lib/utils';

type Props = {
  children: React.ReactNode
  title?: string
};

const defaultState = {
  server: '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setServer: (s: string) => {},
};

export const ServerContext = createContext(defaultState);

const Layout: React.FC<Props> = ({
  children,
  title = 'This is the default title',
}: Props) => {
  const [server, setServer] = useState('');
  useEffect(() => {
    setServer(getServerURL());
  }, [server]);
  if (!server) {
    return (
      <ServerURL setServer={setServer} />
    );
  }
  return (
    <ServerContext.Provider value={{ server, setServer }}>
      <HtmlHead title={title} />
      <Nav />
      <main className="py-10">
        {children}
      </main>
    </ServerContext.Provider>
  );
};

Layout.defaultProps = {
  title: 'This is the default title',
};

export default Layout;
