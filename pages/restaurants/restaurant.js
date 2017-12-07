// pages/restaurants/restaurant.js
var app = getApp()
Page({
  data: {
    categoryLocked: false,
    priceLocked: false,
    currentCategory: null,
    currentPrice: null,
    exclusions: [],
  }, 

  toggleCategory: function (event) {
    // console.log(event)
    this.setData({
      categoryLocked: !this.data.categoryLocked
    });
    console.log(this.data.categoryLocked);
  },

  togglePrice: function (event) {
    // console.log(event)
    this.setData({
      priceLocked: !this.data.priceLocked
    });
    console.log(this.data.priceLocked);
  },
  
  shakeTest: function (event) {
    console.log(event);

    if (this.data.categoryLocked == true && this.data.priceLocked == false) {
      this.setData({
        lockedcategory: this.data.currentCategory
      })
    } else if (this.data.categoryLocked == true && this.data.priceLocked == true) {
      this.setData({
        lockedcategory: this.data.currentCategory,
        lockedprice: this.data.currentPrice
      });
    } else if (this.data.categoryLocked == false && this.data.priceLocked == true) {
      this.setData({
        lockedprice: this.data.currentPrice,
      });
      this.data.exclusions.push(this.data.currentCategory);
    } else if (this.data.categoryLocked == false && this.data.priceLocked == false) {
      console.log("none locked"),
        this.data.exclusions.push(this.data.currentCategory)
    }

    wx.request({
      url: 'https://yaochima.herokuapp.com/api/v1/shakes',
      method: 'post',
      data: {
        "lat": app.globalData.lat, 
        "lng": app.globalData.lng,
        "exclusions": this.data.exclusions,
        "lockedcategory": this.data.currentCategory,
        "lockedprice": this.data.currentPrice
      },
      success: function (res) {
        console.log("Parameter Post Success")
        this.loadData();
      }
    })
  },

  onLoad: function (options) {
    this.loadData();
  },
  
  loadData: function () {
    wx.request ({
      url: 'https://yaochima.herokuapp.com/api/v1/restaurants/1',
      // url: app.globalData.restaurantUrl + '1',
      // 'app.globalData.restaurantId',
      method: 'get',
      header: { },
      success:  (res) => {
        console.log(res.data),
        this.setData({
          name: res.data.name,
          category: res.data.category,
          mainPhoto: res.data.profile_photo, 
          rating: res.rating, 
          price: res.data.price_range, 
          phone: res.data.phone_number, 
          address: res.data.address,
          currentCategory: res.data.category,
          currentPrice: res.data.price_range 
        });  
        
      }
    })
    
  },

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