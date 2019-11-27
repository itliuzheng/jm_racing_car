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
  getPhoneNumber(e) {
    config.ajax('POST', {
      openId: app.globalData.uid,
      encriptedData: e.detail.encryptedData,
      iv: e.detail.iv,
    }, config.getWXPhone, (res) => {

      console.log(res.data);
      if (res.data.code == 1) {
        this.setData({
          phone: res.data.data
        })
      }
    }, (res) => {

    })

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
    let form = e.detail.value;
    console.log(form);
    if (form.loginName == '') {
      config.mytoast('手机号不能为空', (res) => { })
      return false
    }
    if (form.password == '') {
      config.mytoast('密码不能为空', (res) => { })
      return false
    }

    config.ajax('POST', {
      openId: app.globalData.uid,
      loginName: form.loginName,
      password: form.password
    }, config.userlogin, (res) => {
      console.log(res.data);

      if (res.data.code == 1) {
        wx.setStorageSync('token', res.data.data)
        wx.switchTab({
          url: '/pages/home/index'
        })
      }else{
        config.mytoast(res.data.msg, (res) => { })
      }
    }, (res) => {

    })

  },
  formSubmitRegister(e){
    let form = e.detail.value;
    console.log(form);
    if (this.data.phone == '' || this.data.phone == '点击右侧按钮'){
      config.mytoast('手机号不能为空', (res) => { })
      return false
    }
    if (form.password != form.passwordAgain) {
      config.mytoast('密码不一致，请重新输入', (res) => { })
      return false
    }
    if (form.identityNo == '') {
      config.mytoast('身份证号不能为空', (res) => { })
      return false
    }
    if (form.realName == '') {
      config.mytoast('真实姓名不能为空', (res) => { })
      return false
    }
    if (form.age == '') {
      config.mytoast('年龄不能为空', (res) => { })
      return false
    }


    config.ajax('POST', {
      openId: app.globalData.uid,
      phone: this.data.phone,
      password: form.password,
      passwordAgain: form.passwordAgain,
      identityNo: form.identityNo,
      realName: form.realName,
      age: form.age,
      sources:'微信小程序'
    }, config.register, (res) => {

      console.log(res.data);
      if (res.data.code == 1) {

        config.mytoast('注册成功，正在跳转', (res) => { })

        setTimeout(function(){
          wx.redirectTo({
            url: '/pages/login/login'
          })
        },1000)
      }else{
        config.mytoast(res.data.msg, (res) => { })
      }
    }, (res) => {

    })

  }
})