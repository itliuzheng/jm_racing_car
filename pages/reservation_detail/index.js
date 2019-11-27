//index.js

const config = require('../../utils/config.js');

//获取应用实例
const app = getApp()

Page({
  data: {
    title:{
      top:'活动信息'
    },
    info:null,
    is_my_detail:false,
    id:null
  },
  onLoad: function (e) {
    console.log(e);
    this.getInit(e.id);
    this.setData({
      id:e.id
    });

  },
  onShow(){

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
  confirmBtn() {
    let _this = this;
    wx.showLoading({
      title: '数据加载中...',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

    config.ajax('POST', {
      openId: app.globalData.uid,
      activityId:_this.data.id
    }, config.activity_book, (resp) => {
      wx.hideLoading();
      let res = resp.data;

      if(res.code != -1){
        config.mytoast('预约成功', (res) => {
          wx.navigateBack({
            delta: 1,
          })
        })
      }else{
        config.mytoast(res.msg,(res)=>{
          console.log('redirectTo');
          wx.navigateTo({
            url:'/pages/login/login'
          })
        })
      }


    }, (error) => { }, (complete) => {
    })

  }
})
