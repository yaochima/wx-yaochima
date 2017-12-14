// pages/restaurants/restaurant.js
var app = getApp()

Page({
  data: {
    restaurantId: null,
    categoryLocked: false,
    priceLocked: false,
    currentCategory: null,
    currentPrice: null,
    exclusions: [],
    rest_exclusions: [],
    lockedcategory: null, 
    lockedprice: null, 
    errorMessage: null,
    status: null,
    iconRatingPath: null,
    latitude: null,
    longitud: null, 
    animationData: {}, 
    catOut: false,
    phoneNumber: null,
    shakeSoundUrl: "https://yaochima.shanghaiwogeng.com/yaochima" + (Math.floor(Math.random() * 8) + 1) + ".mp3"
  }, 

  openLocation: function () {
    let page = this;
        wx.openLocation({
          latitude: page.data.latitude,
          longitude: page.data.longitude,
          address: page.data.address,
          name: page.data.name,
          scale: 28
        })
  },

  callRestaurant: function () {
    let page = this;
    wx.makePhoneCall({
      phoneNumber: page.data.phone
    })
  },

  toggleCategory: function (event) {
    // wx.showShareMenu({
    //   withShareTicket: true,
    //   success: function () {
    //     console.log('yay');
    //   },
    //   fail: function () {
    //     console.log('what a shame');
    //   }
    // })

    // console.log(event)
    this.setData({
      categoryLocked: !this.data.categoryLocked
    });
    // console.log(this.data.categoryLocked);
  },

  togglePrice: function (event) {
    // console.log(event)
    this.setData({
      priceLocked: !this.data.priceLocked
    });
    // console.log(this.data.priceLocked);
  },

  testShake: function(event) {
    this.shakeTest();
  },
  
  shakeTest: function (successCallback) {

    // this.setData({
    //   lockedcategory: null,
    //   lockedprice: null,
    // });

    // console.log(event);
    let that = this;

    
    this.data.rest_exclusions.push(this.data.restaurantId);

    if (this.data.categoryLocked && !this.data.priceLocked) {
      this.setData({
        lockedcategory: this.data.currentCategory,
        lockedprice: null
      });
      // console.log("category locked");
      // console.log(this.data.lockedcategory);
      // console.log(this.data.lockedprice);

    } else if (this.data.categoryLocked && this.data.priceLocked) {
      this.setData({
        lockedcategory: this.data.currentCategory,
        lockedprice: this.data.currentPrice,
      });
      // console.log("both locked");
      // console.log(this.data.lockedcategory);
      // console.log(this.data.lockedprice);

    } else if (!this.data.categoryLocked && this.data.priceLocked) {
      this.setData({
        lockedcategory: null,
        lockedprice: this.data.currentPrice,
      });
      this.data.exclusions.push(this.data.currentCategory);
      // console.log("price locked");
      // console.log(this.data.lockedcategory);
      // console.log(this.data.lockedprice);
      // console.log(this.data.exclusions)

    } else {
        this.data.exclusions.push(this.data.currentCategory);
        this.setData({
        lockedcategory: null,
        lockedprice: null
        })


        // console.log("none locked");
        // console.log(this.data.lockedcategory);
        // console.log(this.data.lockedprice);
        // console.log(this.data.exclusions)
    }

    wx.request({
      url: 'https://yaochima.shanghaiwogeng.com/api/v1/shakes',
      method: 'post',
      data: {
        "lat": app.globalData.lat, 
        "lng": app.globalData.lng,
        "rest_exclusions": this.data.rest_exclusions,
        "exclusions": this.data.exclusions,
        "lockedcategory": this.data.lockedcategory,
        "lockedprice": this.data.lockedprice,
        
      },
      success: function (res) {
        // console.log("important: subsequent shake response")
        // console.log(res.data)
        if (res.data.status == "ok" ){

          console.log("status:")
          console.log(res.data.status)
          console.log("id:")
          console.log(res.data.restaurants.id)

          that.setData({
            restaurantId: res.data.restaurants.id,
            status: res.data.status,
          });
          that.loadRestaurantData(successCallback);
        } else if (res.data.status == "error" ) {
          // console.log("printing exclusions")
          // console.log(this.data.exclusions)
          // console.log("status:")
          // console.log(res.data.status)
          // console.log("error")
          // console.log(res.data.error.error_message)
          that.setData({
            errorMessage: res.data.error.error_message,
            exclusions: []
          });
        
          wx.showModal({
            title: 'Whoops!',
            content: that.data.errorMessage,
            confirmText: "OK",
            showCancel: false,
            success: function (res) {
              console.log('success modal')
              console.log("going back to beginning")
              wx.reLaunch({
                url: '../index/index'
              })
            }
          });
        }
      }
    })
  },

  onLoad: function (options) {
    console.log(options)
    console.log("restaurantoptions")
    console.log(options.id)
    this.setData({
      restaurantId: Number(options.id)
    });
    this.loadRestaurantData();

    let that = this;

    app.globalData.shakeManager.register(this, {
      allow: function() {
        return app.globalData.gotLocation
      },
      success: function (args) {
        // when shaked
        // console.log("Shaked!")
        that.shakeTest(args.done);
      }
    });
  },
  
  loadRestaurantData: function (successCallback) {
    let restaurantId = this.data.restaurantId;

    wx.request ({
      // url: 'https://yaochima.herokuapp.com/api/v1/restaurants/1',
      url: "https://yaochima.shanghaiwogeng.com/api/v1/restaurants/" + restaurantId,
      method: 'get',
      header: { },
      success:  (res) => {
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
            latitude: res.data.lat,
            longitude: res.data.lng,
            currentPrice: res.data.price_per_person,
            priceRange: this.createPriceRange(res.data.price_per_person),
            iconRatingPath: this.ratingIcon(res.data.rating),
            distance: this.getDistanceFromLatLonInKm(res.data.lat, res.data.lng, app.globalData.lat, app.globalData.lng),
            timeToRestaurant: Math.round(this.getDistanceFromLatLonInKm(res.data.lat, res.data.lng, app.globalData.lat, app.globalData.lng) * 90 / 5000)
          }); 
          console.log(this.data.distance)
          console.log(this.data.iconRatingPath)
          if (successCallback) {
            successCallback();
            console.log(this.data.shakeSoundUrl)

            this.shakeSound = wx.createInnerAudioContext()

            this.shakeSound.src = this.data.shakeSoundUrl
          
            this.shakeSound.play()
            this.setData({
              shakeSoundUrl: "https://yaochima.shanghaiwogeng.com/yaochima" + (Math.floor(Math.random() * 8) + 1) + ".mp3"
            })
          }
        },
    })
  },

  ratingIcon: function (rating){
    if (rating == 3){
      return "../../assets/images/icons/svg/icon_three_star.svg"
    } else if (rating == 4){
      return "../../assets/images/icons/svg/icon_four_star.svg"
    } else if (rating == 5) {
      return "../../assets/images/icons/svg/icon_five_star.svg"
    } else {
      return "../../assets/images/icons/svg/icon_three_star.svg"
    }
  },


  createPriceRange: function (price) {
    if (price > 300) {
      return ">300"
    } else if (price > 100) {
      return "100-300"
    } else if (price > 50 ) {
      return "50-100"
    } else if (price <= 50) {
      return "<50"
    } else {
      return "error"
    }
  },


getDistanceFromLatLonInKm: function (lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = this.deg2rad(lon2 - lon1); 
  var a =
  Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
  Math.sin(dLon / 2) * Math.sin(dLon / 2)
  ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in m
  return Math.round(d * 1000);
},

deg2rad: function (deg) {
  return deg * (Math.PI / 180)
},

  errorMessageToast: function () {
    wx.showToast({
      title: errorMessage,
      icon: 'loading',
      duration: 1500
    });
  },

  clickFooter: function (event) {

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
      
      animateUp.translate(0, -415).step({duration: 1500});

      this.setData({
        animationData: animateUp.export(),
        catOut: true 
      })
    }

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
    // wx.showShareMenu({
    //   withShareTicket: true
    // })
  
  return {
    title: '摇来这儿吃嘛 😊',
    path: 'pages/share/share?id=' + this.data.restaurantId
  }
  }
})