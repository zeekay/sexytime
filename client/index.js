var User = require('./user.js');
var rtc = require('./webrtc.io');
var app = window.app = {
  port: '8001',
  host: 'localhost',
  user: null,
  peers: []
};

rtc.connect('ws://'+app.host+':'+app.port);

window.initUser = function () {
  var user = app.user = new User({
    id: 'local',
    name: 'Chika, Chicka, Slim-shady',
    rtc: rtc
  });

  user.connect(function () {
    console.log('user connected, stream is auto-attached', arguments);
    debugger;
  });
}

initUser();

rtc.on('add remote stream', function (stream) {
  var peer = new User({
    id: app.peers.length,
    rtc: rtc
  });

  // show the remote video
  peer.attachStream(stream);
});
