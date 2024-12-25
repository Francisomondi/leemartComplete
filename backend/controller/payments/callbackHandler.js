const Payment = require("../../models/paymentModel");

const callbackHandler = (req, res) => {
    const callbackData = req.body; // M-Pesa will send the data here
    console.log(callbackData.Body);

    if (!callbackData.Body.stkCallback.CallbackMetadata) {
      console.log(callbackData.Body)
      res.json('ok')
    }
  
    //console.log(callbackData.Body.stkCallback.CallbackMetadata)

    
    const trnx_id = callbackData.Body.stkCallback.CallbackMetadata.Item[1].Value
    const phone = callbackData.Body.stkCallback.CallbackMetadata.Item[4].Value
    const amount = callbackData.Body.stkCallback.CallbackMetadata.Item[0].Value

    console.log({phone, amount, trnx_id})

    const payment = new Payment()

    payment.phone = phone
    payment.amount = amount
    payment.trnx_id = trnx_id

    payment.save().then((data)=>{
      console.log({message: 'saved successfully', data})
    })
    .catch((error)=>{
      console.log(error.message)
  })

  };

  module.exports =  callbackHandler 