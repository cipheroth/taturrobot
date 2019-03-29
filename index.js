let express = require("express");
let axios = require("axios");
let bodyParser= require("body-parser");
let path = require("path");
let app = express();
app.use(express.static("."));

//var fs = require('fs');
//var http = require('http');
//var https = require('https');
//var privateKey  = fs.readFileSync('server.key', 'utf8');
//var certificate = fs.readFileSync('server.cert', 'utf8');

//var credentials = {key: privateKey, cert: certificate};

// your express configuration here

//var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); //for parsing application/x-www-form-urlencoded

//This is the route the API will call
 app.post("/new-message", (req, res) => {
    const { message } = req.body;
    console.log("-----Somenthing is coming in the night ! " + message);
     
    //Each message contains "text" and a "chat" object,
    //which has an "id" which is the chat id
    

    if(!message || message.text.toLowerCase().indexOf("taturro")<0){
        //if not message or messa has not a marco word
        console.log(" ------> Bad message");
        return res.end();
    }

    console.log("-----> sending a message");
    axios.post("https://api.telegram.org/bot724051109:AAFlD1Px5uskR_QYl45PXv6ewsnUxHcpkbI/sendMessage",
    {
        chat_id: message.chat.id,
        text: "Taturro Maraco !"
    }).then(response =>{
        console.log("Message Posted !");
        res.end("Ok");
    }).catch(err => {
        console.log("Perror : "+ err);
        res.end("Error : " + err);
    })
});

app.get("/style", (req, res) => {
    res.sendFile(path.join(__dirname + "/prueba-estilos-zen.html"));
});
app.get("/style5", (req, res) => {
    res.sendFile(path.join(__dirname + "/estilos05.html"));
});


let superport = 3000;
//Webhook can be set up only on ports 80, 88, 443 or 8443
app.listen(superport, () => {
    console.log("TaturroBot https server running up on infernal secure port: " + superport);
})