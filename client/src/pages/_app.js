import store from "@/store/store";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Provider store={store}>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            className: "custom-toast",
            style: {
              fontWeight: "500",
              borderRadius: "8px",
              padding: "16px",
              color: "white",
            },
            success: {
              style: {
                background: "#2E8F00",
              },
            },
            error: {
              style: {
                background: "#ef4444",
              },
            },
          }}
        />
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}
