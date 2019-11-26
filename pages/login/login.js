// pages/login/login.js
const config = require('../../utils/config.js');
let app = getApp()
let interval = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isType:'login',
    send_code:true,
    sms:'发送验证码',
    currentTime:61
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
  clickNav(e){
    this.setData({
      isType: e.currentTarget.dataset.nav
    });
  },
  getSms(){
    this.data.currentTime--;
    this.setData({
      sms: this.data.currentTime+'秒'
    })
    if (this.data.currentTime <= 0) {
      clearInterval(interval)
      this.setData({
        sms: '重新发送',
        currentTime: 61,
        send_code: true
      })
    }
  },
  sendCode(){
    if (this.data.send_code){
      this.setData({
        send_code:false
      });
      interval = setInterval(this.getSms,1000);
    }
  },
  formSubmit(e){
    console.log(e.detail);
  },
  formSubmitRegister(e){
    let form = e.detail.value;
    console.log(form);
    if(form.phone == ''){
      config.mytoast('手机号不能为空', (res) => { })
      return false
    }

  }
})