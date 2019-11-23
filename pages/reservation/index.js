//index.js
const config = require('../../utils/config.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    tabInfo: ['活动预约', '我的预约'],
    currentTab:0,
    areas: ["北京", "天津", "石家庄", "杭州", "上海"],
    dateList: [
      {
        "date": "2019-11-21",
        "day": 21,
        "month": "November",
        "week": "周四"
      },
      {
        "date": "2019-11-22",
        "day": 22,
        "month": "November",
        "week": "周五"
      },
      {
        "date": "2019-11-23",
        "day": 23,
        "month": "November",
        "week": "周六"
      },
      {
        "date": "2019-11-24",
        "day": 24,
        "month": "November",
        "week": "周日"
      },
      {
        "date": "2019-11-25",
        "day": 25,
        "month": "November",
        "week": "周一"
      },
      {
        "date": "2019-11-26",
        "day": 26,
        "month": "November",
        "week": "周二"
      },
      {
        "date": "2019-11-27",
        "day": 27,
        "month": "November",
        "week": "周三"
      }],
    activitys: {
      "current": 1,
      "data": [ ],
      "pageSize": 10,
      "pages": 1,
      "total": 1},
    place_index:null,
    time_index:null,
    time_now_index:0,
    activeTab: 0,
    isAll: false,
    swiperHeight: 1200,
    swiperPhotoHeight:1200,
    loading: false,
  },
  onLoad: function (options) {
    this.getActivity();
  },
  handlerStart(e) {
  },
  handlerMove(e) {
  },
  handlerCancel(e) {

  },
  handlerEnd(e) {
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom----');
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading();

    if (this.data.currentTab == 0){
      this.getActivity();
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }else{

    }

  },
  getActivity(page = 1) {
    let that = this;
    if (this.isLocked()) {
      return
    }

    this.locked();
    this.getSwiperHeight();
    wx.showLoading({
      title: '数据加载中...',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

    config.ajax('POST', {
      site: that.data.place_index != null ? that.data.areas[that.data.place_index] : '',
      startDate: that.data.time_index != null ? that.data.dateList[that.data.time_index].date : '',
      pageNum: page

    }, config.activity, (resp) => { }, (res) => { }, (resp) => {
      console.log('then-----', res);
      wx.hideLoading();
      let res = resp.data;
      if (page != 1) {
        this.data.activitys.data.push.apply(this.data.activitys.data, res.data.activitys.data);
        that.setData({
          activitys: that.data.activitys,
          areas: res.data.areas,
          dateList: res.data.dateList,
        })
      } else {
        that.setData({
          activitys: res.data.activitys,
          areas: res.data.areas,
          dateList: res.data.dateList,
        })
        
      }

      this.unLocked();
      this.getSwiperHeight();
    })
  },
  getRecommendPhoto() {
    let that = this;
    if (this.isLocked()) {
      return
    }
    if (!this.data.isAll) {
      this.locked();
      this.getSwiperPhotoHeight();
      // Article.getRecommendPhoto(this.data.pageIndex, 12).then(res => {
      //   if (res.data.length > 0) {
      //     this.data.photoList.push.apply(this.data.photoList, res.data);
      //     this.setData({
      //       photoList: this.data.photoList
      //     })
      //     // storage.put('topic', this.data.topicInfo, 600)
      //   } else {
      //     this.setData({
      //       isAll: true
      //     })
      //     this.data.isAll = true;
      //     this.data.pageIndex = 0;
      //     // storage.put('topicNum', this.data.topicInfo.length, 600);
      //   }
      //   this.unLocked();
      //   this.data.pageIndex++;
      //   this.getSwiperPhotoHeight();

      // })
      setTimeout(function () {
        that.unLocked();
        that.getSwiperPhotoHeight();
      }, 1000)
    }
  },
  clickTab: function (e) {
    console.log('tag',e);
    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  swiperTab: function (event) {
    let currentTab = event.detail.current;
    this.setData({
      currentTab: currentTab,
    });
    if (currentTab == 0) {
      // 调接口
      this.getActivity();
    } else if (currentTab == 1) {
      this.getRecommendPhoto();
    } 
  },


  getSwiperHeight() {
    const query = wx.createSelectorQuery();
    query.select('.stv-container').boundingClientRect();
    query.selectViewport().scrollOffset();

    query.exec(res => {
      console.log('info----',res);
      this.setData({
        swiperHeight: res[0].height
      })
    })
  },
  getSwiperPhotoHeight() {
    const query = wx.createSelectorQuery()
    query.select('.item-container-myactivity').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(res => {
      this.setData({
        swiperPhotoHeight: res[0].height
      })
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      place_index: e.detail.value
    })
    this.getActivity();

  },
  selectTime: function (e) {
    console.log('time', e, this.data.time_index);
    this.setData({
      time_index: e.currentTarget.dataset.index
    })
    this.getActivity();
  },
  goDetail:function(){
    wx.navigateTo({
      url: '../reservation_detail/index'
    })
  },
  goMyDetail: function () {
    wx.navigateTo({
      url: '../reservation_my_detail/index'
    })
  },
  isLocked() {
    return this.data.loading ? true : false;
  },

  locked() {
    this.data.loading = true;
    this.setData({
      loading: true
    })
  },

  unLocked() {
    this.data.loading = false;
    this.setData({
      loading: false
    })
  },
})