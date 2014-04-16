var rtc = require('./webrtc.io');

rtc.connect('ws://192.168.7.28:8001');

rtc.createStream({"video": true, "audio":false}, function(stream){
  // get local stream for manipulation
  rtc.attachStream(stream, 'local');
});

var clients = 0;

rtc.on('add remote stream', function(stream){
  var video = document.createElement('video');

  video.id = clients++;

  document.body.appendChild(video);

  // show the remote video
  rtc.attachStream(stream, video.id);
});
