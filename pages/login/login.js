// pages/login/login.js
const config = require('../../utils/config.js');
let app = getApp()
let interval = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['企业', '安全员', '管理员'],
    index:0,
    send_code:true,
    sms:'发送验证码',
    currentTime:61,
    phone:'点击右侧按钮'
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
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit(e){
    let form = e.detail.value;
    console.log(form);
    if (form.loginName == '') {
      config.mytoast('用户名不能为空', (res) => { })
      return false
    }
    if (form.password == '') {
      config.mytoast('密码不能为空', (res) => { })
      return false
    }

    config.ajax('POST', {
      loginName: form.loginName,
      password: form.password
    }, config.userlogin, (res) => {
      if (res.data.code == 1) {
        wx.setStorageSync('token', res.data.data)
        wx.switchTab({
          url: '/pages/home/index'
        })
      }else{
        config.mytoast(res.data.msg, (res) => { })
      }
    }, (res) => {
      config.mytoast('网络异常，请稍后重试', (res) => { })
    })
  },
})