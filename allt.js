const fs = require('fs')
const program = require('commander')
const chalk = require('chalk')
const enc = require('./enc')
const dec = require('./dec')

program
  .option('-d, --decrypt <input>', 'Decrypt the specified input string')
  .option('-f, --decrypt-file <filename>', 'Decrypt the specified file')
  .option('-e, --encrypt <input>', 'Encrypt the specified input string')
  .option('-x, --encrypt-file <filename>', 'Encrypt the specified file')
  .parse(process.argv)

let processor, input, color

if (program.encrypt) {
  processor = enc
  input = program.encrypt
  color = 'red'
  if (program.encryptFile) {
    input = fs.readFileSync(program.encryptFile, 'utf8')
  }
} else {
  processor = dec
  input = program.decrypt
  color = 'cyan'
  if (program.decryptFile) {
    input = fs.readFileSync(program.decryptFile, 'utf8')
  }
}

if (input) {
  console.log(chalk[color](processor(input)))
} else {
  program.help()
}