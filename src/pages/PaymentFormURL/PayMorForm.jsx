import React, { useState } from "react";

const PayMorForm = () => {
  const [formData, setFormData] = useState({
    mid: "900000000000026",
    secretKey: "scr2dHNWS5QYjb07vVmVOu9VGG3JhG1dPP5",
    saltKey: "salNeSAWnEOmCd3UiEBQozhWoUny5GIZg",
    orderNo: `ORD${Math.floor(1000000 + Math.random() * 9000000)}`,
    amount: "10",
    currency: "INR",
    txnReqType: "S",
    emailId: "test@gmail.com",
    mobileNo: "9876543210",
    transactionMethod: "UPI",
    customerName: "Graphite",
    optional1: "intent",
  });
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/api/payMorAPI/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        // If success and UPI string is provided, redirect to the UPI URL
        if (data.upiString) {
          const iframe = document.createElement("iframe");
          iframe.style.display = "none";
          iframe.src = data.upiString;
          document.body.appendChild(iframe);
        } else {
          // Handle other successful responses
          window.location.href = "/success";
        }
      } else {
        // Handle failure case
        console.error(data.message);
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <center>
      <form name="payment_form" id="payment_form" onSubmit={handleSubmit}>
        <caption>
          <h3>Transaction Request</h3>
        </caption>
        <table border="1">
          <tbody>
            {Object.keys(formData).map((key) => (
              <tr key={key} style={{ marginBottom: "10px" }}>
                <td>
                  <label htmlFor={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    style={{ color: "black" }}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="2" style={{ textAlign: "center", padding: "5px" }}>
                <input
                  type="submit"
                  value="SUBMIT"
                  style={{
                    padding: "6px",
                    width: "100%",
                    background: "#044e78",
                    color: "white",
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </center>
  );
};

export default PayMorForm;
