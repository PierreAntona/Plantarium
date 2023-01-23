import "../styles/globals.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { SessionProvider } from "next-auth/react";
import Wrapper from "../components/Wrapper";

function MyApp({ Component, pageProps }) {
  console.log("Got session:", pageProps.session)
  return (
    <SessionProvider options={{ clientMaxAge: 0 }} session={pageProps.session}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </SessionProvider>
  );
}

export default MyApp;
