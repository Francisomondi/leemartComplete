const axios = require('axios');
const Buffer = require('buffer').Buffer;


// Function to fetch the access token from Daraja API
const getAccessToken = async (req,res,next) => {
    const consumer_key = process.env.SAFARICOM_CONSUMER_KEY
    const consumer_secret = process.env.SAFARICOM_CONSUMER_SECRET
    const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    const auth ="Basic " + new Buffer.from(consumer_key + ":" + consumer_secret).toString("base64")

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: auth,
      }
    });
    const responseData = response.data
    const accessToken = responseData.access_token; // The access token
    console.log('Access Token:', accessToken);
    return accessToken;
    
  } catch (error) {
    console.error('Error generating access token:', error.response ? error.response.data : error.message);
  }
};

// Call the function to fetch the access token
getAccessToken();


module.exports = getAccessToken