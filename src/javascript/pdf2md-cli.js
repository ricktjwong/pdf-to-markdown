#!/usr/bin/env node

/* eslint no-console: 0 */

const pdf2md = require('./pdf2md')

const fs = require('fs')
const path = require('path')

const [node, appName, inputFile, outputPath] = process.argv;

if (!inputFile) {
  console.log(`Usage: ${appName} ${inputFile} [${outputPath}]`)
  process.exit(1)
}

// If outputPath specified, supply callbacks to log progress
const callbacks = outputPath && {}

const pdfBuffer = fs.readFileSync(path.resolve(inputFile))
pdf2md(pdfBuffer, callbacks)
  .then(text => {
    if (outputPath) {
      let outputFile = outputPath + '/output.md'
      console.log(`Writing to ${outputFile}...`)
      fs.writeFileSync(path.resolve(outputFile), text)
      console.log('Done.')
    } else {
      console.log(text)
    }
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })