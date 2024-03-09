import express from "express";
import fs from "node:fs";
import {nanoid} from "nanoid";


const app = express();


// console.log(nanoid(10))

app.use(express.json());
app.post("/urlshortner" , (req, res)=>{

    console.log(req.body.url);

    const longurl = req.body.url;
    const shorturl = nanoid(10);

    const files = fs.readFileSync("url.json");

     const filedata =JSON.parse(files.toString());
     
        filedata[shorturl] = longurl;

        fs.writeFileSync("url.json" , JSON.stringify(filedata));

    res.json({
        success:true,
        url: `http://localhost:5000/${shorturl}`
    })
})

app.get("/:shorturl" , (req,res)=>{
    console.log(req.params.shorturl);

    const files = fs.readFileSync("url.json");
    const filedata = JSON.parse(files.toString());

    const longurl = filedata[req.params.shorturl];
    
    res.redirect(longurl);

    
})

app.listen(5000 , ()=>{
    console.log("server is runnning");  
})




