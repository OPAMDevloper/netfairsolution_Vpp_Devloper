const PayMor = require("./PayMor");
const express = require('express');
var router = express.Router();

router.post("/request", async (req, res) => {
  const sp = new PayMor();
  const response = await sp.initiatePayment({
    mid: req?.body?.mid || "",
    secretKey: req?.body?.secretKey || "",
    saltKey: req?.body?.saltKey || "",
    orderNo: req?.body?.orderNo || "",
    amount: req?.body?.amount || "",
    currency: req?.body?.currency || "",
    txnReqType: req?.body?.txnReqType || "",
    undefinedField1: "",
    undefinedField2: "",
    undefinedField3: "",
    undefinedField4: "",
    undefinedField5: "",
    undefinedField6: "",
    undefinedField7: "",
    undefinedField8: "",
    undefinedField9: "",
    undefinedField10: "",
    emailId: req?.body?.emailId || "",
    mobileNo: req?.body?.mobileNo || "",
    transactionMethod: req?.body?.transactionMethod || "",
    bankCode: "",
    vpa: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    customerName: req?.body?.customerName || "",
    respUrl: req?.body?.respUrl || "http://localhost:3000/success",
    optional1: req?.body?.optional1 || "",
  });
  console.log(response);
  if (response?.error) {
    res.send("request response", response);
  } else {
    respHandler(response, res);
  }
});

async function respHandler(jsonData, res) {
  const responseData = jsonData;

  if (responseData?.respCode == 1) {
    res.status(200).send(responseData?.data?.ResponseMsg);
  } else {
    const mid = "900000000000026";
    const secretKey = "scr2dHNWS5QYjb07vVmVOu9VGG3JhG1dPP5";
    const saltKey = "salNeSAWnEOmCd3UiEBQozhWoUny5GIZg";

    const sp = new PayMor();
    sp._mid = mid;
    sp._secretKey = secretKey;
    sp._saltKey = saltKey;

    const data = JSON.parse(responseData?.data);
    const respData = data?.respData;
    const checkSum = data?.checkSum;

    const response = sp.getResponse(respData, mid, checkSum);
    const parsedResponse = JSON.parse(response);

    console.log("response", parsedResponse);

    // Check if the UPI string is present and redirect to it
    if (parsedResponse.upiString) {
      res.redirect(parsedResponse.upiString);
    }
  }
}

router.get("/txStatus", async (req, res) => {
  const mid = "900000000000008"; // Provided by PayMor
  const secretKey = "scrh0e0TZiA6J6bKXvJs5Pme8CMavx0cNmi"; // Provided by PayMor
  const saltKey = "sal9XIXl94aP3ZC6ZFIki32ugGXBVJBfr"; // Provided by PayMor
  const orderNo = "ORD65184411"; // Your Order No
  const txnRefNo = ""; // Optional
  const amount = ""; // Optional

  let error = "";
  const sp = new PayMor();

  if (mid && mid?.toString()?.trim() !== "") {
    sp._mid = mid;
  } else {
    error += "Mid Field is required.\n";
  }

  if (secretKey && secretKey?.toString()?.trim() !== "") {
    sp._secretKey = secretKey;
  } else {
    error += "SecretKey Field is required.\n";
  }

  if (saltKey && saltKey?.toString()?.trim() !== "") {
    sp._saltKey = saltKey;
  } else {
    error += "SaltKey Field is required.\n";
  }

  if (orderNo && orderNo?.toString()?.trim() !== "") {
    sp._orderNo = orderNo;
  } else {
    error += "orderNo Field is required.\n";
  }

  sp._amount = amount;
  sp._txnRefNo = txnRefNo;

  if (!error || error == "") {
    const resStatus = await sp.getTrnStatus();
    res.send(resStatus);
  } else {
    res.send(error);
  }
});

module.exports = router;