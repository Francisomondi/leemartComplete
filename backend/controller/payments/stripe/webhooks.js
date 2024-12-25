
const stripe = require('../../../config/stripe'); 
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

const webhook = (req,res) =>{

  if (endpointSecret) {
    
    const signature = request.headers['stripe-signature'];
    const payloadString = JSON.stringify(req.body) 

    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      endpointSecret,
    });

    let event
    
    try {
      event = stripe.webhooks.constructEvent(
        payloadString,
        header,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  res.status(200).send()
}

module.exports = webhook