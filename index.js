import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
app.set("view engine", "ejs");
const lin = "https://v2.jokeapi.dev/joke/";
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",(req,res)=>{
    res.render("index.ejs");
})
app.post("/",async (req,res)=>{
    const cat = req.body["category"];
    const bl = req.body["blflags"];
    const type = req.body["type"];  
    const strin = req.body["contain"];
    var jokes = "";
    try{
        const result = await axios.get(lin+`${cat}?blacklistFlags=${bl}&type=${type}&contains=${strin}`);
        const response = result.data;
        if(type==="twopart"){
            jokes = response.setup+"       "+response.delivery;
        }else{
            jokes = response.joke;
        }
        if(response.error===true){
            jokes="No matching jokes found";
        }
        res.render("index.ejs",{
            content: jokes
        })
        console.log(lin+`${cat}?blacklistFlags=${bl}&type=${type}&contain=${strin}`)
        
    }catch(error){
        res.render("index.ejs",{
            content:"No joke found"
        })
    }
});
app.listen(port,()=>{
    console.log("server on port "+port);
})