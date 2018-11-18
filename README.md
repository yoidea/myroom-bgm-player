# myroom-bgm-player

## Install

### Linux
```
$ apt-get install mpv
$ pip3 install youtube-dl
$ pip3 install mps-youtube
$ mpsyt set player mpv
$ yarn
```

### Mac
```
$ brew install mplayer
$ brew install youtube-dl
$ brew install mps-youtube
$ yarn
```

## Run

```
$ yarn start
```

## Usege

### Add songs
```
$ curl -X POST #{hostname}/songs -d 'url=#{youtube_url}'
```

### Show playlist
```
$ curl #{hostname}/songs
```

### Start playing songs
```
$ curl #{hostname}/songs/start
```

### Show infomation
```
$ curl #{hostname}/songs/info
```

### Stop playing songs
```
$ curl #{hostname}/songs/stop
```
