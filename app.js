const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express(); //starting express

const mailchimp = require('@mailchimp/mailchimp_marketing');
const async = require('async');
const { response } = require("express");

app.use(bodyparser.urlencoded({ extended: true })); //to use body parser , type this

app.use(express.static("public")); //to use css files or ny other files

mailchimp.setConfig({
    apiKey: 'e8290cb51b2e26b916eb5bebf0e9cdd3-us20',
    server: 'us20',
});


app.get("/", function(req, res) { //starting page
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const mail = req.body.mailid;
    const listId = "be1d1cb69d";
    // console.log(mail);
    //const api_key = "e8290cb51b2e26b916eb5bebf0e9cdd3-us20";
    // const data = {
    //     members: [{
    //         email_address: mail,
    //         status: "subscribed",
    //         merge_fields: {
    //             FNAME: firstname,
    //             LNAME: lastname
    //         }
    //     }]
    // };
    //This creates a function for us to run later that sends the info to MailChimp.  This comes straight from the MailChimp guide.
    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: mail,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname
            }
        })
    };

    //running the function created above.  Will probably have to save the response in a variable in order to do the failure/success part of the lessons.
    run();

    //Just a quick response page
    console.log(mail);
    //res.send("Thanks for the signup, " + firstname + "!");

    if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
    } else {
        res.sendFile(__dirname + "/failure.html");

    }
    // const jsonData = JSON.stringify(data);
    // const url = "https://us20.api.mailchamp.com/3.0/lists/be1d1cb69d";

    // const options = {

    //     methods: "POST",
    //     auth: "lachhu:e8290cb51b2e26b916eb5bebf0e9cdd3-us20"

    // };

    // const request1 = https.request(url, options, function(response) {

    //     response.on("data", function(data) {

    //         console.log(JSON.parse(data));

    //     });

    // });

    // request1.write(jsonData);
    // request1.end();

});

app.post("/failure", function(req, res) {
    res.redirect("/");

});

app.listen(process.env.PORT || 3000, function(req, res) { //starting server 

    console.log("Server is up");
});


//list id = be1d1cb69d
//list id = be1d1cb69d