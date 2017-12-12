////////// shake.js


var SHAKE_THRESHOLD = 200
var lastUpdate = 0
var x, y, z, lastX, lastY, lastZ
var flag = true

const ShakeManager = function() {
  // this.callbacks = {};
  this.callback = null;

  const that = this;
  // console.log('lololo');

  x = y = z = lastX = lastY = lastZ = 0

  wx.onAccelerometerChange(function(res) {
    // console.log(res);
    x = res.x;
    y = res.y;
    z = res.z;
    // that.setData({
    //   x: res.x,
    //   y: res.y,
    //   z: res.z,
    // })
    var time = new Date()
    var curTime = time.getTime()
    if ((curTime - lastUpdate) > 100) {
      var diffTime = curTime - lastUpdate
      lastUpdate = curTime
      x = res.x
      y = res.y
      z = res.z
      var speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000
      if (speed > SHAKE_THRESHOLD) {
        // 判断数据是否载入和是否在允许的时间（5秒每次间隔）
        if (flag && that.callback) {

          that.showToast(that.callback);

          // that.shakeSound.play()
          // // 随机获取电影
          // that.getFilm()
          // setTimeout(function () {
          //   that.shakeCompleteSound.play()
          // }, 800)
          flag = false
          setTimeout(function () {
            flag = true
          }, 5000)
        }
      }
      lastX = x
      lastY = y
      lastZ = z
    }
  });
};

ShakeManager.prototype.showToast = function(callback) {
  var that = this
  var start = 0
  var count = 250
  wx.showToast({
    title: '数据加载中',
    icon: 'loading',
    duration: 15000
  })
  setTimeout(function() {
    callback({
      done: function () {
        wx.hideToast();
      }
    });
  }, 1000);
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


 // if (movedAlot && that.enabled && that.callback) {
    //   that.callback(res);
    //   // that.callbacks.keys().forEach(function(page) {
    //   //   that.callbacks[page]();
    //   // });
    // }