const fs = require('fs')
const color = require('cli-color')
const Table = require('cli-table')
const detective = require('detective')
const modules = ['path', 'fs', 'util', 'os', 'vm', 'child_process', 'events', 'crypto', 'assert', 'stream', 'cluster', 'url', 'zlib', 'http', 'https', 'readline', 'dns', 'inspector', 'net', 'v8', 'perf_hooks', 'http', 'http2', 'repl', 'net', 'dgram', 'string_decoder', 'querystring', 'worker_threads', 'async_hooks']

function query(files) {
  const modulesMap = {}
  const moduleList = []
  const table = new Table({
    head: ['module', 'count']
  })

  modules.forEach(mod => {
    modulesMap[mod] = 0
  })

  files.forEach(file => {
    const src = fs.readFileSync(file)
    const requires = detective(src)

    requires.forEach(req => {
      if (modules.includes(req)) {
        modulesMap[req]++
      }
    })
  })

  console.log(modulesMap)

  modules
    .sort((mod1, mod2) => {
      return modulesMap[mod2] - modulesMap[mod1]
    })
    .forEach(mod => {
      const count = modulesMap[mod] || color.red(0)
      table.push([mod, count])
    })

  return table.toString()
}

module.exports = query