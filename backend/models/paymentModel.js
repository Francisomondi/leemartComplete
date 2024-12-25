const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema(
{
      phone: {
        type: String,
        required: true
      },
      trnx_id: {
        type: String,
        required: true
      },
      amount: {
        type: String,
        required: true
      },
},
{
    timestamps: true
})
const payment = mongoose.model('Payment', paymentSchema)
module.exports = payment