// pages/home/index.js
const config = require('../../utils/config.js');
let app = getApp()
let timer = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    news:[],
    hasUserInfo:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let token = wx.getStorageSync('token') || null;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })

      console.log('hasUserInfo-1--', this.data.hasUserInfo);

      console.log('token=1==', token);

      if (!token) {
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })

        console.log('hasUserInfo-2--', this.data.hasUserInfo);

        console.log('token=2==', token);

        if (this.data.hasUserInfo == false) {
          wx.navigateTo({
            url: '/pages/login/toloading/toloading'
          })
        }
        if (!token) {
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        },
      })
      console.log('hasUserInfo-3--', this.data.hasUserInfo);

      console.log('token=3==', token);

      if (this.data.hasUserInfo == false) {
        wx.navigateTo({
          url: '/pages/login/toloading/toloading'
        })
      }

      if (!token) {
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }
    }


    timer = setTimeout(function(){
      console.log('hasUserInfo-4--', _this.data.hasUserInfo);

      if (_this.data.hasUserInfo == false) {
        wx.navigateTo({
          url: '/pages/login/toloading/toloading'
        })
      }
      if (!token) {
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }
    },2000)
    

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
    this.getBanner();
    this.getNews();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearTimeout(timer)
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

  },
  goActivity: function () {
    wx.navigateTo({
      url: '../reservation/index'
    })
  },
  goPlace:function(){
    wx.navigateTo({
      url: '../placeinfo/index'
    })
  },
  getBanner() {

    config.ajax('POST', {

    }, config.getBanner, (res) => {
      console.log(res.data);

      if (res.data.code == 1) {
        this.setData({
          background: res.data.data.data
        });
      } else {
        config.mytoast(res.data.msg, (res) => { })
      }
    }, (res) => {

    })
  },
  getNews() {

    config.ajax('POST', {

    }, config.getNews, (res) => {

      if (res.data.code == 1) {
        this.setData({
          news: res.data.data.data
        });
        console.log(this.data.news);
      } else {
        config.mytoast(res.data.msg, (res) => { })
      }
    }, (res) => {

    })
  }

})