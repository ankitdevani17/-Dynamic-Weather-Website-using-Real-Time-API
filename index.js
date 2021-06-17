const http = require("http");
const fs = require("fs");
var requests = require("requests");

const homeFile = fs.readFileSync("home.html","utf-8");
const replaceVal =(tempVal, orgVal) =>{
  let temperature = tempVal.replace("{tempval}",orgVal.main.temp);
  console.log(temperature);
 }
const server = http.createServer((req,res)=>{
if(req.url == "/"){
    requests('https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=bed62018f1ea6b6979a69745343f0932')
    .on('data', (chunk)=>
    {
      const objData = JSON.parse(chunk);
      const arrData = [objData];
      console.log(arrData);
      console.log(arrData[0].main.temp);
      const realTimeData = arrData.map((val)=>{
        replaceVal(homeFile, val);
      });
    })
    .on('end', function (err) {
      if (err) return console.log('connection closed due to errors', err);
      console.log('end');
    });
}
});
server.listen(8000,"127.0.0.1");