import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "../Context/Context";
import { Provider as Provider2 } from "../Context/BookInfosContext";

function MyApp({ Component, pageProps }) {
  return (
    <Provider2>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </Provider2>
  );
}

export default MyApp;
