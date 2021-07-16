const express = require("express");
const path = require("path");
const fs = require('fs');
const app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactdance', { useNewUrlParser: true });
const bodyparser = require("body-parser");
const port = 80;
//expresss related
app.use(express.static('static'));

//define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
});
var Contact = mongoose.model('Contact', contactSchema);

//pug related
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//endpoints realted
app.get('/', (req, res) => {
    const par = {}
    res.status(200).render('home.pug', par);
})

app.get('/contact', (req, res) => {
    const par = {}
    res.status(200).render('contact.pug', par);
})

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch(() => {
        res.status(400).send("item was not saved to the databse")
    });
})

//port related
app.listen(port, () => {
    console.log(`this app ran successfuly on ${port}`);
})
