const express = require("express");//localhost(*)
const server = express();
const converter = require('number-to-words');//Convert:(3)
const nodemailer = require('nodemailer');//Email:(5)
const port = 8000;

server.listen(port, ()=> {
 console.log(`server is running on localhost ${port}!`);
});

//google:(1)
server.get("/:value",(request,response)=>{   
    response.send(request.params.value);
});

//number:(2) //Convert:(3) //error:(4)
server.get("/:value1/plus/:value2/is", (request, response) => {
   const {value1,value2} = request.params;
   const resUlt = Number(value1) + Number(value2);

   if (resUlt) {
    response.write(`${resUlt}`);
    response.write(`${converter.toWords(resUlt)}`);
    response.end();
  } else {
    response.status(404).sendFile(__dirname + "/error.jpg");
  }
});
  
//Email:(5)
server.get("/sendmail/:rec",(request,response) => {
const rec=request.params.rec;

const transporter = nodemailer.createTransport({
 service: 'hotmail',
 auth: {
   user: 'wameedh.ali@hotmail.com',
   pass: 'account.pass'
 }
});

const mailOptions = {
 from: '"Wameedh 👻" <wameedh.ali@hotmail.com>',
 to: `${rec}`,
 subject: ' Email using Node.js',
 text: 'Hi the first email from node.js to me !'
};

transporter.sendMail(mailOptions, (error, info) =>{
 if (error) {
   console.log(error);
 } else {
   console.log('Email sent: ' + info.response);
 }
});
})