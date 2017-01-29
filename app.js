var cb = require('cloudboost');
var express = require('express');
var app = express();
var http = require('http').Server(app)
cb.CloudApp.init('myAppId', 'myAppKey');

var cache = new cb.CloudCache('new cache')

app.post('/item/:key/:value', function(req, res) {
	cache.get(req.params.key, req.params.value, {
		success: function(value) {
			res.status(200).send({key: req.params.key, value});
		}, error: function(error) {
			res.status(500).send(error)
		}
	})
})

app.get('/item/:key', function(req,res) {
				console.log('success')

	cache.get(req.params.key, {
		success: function(value) {
			console.log('success')
			res.status(200).send({key: req.params.key, value});
		}, error: function(error) {
			res.status(500).send(error);
		}
	})
})

app.delete('/item/key', function(req,res) {
	cache.deleteItem(req.params.key, {
		success: function(value){
			res.status(200).send({key: req.params.key, value});
		}, error: function(error){
			res.status(500).send(error);
		}
	})
})

app.get('/', function(req,res) {
	res.status(200).send('glad you made it, make a request to /item/:key for funcitonality')
})
http.listen(8000, function() {
	console.log('server started')
})