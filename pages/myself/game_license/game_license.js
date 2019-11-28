// pages/myself/driver_license/driver_license.js
const config = require('../../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    image_front: null,
    image_black: null,
    "frontImg": "string //驾照正面base64照片",
    "frontImgSuffix": "string //驾照正面照片后缀",
    "backImg": "string //驾照背面base64照片",
    "backImgSuffix": "string //驾照背面照片后缀"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        id: options.id
      });
      this.getUser()

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

  },
  getUser() {
    wx.showLoading({
      title: '数据加载中...',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

    config.ajax('GET', {

    }, `/user/${this.data.id}`, (res) => {
      wx.hideLoading();

      if (res.data.code == 1) {
        let imageStr = res.data.data.gameImgUrl;
        this.setData({
          image_front: imageStr.split(',')[0],
          image_black: imageStr.split(',')[1]
        });

      } else {
        config.mytoast(res.data.msg, (res) => { })
      }
    }, (res) => {

    })
  },
  chooseImage(){
    let _this = this;
    wx.chooseImage({
      count:1,
      sizeType:'original',
      success: function(res) {
        let str = res.tempFilePaths[0];
        _this.setData({
          image_front: str
        })

        let suffix = str.substring(str.lastIndexOf('.'));

        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            console.log('data:image/png;base64,' + res.data)

            _this.setData({
              frontImg: res.data,
              frontImgSuffix: suffix
            })
          }
        })

      },
    })
  },
  chooseImageBlack() {
    let _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: 'original',
      success: function (res) {
        let str = res.tempFilePaths[0];
        _this.setData({
          image_black: res.tempFilePaths[0]
        })

        let suffix = str.substring(str.lastIndexOf('.'));

        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            console.log('data:image/png;base64,' + res.data)

            _this.setData({
              backImg: res.data,
              backImgSuffix: suffix
            })
          }
        })
      },
    })

  },
  confirmBtn(){
    if (!this.data.frontImg || !this.data.backImg ){

      config.mytoast('请上传有效图片', (res) => { })
      return false
    }


    let that = this;

    wx.showLoading({
      title: '数据加载中...',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })


    config.ajax('POST', {
      frontImg: this.data.frontImg,
      frontImgSuffix: this.data.frontImgSuffix,
      backImg: this.data.backImg,
      backImgSuffix: this.data.backImgSuffix
    }, `/user/uploadGameImg`, (resp) => { 

      wx.hideLoading();
      let res = resp.data;
      if (res.code == 1) {
        config.mytoast('上传成功', (res) => { })
        wx.switchTab({
          url: '/pages/myself/index',
        })
      }

    }, (res) => { }, (resp) => {})
  }
})