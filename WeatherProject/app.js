const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req, res){
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){
    
    const query = req.body.cityName;
    const appid = "a6ac9370f55e8629fe113817f138b09f"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+ unit;

    https.get(url, function(response){
    console.log(response.statusCode);//here .statuscode will show the servercodes 200/300/400..

    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = " https://openweathermap.org/img/wn/"+ icon +"@2x.png";
        res.write("<p>the weather is currently"  + weatherDescription + "<p>") ;
        res.write("<h1>the temperature in "+ query +" is " + temp + "degree Celcius.</h1>");
        res.write("<img src="+ imageURL + ">");
        res.send();
    });
});
});









app.listen(5000, function(){
    console.log("server is running on port 3000.");
});