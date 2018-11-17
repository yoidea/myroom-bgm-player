var express = require('express');
var { EventEmitter } = require('events');
var { exec } = require('child_process');
var router = express.Router();
var fs = require('fs');

var isPlaying = false;

var ev = new EventEmitter;
ev.on('play', function() {
  var json = fs.readFileSync("playlist.json");
  var playlist = JSON.parse(json);
  if (playlist.length == 0) {
    isPlaying = false;
    return;
  }
  var url = playlist[0].url;
  console.log("play: ", url);
  playlist.shift();
  fs.writeFileSync("playlist.json", JSON.stringify(playlist));
  playSong(url);
});

function playSong(url) {
  exec('mpsyt playurl "' + url + '"', function() {
    ev.emit('play');
  });
}

router.get('/', function(req, res, next) {
  var json = fs.readFileSync("playlist.json");
  var playlist = JSON.parse(json);
  console.log(playlist);
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(playlist);
});

router.post('/', function(req, res, next) {
  var json = fs.readFileSync("playlist.json");
  var playlist = JSON.parse(json);
  var message = {"error": "Invild URL"};
  if (req.body.url != undefined) {
    playlist.push(req.body);
    fs.writeFileSync("playlist.json", JSON.stringify(playlist));
    message = req.body;
  }
  console.log(message);
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(message);
});

router.get('/start', function(req, res, next) {
  var message = {"message": "Already playing"};
  if (!isPlaying) {
    message = {"message": "Play start!"};
    isPlaying = true;
    ev.emit('play');
  }
  var json = fs.readFileSync("playlist.json");
  var playlist = JSON.parse(json);
  if (playlist.length == 0) {
    message = {"message": "Add songs from `POST /songs`"};
  }
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(message);
});

router.get('/stop', function(req, res, next) {
  var message = {"message": "Stop BGM!"};
  fs.writeFileSync("playlist.json", JSON.stringify([]));
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(message);
});

module.exports = router;
