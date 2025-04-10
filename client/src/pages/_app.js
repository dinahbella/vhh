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
            success: {
              style: {
                background: "#2E8F00", // green-500
                color: "white",
              },
            },
            error: {
              style: {
                background: "#ef4444", // red-500
                color: "white",
              },
            },
            // Optional: default style for other toast types
            style: {
              fontWeight: "500",
              borderRadius: "8px",
            },
          }}
        />
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}
