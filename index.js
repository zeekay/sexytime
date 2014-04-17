#!/usr/bin/env node
var debug = require('debug')('notakebacks'),
    app   = require('./app'),
    rtc   = require('./webrtc.js'),
    server;

app.set('port', process.env.PORT || 3000);

server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

rtc.listen(8001);
