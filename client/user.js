function User (options) {
  options = options || {};
  this.id = typeof options.id !== 'undefined' ? options.id : Math.ceil(Math.random()*100);
  this.rtc = options.rtc;
  this.name = options.name || '';
  this.el = options.el || document.createElement('video');
  this.streamOptions = options.streamOptions || {
    'video': true,
    'audio': false
  };

  this.render();
}

User.prototype.render = function () {
  this.el.id = 'video_'+this.id;
  this.el.setAttribute('autoplay', true);
  document.body.appendChild(this.el);
};

User.prototype.connect = function (cb) {
  return this.rtc.createStream(this.streamOptions, (function (stream) {
    this.attachStream(stream);
    if (cb) { cb(stream); }
  }).bind(this));
};

User.prototype.attachStream = function (stream) {
  // get local stream for manipulation
  this.stream = stream;
  stream.onended = this.endStream.bind(this);
  this.rtc.attachStream(stream, this.el.id);
  this.el.play();
};

User.prototype.endStream = function () {
  debugger;
  this.el.style.display = 'none';
};

User.prototype.sync = function () {
  console.log('sync', this);
};

User.prototype.say = function () {
  console.log('connect', this);
};

User.prototype.takeback = function () {
  throw new Error('Sorry, no take-backs');
};

module.exports = User;
