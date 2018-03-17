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
const downloadDirFake = './test/resources/test-dir-fake/';
const downloadFile = './test/resources/to-convert.flac';

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

    // download a single file for testing
    if (!fs.existsSync(downloadFile)) {
      await download(testFiles[0], downloadFile);
    }
  }, 500000);

  test('Convert a FLAC file', () =>
    converter.convertFile(downloadFile)
      .then((file) => {
        expect(file.code).toBe(0);
        expect(file.fileConverted).toMatch(/resources\/to-convert.mp3$/);
        expect(fs.existsSync(file.fileConverted)).toBeTruthy();
      }), 240000);

  test('Test error manage of single file', () =>
    converter.convertFile('this/not-existing-file.flac')
      .then(() => {
        // An error must occur
        expect(true).toBeFalsy();
      })
      .catch(err => expect(err).toBeDefined()));

  test('Convert a directory with only FLAC files', () =>
    converter.convertDirectory(downloadDir)
      .then((files) => {
        expect(files).toHaveLength(testFiles.length);
      }), 240000);

  test('Test error manage of directory', () =>
    converter.convertDirectory('this/is/not/a/valid/directory')
      .then(() => {
        // An error must occur
        expect(true).toBeFalsy();
      })
      .catch(err => expect(err).toBeDefined()));

  test('Test error manage one bad file of directory', () =>
    converter.convertDirectory(downloadDirFake)
      .then(() => {
        // An error must occur
        expect(true).toBeFalsy();
      })
      .catch(err => expect(err).toBeDefined()));

  afterAll(() => {
    glob('**/*.mp3', (err, matches) => {
      matches.forEach(file => fs.unlinkSync(file));
    });
  });
});
