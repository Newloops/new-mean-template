const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
var config = require('./config/config')
var database = require('./config/database')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

mongoose.connect(database.url,
    { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => { // connect to our database
    if (err) {
        console.log('ERROR: No ha sido posible conectar con la base de datos. ' + err)
    } else {
		console.log('SUCESS: Estamos conectados a la base de datos')
	}
});

var api = require('./routes/users')
app.use(api)

app.listen(config.PORT, () => {
	console.log('Node esta funcionando a traves de http://localhost: ' + config.PORT)
});
