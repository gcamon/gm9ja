const phantom = require('phantom');
const fs = require('fs');

(async function() {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function(requestData) {
    console.info('Requesting', requestData.url);
  });

  const status = await page.open('https://goodmorning9ja.com/world');
  const content = await page.property('content');
  console.log(content);

  fs.writeFile("./snapshots/world.html", content, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
    
}); 
await instance.exit();
  
})();