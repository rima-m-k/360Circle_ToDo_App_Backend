const nodemailer=require('nodemailer')

 async function sendOTP(OTP,email){

    let transporter = nodemailer.createTransport({
        service: " gmail",
        auth: {
          user: "marvelmerch806@gmail.com",
          pass: "yzdjivmydvsuvgbd",
        },
      });

      let mailOptions = {
        from: "marvelmerch806@gmail.com",
        to: email,
        subject: "Your OTP to reset password",
        text: `Your OTP to reset password is ${OTP}<b> `,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          
        } else {
          console.log("Email sent" + info.response);
          console.log(OTP);
        }
    })

}

module.exports ={
    sendOTP
}