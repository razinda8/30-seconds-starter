/*
  This is the builder script that generates the README file.
  Run using `npm run builder`.
*/
// Load modules
const fs = require('fs-extra');
const path = require('path');
const { green, red } = require('kleur');
const util = require('./util');

// Paths (relative to package.json)
const SNIPPETS_PATH = './snippets';
const STATIC_PARTS_PATH = './src/static-parts';

// Terminate if parent commit is a Travis build
if (util.isTravisCI() && /^Travis build: \d+/g.test(process.env['TRAVIS_COMMIT_MESSAGE'])) {
  console.log(
    `${green('NOBUILD')} README build terminated, parent commit is a Travis build!`
  );
  process.exit(0);
}

// Setup everything
let snippets = {},
  startPart = '',
  endPart = '',
  output = '',
  tagDbData = {};
console.time('Builder');

// Synchronously read all snippets from snippets folder and sort them as necessary (case-insensitive)
snippets = util.readSnippets(SNIPPETS_PATH);

// Load static parts for the README file
try {
  startPart = fs.readFileSync(path.join(STATIC_PARTS_PATH, 'README-start.md'), 'utf8');
  endPart = fs.readFileSync(path.join(STATIC_PARTS_PATH, 'README-end.md'), 'utf8');
} catch (err) {
  console.log(`${red('ERROR!')} During static part loading: ${err}`);
  process.exit(1);
}

Object.keys(snippets).forEach(key => {
  console.dir(snippets[key]);
});