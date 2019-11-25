// pages/home/index.js
const config = require('../../utils/config.js');
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    hasUserInfo:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
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

      console.log('error--');
      this.setData({
        hasUserInfo: false
      })
    }
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

  },
  hideMask(){
    this.setData({
      hasUserInfo:false
    })
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

  /**
   * 保存用户头像
   */
  savaUserInfo() {
    config.ajax('POST', {
      openId: app.globalData.uid,
      avatarUrl: app.globalData.userInfo.avatarUrl,
      nickName: app.globalData.userInfo.nickName,
      gender: app.globalData.userInfo.gender,
      province: app.globalData.userInfo.province,
      city: app.globalData.userInfo.city,
      country: app.globalData.userInfo.country
    }, config.saveInfo, (res) => {
      console.log('config.saveInfo---', res);
      console.log(res.data.msg);
      if (res.data.msg == "成功") {
        this.setData({
          hasUserInfo: true
        })
      }
    }, (res) => {

    })
  },
  /**
   * 获取用户信息
   */
  onGotUserInfo(e) {
    console.log(e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    config.getuid((res) => {
      console.log('onGotUserInfo---',res);
      if (res.data.code == 1) {
        app.globalData.uid = res.data.data
        this.savaUserInfo()
      } else {
        config.mytoast('服务器错误,请稍后再试', (res) => { })
      }
    }, (res) => { })
  },
})