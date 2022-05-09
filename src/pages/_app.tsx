import { PictureProvider } from '../contexts/PictureContext';

import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <PictureProvider>
      <Component {...pageProps} />;
    </PictureProvider>
  );
}

export default MyApp;
