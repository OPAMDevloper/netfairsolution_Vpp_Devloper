import React from "react";

const success = () => {
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
    heading:{
        color:"#ffffff"
    }
  };
  return (
    <div style={styles.app}>
      <header>
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h1 style={styles.heading}>Payment Successful!</h1>
          <p>Thank you for your payment.</p>
        </div>
      </header>
    </div>
  );
};

export default success;
