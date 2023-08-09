<h1 align="center">Images Overlay On Video</h1>

This script is made to put on a single video a single png overlay.
No strange logic, it just put the png image on top of the video with FFMPEG.

### How it works?
- Put the video inside the folder 'videos' and update the 'VIDEO_PATH' env
- Put overlays inside the folder 'overlays'
- Run the script

### How to run the script?
```sh
brew install ffmpeg
nvm use
yarn install
cp .env.example .env
node index.js
```

### TODO List
- [x] Support .env
- [ ] Support multiple videos
- [ ] Support multiple overlays per video
- [ ] Dockerization

