var rtc = require('./webrtc.io');

rtc.connect('ws://localhost:8001');

rtc.createStream({"video": true, "audio":false}, function(stream){
  // get local stream for manipulation
  rtc.attachStream(stream, 'local');
});

rtc.on('add remote stream', function(stream){
  // show the remote video
  rtc.attachStream(stream, 'remote');
});
