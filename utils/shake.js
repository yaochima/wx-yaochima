////////// shake.js

const ShakeManager = function() {
  // this.callbacks = {};
  this.callback = null;

  const that = this;

  wx.onAccelerometerChange(function() {
    if (movedAlot && that.enabled && that.callback) {
      that.callback();
      // that.callbacks.keys().forEach(function(page) {
      //   that.callbacks[page]();
      // });
    }
  });
};

ShakeManager.prototype.disable = function() {
  this.enabled = false;
};

ShakeManager.prototype.register = function(page, callback) {
  // this.callbacks[page] = callback;
  this.callback = callback;
};

ShakeManager.prototype.unregister = function(page) {
  // delete this.callbacks[page];
  delete this.callback;
};


module.exports = function() {
  return new ShakeManager();
};

