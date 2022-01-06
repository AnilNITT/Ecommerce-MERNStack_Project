const nodemailer = require("nodemailer");
const {google}=require('googleapis');


// const sendEmail = async (options)=>{
//     let transporter = nodemailer.createTransport({
//         host:process.env.SMPT_HOST,
//         port:process.env.SMPT_PORT,
//         service: process.env.SMPT_SERVICE,
//         auth:{
//             user: process.env.SMPT_MAIL,
//             pass: process.env.SMPT_PASSWORD,
//         }
//     });
//     let mailOptions = {
//         from : process.env.SMPT_MAIL,
//         to: options.email,
//         subject: options.subject,
//         text: options.message,
//     };
//     await transporter.sendMail(mailOptions);
// };
// module.exports = sendEmail;




 // These id's and secrets should come from .env file.
 const CLIENT_ID = '868635003954-ff9ih62l8c9p38vip8pjpmrmheaoit02.apps.googleusercontent.com';
 const CLEINT_SECRET = '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';
 const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
 const REFRESH_TOKEN = '1//04Up4ag6BAhc1CgYIARAAGAQSNwF-L9IrVmJ08icEpOIWqz0CyUcXTShPlv9q7mryrUermcp10XCG0PY0a_ruPgq53jywJqVA_qs';
 const oAuth2Client = new google.auth.OAuth2(
     CLIENT_ID,
     CLEINT_SECRET,
     REDIRECT_URI
   );
 oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
 const sendEmail = async (options)=>{
       const accessToken = await oAuth2Client.getAccessToken();
       const transport = nodemailer.createTransport({
         service: 'gmail',
         auth: {
           type: 'OAuth2',
           user: 'patidaranil0791@gmail.com',
           clientId: CLIENT_ID,
           clientSecret: CLEINT_SECRET,
           refreshToken: REFRESH_TOKEN,
           accessToken: accessToken,
         },
       });
       const mailOptions = {
         from: 'patidaranil0791@gmail.com',
         to: options.email,
         subject: options.subject,
         text: options.message,
       };
       await transport.sendMail(mailOptions);
   }
 module.exports = sendEmail;

