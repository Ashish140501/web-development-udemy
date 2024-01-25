//*jshint esversion: 6 */

// ----------required packages---------//
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

// new instance of express
const app = express();

//mailChimp api key
//api key 
//Mailchimp list id  

//app.use
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname +"/signup.html");
});

app.post("/", function(req,res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const data = {
    //the members, status,merge_fields ---comes from mailChimp api
    'members':[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ],
  }
  var jsonData = JSON.stringify(data)

  console.log(firstName, lastName, email);


var jsonData = JSON.stringify(data);
const url = "https://us21.campaign-archive.com/home/?u=4032ae48e94667ed72a43b7d9&id=dc9469de0c";

const options = {
  method:"POST",
  auth:"5947831633e023af0c279ace8de7865a-us21"
}

const request = https.request(url, options, function(response){
  if (response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
  }else {
    res.sendFile(__dirname + "/failure.html");
  }
console.log(data.members);
// response.on("data",function(data){
//   console.log(JSON.parse(data));
//     //console.log(data)
//   })
})

request.write(jsonData);
request.end();
});


app.post("/failure", function (req, res){
  res.redirect("/");
});

//to test the app locally in port 3000
// app.listen(process.env.PORT || 3000, function(){
app.listen( 3000, function(){
console.log("Server is running in port 3000")
});


//api
//5947831633e023af0c279ace8de7865a-us21
// "https://us21.campaign-archive.com/home/?u=4032ae48e94667ed72a43b7d9&id=dc9469de0c"
//listid
//dc9469de0c