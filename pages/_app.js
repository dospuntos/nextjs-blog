import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className="App">
        <Header lang="en" />
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}
