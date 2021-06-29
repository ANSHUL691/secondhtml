const express=require("express");
const app=express();
const path=require("path");
const port=80;
const fs=require('fs');
//express related
app.use('/static',express.static('static'));
app.use(express.urlencoded());
//pug related
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//endpoints realted
app.get('/',(req,res)=>{
    const con="yahoo";
    const par={'title': 'Food Panzer','content':con}
    res.status(200).render('index.pug',par);
})

app.post('/',(req,res)=>{
    nam = req.body.name
    email = req.body.email
    phone = req.body.phone
    message = req.body.message
    let outputWritten=`The name is ${nam} , email is ${email} , phone number is ${phone} and message is ${message}`; 
    fs.writeFileSync('output.txt',outputWritten);
    const par={'message': 'Your form has been submitted'}
    res.status(200).render('index.pug',par);
})
//port related
app.listen(port,()=>{
    console.log(`this app ran successfuly on ${port}`);
})
