# FFmpeg Wrapper

[![Build Status](https://travis-ci.org/Eomm/flac-to-mp3.svg?branch=master)](https://travis-ci.org/Eomm/flac-to-mp3)
[![Coverage Status](https://coveralls.io/repos/github/Eomm/flac-to-mp3/badge.svg?branch=master)](https://coveralls.io/github/Eomm/flac-to-mp3?branch=master)

This nodejs module can convert **only** `.flac` files to `.mp3` programmatically using [ffmpeg.org](https://www.ffmpeg.org/download.html).


## API

| API                  | Description                           |
| -------------------- | ------------------------------------- |
| `convertFile`        | Convert a `.flac` file to `.mp3`
| `convertDirectory`   | Convert all the `.flac` files in a directory to `.mp3`

### Future API

| TODO                 | Description                           |
| -------------------- | ------------------------------------- |
| parameters           | Add to the current apis the possibility to change the parameters to pass to ffmpeg 
| api configuration    | Add some api configuration (customize ffmpeg's path, timeout feature, events listening)
| convert more audio   | Expose the function of convertig all the audio files supported by ffmpeg
| convert video        | Expose the function of convertig video files supported by ffmpeg


## Disclaimer

This project is a fork of [adrianblynch/flac-to-mp3](https://github.com/adrianblynch/flac-to-mp3) original project.
The name of the variable `FlacConverter` in the usage section, reflect this origins until a complete wrapping of the ffmpeg will be completed.

This is an ultra-wide learning project, doesn't aim to be a [complete-ready-to-use-ffmpeg-wrapper](https://www.npmjs.com/package/fluent-ffmpeg), but this want to give to contributors the opportunity to master:
+ To analyze and implement software components
+ Node's feature (like child process, stream and promise)
+ Building with CI
+ Testing and Coverage
+ Useful tools (`npm`, `vs code`)
+ Managing enviroments
+ and much more..


## Installation

```
npm install ffmpeg-wrapper
```

This module need that [ffmpeg.org](https://www.ffmpeg.org/download.html) is installed on the local machine.


### Usage

```
const FlacConverter = require('ffmpeg-wrapper')
const converter = new FlacConverter();

converter.convertFile('path/to/file.flac')
      .then((file) => {
        // The file is converted at path "file"
      })
      .catch((err) => {
        // An error occured
      });

converter.convertDirectory('path-with-flac/')
      .then((files) => {
        // All files are converted
      })
      .catch((err) => {
        // An error occured (some files could be converted)
      });

```


## Contribute

Contribution are well accepted, fell free to open an issue or send a PR.

All PR with new functions need to be tested and build passing.


## Test

Test are implemented with [Jest](https://facebook.github.io/jest/). Run the tests with the script:

```
npm test
```

During the test these files are automatically downloaded from [www.eclassical.com](http://www.eclassical.com/pages/24-bit-faq.html):

- [BIS1536-001-flac_16.flac](http://www.eclassical.com/custom/eclassical/files/BIS1536-001-flac_16.flac)
- [BIS1536-001-flac_24.flac](http://www.eclassical.com/custom/eclassical/files/BIS1536-001-flac_24.flac)
- [BIS1447-002-flac_16.flac](http://www.eclassical.com/custom/eclassical/files/BIS1447-002-flac_16.flac)
- [BIS1447-002-flac_24.flac](http://www.eclassical.com/custom/eclassical/files/BIS1447-002-flac_24.flac)


## License
(The MIT License)

Copyright (c) 2018 Manuel Spigolon <behemoth89@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
