// pages/product/product.js
const config = require('../../utils/config.js');
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    this.setData({
      id: id
    });
    this.getInit();
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
  getInit(page = 1) {
    let url = `/project/${this.data.id}`;


    config.ajax('GET', {

    }, url, (res) => {

      if (res.data.code == 1) {
        res.data.data.createDate = res.data.data.createDate.substring(0,10);

        this.setData({
          info: res.data.data
        });
      } else {
        config.mytoast(res.data.msg, (res) => { })
      }
    }, (res) => {

    })
  },
  goMap:function(e){
    let locationX = e.currentTarget.dataset.locationx;
    let locationY = e.currentTarget.dataset.locationy;

    console.log(e);
    wx.navigateTo({
      url: `/pages/map/map?locationX=${locationX}&locationY=${locationY}`
    })
  }
})