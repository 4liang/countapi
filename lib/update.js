const path = require('path')
const fileHound = require('filehound')

module.exports = (dir) => {
  if (dir) {
    if (!path.isAbsolute(dir)) {
      dir = path.join(process.cwd(), dir)
      console.log(dir)
    }
  } else {
    dir = process.cwd()
  }

  return fileHound
    .create()
    .paths(dir)
    .ext('js')
    .find()
}