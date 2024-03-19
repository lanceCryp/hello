const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const accountsDirectory = 'accounts'; // 替换为你的 accounts 目录路径
const addressArray = [];

fs.readdir(accountsDirectory, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(accountsDirectory, file);

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        // console.log(row)
        if (row.Address) {
          addressArray.push(row.Address);
        }
      })
      .on('end', () => {
        // console.log(`Processed file: ${file}`);
        // console.log(addressArray)
        fs.writeFile('./address.json', JSON.stringify(addressArray, null, 2), (err) => {
            if (err) {
            //   console.error('Error writing JSON file:', err);
              return;
            }
            // console.log('JSON file has been saved.');
          });
      });
  });
  
});

