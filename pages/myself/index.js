//index.js
const config = require('../../utils/config.js');
//获取应用实例
const app = getApp()

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
  onShow() {
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


    setTimeout(function () {
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
    }, 2000)

    this.getUserId();
  },
  getUserId() {

    config.ajax('GET', {

    }, `/user/current`, (res) => {
      console.log(res.data);

      if (res.data.code == 1) {
        this.setData({
          userId: res.data.data.userId
        });
        this.getUser();

      } else {
        config.mytoast(res.data.msg, (res) => { })
      }
    }, (res) => {

    })
  },
  getUser() {

    config.ajax('GET', {

    }, `/user/${this.data.userId}`, (res) => {
      console.log(res.data);

      if (res.data.code == 1) {
        this.setData({
          user: res.data.data
        });

      } else {
        config.mytoast(res.data.msg, (res) => { })
      }
    }, (res) => {

    })
  }
})
