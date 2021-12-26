import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "../Context/Context";
import { Provider as Provider2 } from "../Context/BookInfosContext";
import { Provider as Provider3 } from "../Context/User";

function MyApp({ Component, pageProps }) {
  return (
    <Provider3>
      <Provider2>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </Provider2>
    </Provider3>
  );
}

export default MyApp;
