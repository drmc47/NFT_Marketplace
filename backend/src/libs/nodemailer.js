const nodemailer = require('nodemailer')

module.exports = async function main(req, res) {
  const { email, username, order } = req.body
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'henry.nftmarket@gmail.com',
      pass: 'Henry_NFT',
    },
  })

  var mailOptions = {
    from: 'henry.nftmarket@gmail.com',
    to: email,
    subject: `Order # ${order}`,
    text:
      'Hello, ' +
      username +
      '. Your order #' +
      order +
      ' has been successfully placed.',
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
      res.send('Todo ok amea')
    }
  })
}
