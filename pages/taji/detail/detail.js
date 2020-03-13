// pages/taji/detail/detail.js
const config = require('../../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    serialNum:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let id = options.id;
    this.setData({
      serialNum: id
    });
    // this.getInit();
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

  getInit() {
    let url = `/device/tower-crane/${this.data.id}`;

    config.ajax('GET', {

    }, url, (res) => {

      if (res.data.code == 1) {
        this.setData({
          info: res.data.data
        });
      } else {
        config.mytoast(res.data.msg, (res) => { })
      }
    }, (res) => {

    })
  }
})