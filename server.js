const chokidar = require('chokidar');
var mv = require('mv');
var pathh = require('path');
const csv = require('csv-parser');
const fs = require('fs');

 
// One-liner for current directory
chokidar.watch('./uploads').on('all', async(event, path) => {
  
  if(event == 'add'){
    var parse_data = await parsing_data(path);

    var filename = pathh.basename(path);
    // console.log(filename)
    mv(path, `uploaded/${filename}`, function(result, err) {
      if(!err){
        console.log(parse_data)
      }
    })
  }

});




var parsing_data = (info)=>{
  return new Promise((resolve, reject)=>{
  	const results = [];

  		fs.createReadStream(info)
	  	.pipe(csv())
	  	.on('data', (data) => {
	  		results.push(data)
	  	})
	  	.on('end', () => {
	  		resolve(results);
		    console.log("CSV Parsing Done!!!")
		});
	
  })
 }