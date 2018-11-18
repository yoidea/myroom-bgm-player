var express = require('express');
var { EventEmitter } = require('events');
var { exec } = require('child_process');
var router = express.Router();
var fs = require('fs');

var state = {
  isPlaying: false,
  current: ""
};

var emitter = new EventEmitter;

emitter.on('play', function() {
  state.isPlaying = true;
  var json = fs.readFileSync("playlist.json");
  var playlist = JSON.parse(json);
  if (playlist.length == 0) {
    state.isPlaying = false;
    state.current = "";
    return;
  }
  var url = playlist[0].url;
  playlist.shift();
  fs.writeFileSync("playlist.json", JSON.stringify(playlist));
  state.current = url;
  playSong(url);
});

function playSong(url) {
  console.log("Play", url);
  exec('mpsyt playurl "' + url + '"', function() {
    emitter.emit('play');
  });
}

router.get('/', function(req, res, next) {
  var json = fs.readFileSync("playlist.json");
  var playlist = JSON.parse(json);
  console.log("Index => render");
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(playlist);
});

router.post('/', function(req, res, next) {
  var json = fs.readFileSync("playlist.json");
  var playlist = JSON.parse(json);
  var url = req.body.url;
  res.header('Content-Type', 'application/json; charset=utf-8')
  if (url == undefined) {
    var error = {"error": "Invild parameters"};
    res.send(error);
    return;
  }
  playlist.push({url: url});
  fs.writeFileSync("playlist.json", JSON.stringify(playlist));
  message = {
    "message": "Enqueued a song",
    "url": url,
    "number": playlist.length
  };
  console.log("Enqueue", url);
  res.send(message);
  if (!state.isPlaying) {
    emitter.emit('play');
  }
});

router.get('/reset', function(req, res, next) {
  fs.writeFileSync("playlist.json", JSON.stringify([]));
  res.header('Content-Type', 'application/json; charset=utf-8')
  state.isPlaying = false;
  state.current = "";
  var message = {"message": "Reset done"};
  console.log("Reset => queue");
  res.send(message);
});

router.get('/info', function(req, res, next) {
  var json = fs.readFileSync("playlist.json");
  var playlist = JSON.parse(json);
  var count = playlist.length;
  var message = {
    "playing": state.current,
    "songs": count,
  };
  res.header('Content-Type', 'application/json; charset=utf-8')
  console.log("Info => render");
  res.send(message);
});

module.exports = router;
