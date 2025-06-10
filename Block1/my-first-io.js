import { readFileSync } from 'fs'
//Veraltet: "const fs = require('fs')"

const file = readFileSync(process.argv[2])
const str = file.toString()
console.log(str.split("\n").length - 1)