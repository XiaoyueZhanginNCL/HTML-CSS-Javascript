/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/


//1. Use the inquirer npm package to get user input.
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from "fs";

inquirer.prompt([{
    type: 'input',
    name: 'url',
    message: 'Please input URL:'
}])
.then((answers) => {
    var an=answers.url;
    var qrImage = qr.image(an);
    qrImage.pipe(fs.createWriteStream('qrcode.png'));

    fs.writeFile("message.txt",an,(err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });

  })
.catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
