# myroom-bgm-player

## Install

```
$ apt-get install mpv
$ pip3 install youtube-dl
$ pip3 install mps-youtube
$ mpsyt set player mpv
$ yarn
```

## Run

```
$ yarn start
```

## Usege

### Add songs
```
$ curl -X POST #{hostname}:3000/songs -d 'url=#{youtube_url}'
```

### Show playlist
```
$ curl #{hostname}:3000/songs
```

### Start playing songs
```
$ curl #{hostname}:3000/songs/start
```

### Show infomation
```
$ curl #{hostname}:3000/songs/info
```

### Stop playing songs
```
$ curl #{hostname}:3000/songs/stop
```
