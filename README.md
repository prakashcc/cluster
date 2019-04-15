## Example

app.js:

```javascript
var http = require('http');

module.exports = http.createServer(function(req, res){
  console.log('%s %s', req.method, req.url);
  var body = 'Hello World';
  res.writeHead(200, { 'Content-Length': body.length });
  res.end(body);
});
```

server.js:

```javascript
var cluster = require('cluster')
  , app = require('./app');

cluster(app)
  .use(cluster.logger('logs'))
  .use(cluster.stats())
  .use(cluster.pidfiles('pids'))
  .use(cluster.cli())
  .use(cluster.repl(8888))
  .listen(3000);
```

Note that cluster does _not_ create these directories for you, so you may want to:

    $ mkdir {logs,pids}

recommended usage: passing the path to prevent unnecessary database connections in the master process, as `./app` is only `require()`ed within the workers.

```javascript
var cluster = require('cluster');

cluster('./app')
  .use(cluster.logger('logs'))
  .use(cluster.stats())
  .use(cluster.pidfiles('pids'))
  .use(cluster.cli())
  .use(cluster.repl(8888))
  .listen(3000);
```
