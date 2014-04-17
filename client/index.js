var User = require('./user.js');
var rtc = require('./webrtc.io');
var app = window.app = {
  port: '8001',
  host: window.location.hostname,
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
  console.log('user connected, stream is attached', user, arguments);
});

rtc.on('add remote stream', function (stream) {
  var peer = new User({
    id: app.peercount++,
    rtc: rtc
  });
  app.peers['peer'+peer.id] = peer;

  // show the remote video
  peer.attachStream(stream);
  stream.onended = function () {
    peer.el.remove();
    delete app.peers['peer'+peer.id];
    app.peercount--;
  };

  console.log('peer added', peer);
});
