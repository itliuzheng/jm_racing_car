// pages/login/toloading/toloading.js
const config = require('../../../utils/config.js');
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  /**
   * 保存用户头像
   */
  savaUserInfo(resp) {
    config.ajax('POST', {
      openId: app.globalData.uid,
      avatarUrl: resp.avatarUrl,
      nickName: resp.nickName,
      gender: resp.gender,
      province: resp.province,
      city: resp.city,
      country: resp.country
    }, config.saveInfo, (res) => {
      console.log('config.saveInfo---', res);
      console.log(res.data.msg);
      if (res.data.msg == "成功") {

        wx.redirectTo({
          url: '/pages/login/login'
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
      console.log('onGotUserInfo---', res);
      if (res.data.code == 1) {
        app.globalData.uid = res.data.data
        this.savaUserInfo(e.detail.userInfo)
      } else {
        config.mytoast('服务器错误,请稍后再试', (res) => { })
      }
    }, (res) => { })
  },
})