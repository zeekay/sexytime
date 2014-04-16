function User (options) {
  options = options || {};
  this.rtc = options.rtc,
  this.name = options.name || '';
  this.el = options.el || document.createElement('video');
  this.el.id = 'video_'+options.id;
  this.streamOptions = {
    'video': true,
    'audio': false
  };

  this.render();
};

User.prototype.render = function () {
  document.body.appendChild(this.el);
};

User.prototype.connect = function (cb) {
  var _this = this;
  console.log('connect', this);
  return this.rtc.createStream(this.streamOptions, (function (stream) {
    this.attachStream(stream);
    if (cb) { cb(stream); }
  }).bind(this));
};

User.prototype.attachStream = function (stream) {
  // get local stream for manipulation
  this.stream = stream;
  this.rtc.attachStream(this.stream, this.el.id);
  this.el.play();
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

module.exports = User
