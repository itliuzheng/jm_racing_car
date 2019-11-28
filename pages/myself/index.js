//index.js
const config = require('../../utils/config.js');
//获取应用实例
const app = getApp()

let timer = null

Page({
  data: {
    nickname:'hello',
    userInfo:null,
    userId:null,
    user:null,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo:false
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

    console.log('监听页面隐藏');
    // clearTimeout(timer);
    wx.hideLoading();
  },
  onShow() {

    this.getUserId();
  },
  getUserId() {

    wx.showLoading({
      title: '数据加载中...',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

    config.ajax('GET', {

    }, `/user/current`, (res) => {

      if (res.data.data) {
        this.setData({
          userId: res.data.data.userId
        });
        this.getUser();

      } else {
        let token = wx.getStorageSync('token') || null;
        wx.hideLoading();

        // console.log('清除定时器');
        // clearTimeout(timer);

        if (!app.globalData.uid) {
          wx.navigateTo({
            url: '/pages/login/toloading/toloading'
          })
        }
        if (!token) {
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
        // config.mytoast(res.data.msg, (res) => { })
      }
    }, (res) => {

    })
  },
  getUser() {

    config.ajax('GET', {

    }, `/user/${this.data.userId}`, (res) => {

      wx.hideLoading();

      if (res.data.code == 1) {
        this.setData({
          user: res.data.data,
          userInfo:app.globalData.userInfo,
          hasUserInfo:true
        });


      } else {
        config.mytoast(res.data.msg, (res) => { })
      }
    }, (res) => {

    })
  }
})
