import { Toaster } from "@/components/ui/sonner";
import store from "@/store/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Provider store={store}>
        <Component {...pageProps} />
        <Toaster />
      </Provider>
    </div>
  );
}
