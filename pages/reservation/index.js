//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tabInfo: ['活动预约', '我的预约'],
    currentTab:0,
    array: ['美国', '中国', '巴西', '日本'],
    weekArray: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    place_index:null,
    time_index:0,
    time_now_index:3,
    activeTab: 0,
    isAll: false,
    swiperHeight: 1200,
    swiperPhotoHeight:1200,
    loading: false,
  },
  onLoad: function (options) {
    this.getTopicInfoFromSever();
  },
  handlerStart(e) {
  },
  handlerMove(e) {
  },
  handlerCancel(e) {

  },
  handlerEnd(e) {
  },
  getTopicInfoFromSever() {
    let that = this;
    if (this.isLocked()) {
      return
    }
    if (!this.data.isAll) {
      this.locked();
      this.getSwiperHeight();
      // Topic.getTopicInfo(this.data.pageIndex, 12).then(res => {
      //   if (res.data.length > 0) {
      //     this.data.topicInfo.push.apply(this.data.topicInfo, res.data);
      //     this.setData({
      //       topicInfo: this.data.topicInfo
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
      //   this.getSwiperHeight();

      // })

      setTimeout(function(){
        that.unLocked();
        that.getSwiperHeight();
      },1000)
    }
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
      this.getTopicInfoFromSever();
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
  },
  selectTime: function (e) {
    console.log('time', e, this.data.time_index);
    this.setData({
      time_index: e.currentTarget.dataset.index
    })
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