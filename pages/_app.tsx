/* eslint-disable react/jsx-props-no-spreading */
import '../styles/index.css';

import { AppProps } from 'next/app';

const App: React.FC<AppProps> = ({
  Component, pageProps,
}: AppProps) => <Component {...pageProps} />;

export default App;
