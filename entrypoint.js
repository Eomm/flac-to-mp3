'use strict';

const FlacConverter = require('./lib/index');

const converter = new FlacConverter();

const inputDir = process.argv[2];

console.log(`Converting directory ${inputDir}`);
converter.convertDirectory(inputDir)
  .then((files) => {
    // All files are converted
    console.log(`Converted ${files.length} flac`);
    files.forEach(f => console.log(`Converted: ${f.fileConverted}`));
  })
  .catch((err) => {
    // An error occured (some files could be converted)
    console.log('Some errors occurs', err);
  });
