const fs = require('fs');
const path = require('path');

module.exports = (file) => {
  let fileName = path.join(__dirname, '../', file);
  let data = fs.readFileSync(fileName, { encoding: 'utf8' })
  let d = data.replace(/\r/g, ',').replace(/\n/g, '')
  let arr = d.split(',').map(item => {
    return item.split('=')
  })
  let obj = {}
  arr.forEach(item => {
    obj[item[0]] = item[1]
  })
  return obj
}