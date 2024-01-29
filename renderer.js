console.log(">>>>>")
const remote = require('@electron/remote');
console.log(remote)
const foo = remote.getGlobal('foo')
console.log(foo)