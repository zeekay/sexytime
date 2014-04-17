var User = require('./user.js');
var rtc = require('./webrtc.io');
var app = window.app = {
  port: '8001',
  host: 'localhost',
  user: null,
  peers: {},
  peercount: 0
};

rtc.connect('ws://'+app.host+':'+app.port);

var user = app.user = new User({
  id: 'local',
  name: 'Chika, Chicka, Slim-shady',
  rtc: rtc
});

user.connect(function () {
  console.log('user connected, stream is auto-attached', user, arguments);
});

rtc.on('add remote stream', function (stream) {
  debugger;
  var peer = new User({
    id: app.peercount++,
    rtc: rtc
  });

  // show the remote video
  peer.attachStream(stream);

  stream.onended = function () {
    peer.onended();
    delete app.peers['peer'+peer.id];
    app.peercount--;
  };

  app.peers['peer'+peer.id] = peer;

  console.log('peer added', peer);
});
