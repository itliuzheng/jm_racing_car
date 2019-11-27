//index.js
//获取应用实例
const config = require('../../utils/config.js');
const app = getApp()

Page({
  data: {
    title:{
      top:'活动信息',
      title:'保时捷赛车试驾',
      desc:'最新最热的保时捷概念赛车邀请你火热试驾'
    },
    is_my_detail: true,
    id: null
  },
  onLoad: function (e) {
    console.log(e);
    this.getInit(e.id);
    this.setData({
      id: e.id
    });
  },
  getInit(id) {
    let _this = this;
    wx.showLoading({
      title: '数据加载中...',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

    config.ajax('GET', {}, `/activity/activity/${id}`, (resp) => {
      wx.hideLoading();
      let res = resp.data;

      _this.setData({
        info: res.data
      })

    }, (error) => { }, (complete) => {
    })
  },
})
