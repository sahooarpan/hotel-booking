const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors')
let csvToJson = require('convert-csv-to-json');
const results=[]
app.use(cors());

app.get('/',async(req,res)=>{
    // Reading the file using default 
// fs npm package 
let json = csvToJson.fieldDelimiter(',').getJsonFromCsv("data.csv") 
for(let i=0; i<json.length;i++){
    results.push(json[i])
}
res.send(results[0])


})
app.listen(5000,()=>{
    console.log("Listening at 5000")
})