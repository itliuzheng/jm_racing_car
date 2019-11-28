// pages/placeinfo/place_list/place_list.js
const config = require('../../../utils/config.js');
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{}
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
    this.getInit();
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

    if (this.data.list.current < this.data.list.pages) {
      let page = this.data.list.current + 1;
      this.getInit(page);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getInit(page = 1){

    let that = this;

    wx.showLoading({
      title: '数据加载中...',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

    console.log('page==', page);

    config.ajax('POST', {
      pageNum: page
    }, `/allocation/site-config/page`, (resp) => { }, (res) => { }, (resp) => {
      wx.hideLoading();
      let res = resp.data;
      if (page != 1) {
        this.data.list.data.push.apply(this.data.list.data, res.data);
        this.data.list.current = res.current;

        that.setData({
          activitys: that.data.list
        })
      } else {
        that.setData({
          list: res.data
        })

      }
    })
  },
  goDetail(e){
    wx.navigateTo({
      url: `/pages/placeinfo/index?id=${e.currentTarget.dataset.id}`
    })
  }
})