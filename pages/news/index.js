//index.js
var WxParse = require('../../wxParse/wxParse.js');
const config = require('../../utils/config.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    id:null,
    article:`<div>国际赛车场主赛道是经国际汽联（FIA）认证的二级赛道，由国际知名的赛道设计公司Apex担纲，采用全球领先的智能化系统，力求最高效率的赛道管理和安全性。全长3.20公里，可分为两个独立运行的东、西赛道。</div>
      <div> 上海国际赛车场是上海国际汽车城营造汽车文化的重要组成部分选址在嘉定区安亭镇东北，距安亭镇中心约7公里。东至漳浦河西至松鹤路、东环路，南至宝安公路，北至规划中的郊区环线高速公路，总面积约5.3平方公里。上海国际赛车场是上海国际汽车城营造汽车文化的重要组成部分。选址在嘉定区安亭镇东北，距安亭镇中心约7公里。东至漳浦河，西至松鹤路、东环路，南至宝安公路，北至规划中的郊区环线高速公路，总面积约5.3平方公里。</div>`,
    info:{},

  },
  onLoad: function (e) {
    this.setData({
      id:e.id
    });
    this.getInit(e.id);

  },
  getInit(id) {

    let that = this;

    wx.showLoading({
      title: '数据加载中...',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })


    config.ajax('GET', {}, `/allocation/news/${id}`, (resp) => { }, (res) => { }, (resp) => {
      wx.hideLoading();
      let res = resp.data;

      that.setData({
        info: res.data
      })
      WxParse.wxParse('article', 'html', res.data.content, this, 0);
      

    })
  },
})
