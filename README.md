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

### Show infomation
```
$ curl #{hostname}/songs/info
```

### Reset queue
```
$ curl #{hostname}/songs/reset
```
