import "../styles/globals.css";
import { ColorPaletteProvider } from "../context/";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ColorPaletteProvider>
        <Component {...pageProps} />
      </ColorPaletteProvider>
    </>
  );
}

export default MyApp;
