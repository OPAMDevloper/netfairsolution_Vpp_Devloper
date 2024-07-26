import React from "react";
import Form from "./form";
import PayMorForm from "./PayMorForm";
function App() {
  const merchantId = "123456";
  const apiKey = "abcdef123456";
  const password = "mypassword";
  const link = "https://airpay-netfair.onrender.com/txn";
  const styles = {
    app: {
      textAlign: "center",
      backgroundColor: "#282c34",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "calc(10px + 2vmin)",
      color: "white",
    },
    info: {
      fontSize: "8em",
    },
    link: {
      color: "#61dafb",
      textDecoration: "none",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.app}>
      <header>
        {/* <div style={styles.info}>
          <p>Merchant ID: {merchantId}</p>
          <p>API Key: {apiKey}</p>
          <p>Password: {password}</p>
          <p>
            <a
              href={link}
              style={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              FORM LINK
            </a>
          </p>
        </div> */}
        {/* <Form /> */}
        <PayMorForm />
      </header>
    </div>
  );
}

export default App;
