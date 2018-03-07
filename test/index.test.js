'use strict';

const http = require('http');
const fs = require('fs');
const glob = require('glob');

const FlacConverter = require('../lib/index');

const testFiles = [
  'http://www.eclassical.com/custom/eclassical/files/BIS1536-001-flac_16.flac',
  'http://www.eclassical.com/custom/eclassical/files/BIS1536-001-flac_24.flac',
  'http://www.eclassical.com/custom/eclassical/files/BIS1447-002-flac_16.flac',
  'http://www.eclassical.com/custom/eclassical/files/BIS1447-002-flac_24.flac',
];

const downloadDir = './test/resources/test-dir/';

const download = (url, dest) => new Promise((resolve, reject) => {
  const file = fs.createWriteStream(dest);
  http.get(url, response =>
    response.pipe(file)
      .on('finish', () => {
        file.close(resolve);
      })
      .on('error', (err) => {
        fs.unlink(dest);
        reject(err);
      }));
});

const getFileName = url => url.match(/[\w-]*\.flac$/).join();

describe('FlacConverter TEST', () => {
  const converter = new FlacConverter();

  beforeAll(async () => {
    await Promise.all(testFiles
      .map(urlFlacFile => ({ url: urlFlacFile, filePath: `${downloadDir}${getFileName(urlFlacFile)}` }))
      .filter(file => !fs.existsSync(file.filePath))
      .map(file => download(file.url, file.filePath)));
  }, 500000);

  test('Convert a FLAC file', () =>
    converter.convertFile('./test/resources/to-convert.flac')
      .then((file) => {
        expect(file.code).toBe(0);
        expect(file.fileConverted).toMatch(/resources\/to-convert.mp3$/);
        expect(fs.existsSync(file.fileConverted)).toBeTruthy();
      }));

  test('Convert a directory with only FLAC files', () =>
    converter.convertDirectory(downloadDir)
      .then((files) => {
        expect(files).toHaveLength(testFiles.length);
      }), 240000);

  afterAll(() => {
    glob('**/*.mp3', (err, matches) => {
      matches.forEach(file => fs.unlinkSync(file));
    });
  });
});
