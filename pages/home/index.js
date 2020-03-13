// pages/home/index.js
const config = require('../../utils/config.js');
let app = getApp()
let timer = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{
      "draw":null,
      "current":null,
      "pageSize": null,
      "pages": null,
      "total": null,
      "recordsTotal": null,
      "recordsFiltered": null,
      data:[]
    },
    height:0
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
    let _this = this;
    let token = wx.getStorageSync('token') || null;

    this.setData({
      height: wx.getSystemInfoSync().windowHeight,　　//屏幕高度
    })
    
    console.log("token----");
    console.log(token);
    if (!token) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }else{
      this.getInit();
    }

   

    // wx.setTabBarBadge({//这个方法的意思是，为小程序某一项的tabbar右上角添加文本
    //   index: 3,   //代表哪个tabbar（从0开始）
    //   text: '3'		//显示的内容
    // })
    // wx.removeTabBarBadge({//这个方法为移除当前tabbar右上角的文本
    //   index: 2,		 //代表哪个tabbar（从0开始）
    // })
  },

  /**
   * 页面下拉刷新
   */
  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    
    this.getInit();

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  scrollBottomTab(e){
    if (this.data.info.current < this.data.info.pages) {
      let page = this.data.info.current + 1;
      this.getInit(page);
    }
  },
  goDetail: function (e) {
    console.log(e);
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/product/product?id=${id}`
    })
  },
  getInit(page = 1) {
    let _this = this;

    config.ajax('POST', {
      pageNum:page,
      pageSize:10
    }, config.getProject, (resp) => {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      let res = resp.data;
      if (res.code == 1) {
        res.data.data.forEach((value)=>{
          value.createDate = value.createDate.substring(0,10)
        })

        if (page != 1) {
          _this.data.info.data.push.apply(_this.data.info.data, res.data.data);
          _this.data.info.current = res.data.current;
  
          _this.setData({
            info: _this.data.info
          })
        } else {
          _this.setData({
            info: res.data
          })
        }


      } else {
        config.mytoast(res.msg, (res) => { })
      }
    }, (res) => {

    })
  }

})