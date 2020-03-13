
//获取应用实例
const config = require('../../utils/config.js');
const app = getApp()

Page({
  data: {
    info:{},
    height:0
  },
  onLoad: function (e) {
    this.setData({
      height: wx.getSystemInfoSync().windowHeight,　　//屏幕高度
    })
    this.getInit();
  },
  system: function (e) {
    wx.navigateTo({
      url: `/pages/message/system/index`
    })
  },
  alarm: function (e) {
    wx.navigateTo({
      url: `/pages/message/alarm/alarm`
    })
  },
  
  getInit(page = 1) {

    let _this = this;

    wx.showLoading({
      title: '数据加载中...',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })


    config.ajax('POST', {
      pageNum:page,
      pageSize:10
    }, config.getDevice,(resp) => {
      let res = resp.data;
      wx.hideLoading();
      if (res.code == 1) {

        if (page != 1) {
          _this.data.info.data.push.apply(_this.data.info.data, res.data.data);
          _this.data.info.current = res.data.current;
  
          _this.setData({
            info: _this.data.info
          })
        } else {
          console.log(res.data);
          _this.setData({
            info: res.data
          })
        }



      } else {
        config.mytoast(res.data.msg, (res) => { })
      }
    
    }, (res) => {

    })
  },
})
