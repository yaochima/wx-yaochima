// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    restaurantId: null
  },
  onLoad: function (options) {
    console.log(options)
    console.log("restaurantoptions")
    console.log(options.id)
    this.setData({
      restaurantId: Number(options.id)
      // Number(options.id)
    });
    this.loadRestaurantData()

  },

  loadRestaurantData: function () {
    let restaurantId = this.data.restaurantId;
    console.log(restaurantId)
    wx.request({
      // url: 'https://yaochima.herokuapp.com/api/v1/restaurants/1',
      url: "https://yaochima.shanghaiwogeng.com/api/v1/restaurants/" + restaurantId,
      method: 'get',
      header: {},
      success: (res) => {
        console.log('successful!')
        console.log(res)
        console.log()
        this.setData({
          name: res.data.name,
          category: res.data.category,
          mainPhoto: res.data.profile_photo,
          rating: res.data.rating,
          price: res.data.price_per_person,
          phone: res.data.phone_number,
          address: res.data.address,
          currentCategory: res.data.category,
          currentPrice: res.data.price_per_person
        });
        
      },
    })
  },

  errorMessageToast: function () {
    wx.showToast({
      title: errorMessage,
      icon: 'loading',
      duration: 1500
    });
  },

  clickFooter: function (event) {

    // if (this.data.footerShare) {
    //   this.onShareAppMessage();
    // } else if (this.data.footerShake) {
    //   this.shakeTest();
    // } else {
    // }

    if (this.data.catOut) {
      var animateDown = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      })

      this.animateDown = animateDown

      animateDown.translate(0, 0).step({ duration: 1000 });

      this.setData({
        animationData: animateDown.export()
      })

      setTimeout(function () {
        this.setData({
          catOut: false
        })
      }.bind(this), 1000)

    } else {
      var animateUp = wx.createAnimation({
        timingFunction: 'ease',
      })

      this.animateUp = animateUp

      animateUp.translate(0, -415).step({ duration: 1500 });

      this.setData({
        animationData: animateUp.export(),
        catOut: true
      })
    }

  },



  /**
   * 生命周期函数--监听页面加载
   */


  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})