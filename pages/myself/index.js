//index.js
const config = require('../../utils/config.js');
//获取应用实例
const app = getApp()

let timer = null

Page({
  data: {
    userId:null,
    user:null
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
    
    let token = wx.getStorageSync('token') || null;
    if (!token) {
      console.log('token==',token);
      wx.navigateTo({
        url: '/pages/login/login'
      })
      return false;
    }

    let pages = getCurrentPages();
    let currPage = null;
    if (pages.length) {
      currPage = pages[pages.length - 1];
    }
    let url = currPage.options.url;
    console.log(currPage.__displayReporter.showReferpagepath);
    if (currPage.__displayReporter.showReferpagepath == 'pages/login/login.html') {
      wx.reLaunch({
        url: '/pages/home/index',
      })
      return false;
    } else {

      this.getUserId();
    }
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
        
        if (!token) {
          console.log('token==',token);
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
        });


      } else {
        config.mytoast(res.data.msg, (res) => { })
      }
    }, (res) => {

    })
  },
  goOut(){
    wx.setStorageSync('token','')
    
    wx.navigateTo({
      url: '/pages/login/login'
    })
  }
})
