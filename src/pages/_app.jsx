import "../styles/index.scss";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar"; // Assuming you have a Navbar component

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const showNavbar = router.pathname.startsWith("/Dashboard");
  const showProfile = router.pathname.startsWith("/Profile");
  const feedBack = router.pathname.startsWith("/Feedback");
  const showPaymentForm = router.pathname.startsWith("/PaymentFormURL");
  const success = router.pathname.startsWith("/success");

  return (
    <>
      {(showNavbar ||
        showProfile ||
        feedBack ||
        showPaymentForm ||
        success) && <Navbar />}{" "}
      {/* Render Navbar if route starts with "/Dashboard" or "/Profile" */}
      <Component {...pageProps} />
    </>
  );
}
