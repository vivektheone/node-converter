const csvFilePath='input.csv'
const csv=require('csvtojson')
var fastCsv = require('fast-csv')
const lodash = require('lodash')
var fs = require('fs')
var datas = [];
csv({
  noheader:false,
  headers: ['one', 'two', 'three']
})
.fromFile(csvFilePath)
.on('json',(row)=>{ // this func will be called 3 times 
    datas.push(row);
})
.on('done',()=>{
   var csvStream = fastCsv.createWriteStream({headers: true}),
   writableStream = fs.createWriteStream("output.csv");
   csvStream.pipe(writableStream);
   lodash.forEach(datas, function(value) {
     csvStream.write(value);
   });
   writableStream.on("finish", function(){
     console.log("DONE!");
   }); 
   csvStream.pipe(writableStream);
   csvStream.end();
});
