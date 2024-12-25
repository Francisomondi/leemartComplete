const axios = require("axios");
const moment = require("moment");
const getAccessToken = require("./token");


const stkController = async (req, res) => {
  try {
    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    const phone = req.body.phone.substring(1);
    const amount = req.body.amount;
    //console.log({ phone, amount }); 

    const timestamp = moment().format("YYYYMMDDHHmmss");
    const shortcode = process.env.BUSINESS_SHORT_CODE;
    const passkey = process.env.PASS_KEY;
    const password = Buffer.from(shortcode + passkey + timestamp).toString(
      "base64"
    );

    const accessToken = await getAccessToken();
    //console.log("Access Token:", accessToken); 

   requestBody = {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline", 
        Amount: amount,
        PartyA: `254${phone}`,
        PartyB: shortcode,
        PhoneNumber: `254${phone}`,
        CallBackURL: "https://2633-41-90-186-59.ngrok-free.app/callback", // callback URL
        AccountReference: `254${phone}`,
        TransactionDesc: "Mpesa Daraja API stk push test",
  }

  //stk response
    const response = await axios.post(
      url,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Use the access token here
        },
      }
    );

    // Return a success response
    res.status(200).json({
      success: true,
      message: "STK Push request sent successfully",
      data: response.data
    });

  } catch (error) {
    console.error("STK Push error: ", error.message);

    // Handle the error and send response
    res.status(500).json({
      success: false,
      message: "Failed to send STK Push request", 
      error: error.message,
    });
  }
  
};

module.exports = stkController;