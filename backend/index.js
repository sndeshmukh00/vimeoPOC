const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const multer = require("multer")
var cors = require('cors');
const mongoose = require('mongoose');

//for deleting file
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

app.use(cors());
const config = require('./config.json');

var jsonParser = bodyParser.json()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(config.DB);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
})
const Data = require('./model');



let Vimeo = require('vimeo').Vimeo;
let client = new Vimeo(config.clientId, config.clientSecret, config.clientToken);


app.get('/',(req,res)=>{
    console.log("Homeeeeeeeee");
})


const upload = multer({ dest: './'});
  app.post('/post', upload.single("videoFile") , async(req, res) =>{
        console.log(req, req.file);
        let fileUrl = `./${req.file.filename}`;
        let fileName = req.body.filename;
        let link = [];
        
        await client.upload(
            fileUrl,
            {
                'name': fileName,
                'description': 'The description goes here.'
            },
            function (uri) {
                unlinkAsync(fileUrl)
                console.log('Your video URI is: ' + uri);
                link = uri.split("/");
                console.log(link[2])
                var t = new Data();
                videoUrl = link[2];
                t.videoUrl = videoUrl;

                t.save();
            },
            function (bytes_uploaded, bytes_total) {
                var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2)
                console.log(bytes_uploaded, bytes_total, percentage + '%')
            },
            function (error) {
                console.log('Failed because: ' + error)
            }
        )
  })


  const PORT = 3000
  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
  })

  