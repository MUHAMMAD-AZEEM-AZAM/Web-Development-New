const nodemailer=require('nodemailer')
require('dotenv').config();

// Create a transporter object
let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
    secure: true,
  });

const sendMessage=async(detail)=>{
const{email,name,message}=detail

try {
    const mailOptions = {
    from: email,
    to: "m.azeemlaptop@gmail.com",
    subject: "KIDSFUN App Contact Us",
    html: `<p>Hi my name is ${name}</p><p>${message}</p>`
};

await transporter.sendMail(mailOptions);

} catch (error) {
    throw new Error(error.message)
}

}

module.exports=sendMessage