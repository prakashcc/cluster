#!/usr/bin/env node
require = require('esm')(module /*, options*/);
require('../src/clipm.js').cli(process.argv.slice(2));