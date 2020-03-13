// pages/map/map.js
Page({
  data: {
    markers: [],
    locationX:null,
    locationY:null,
    height:300
  },
  onLoad: function (options) {
    this.setData({
      height: wx.getSystemInfoSync().windowHeight,　　//屏幕高度
    })

    let locationX = options.locationX;
    let locationY = options.locationY;
    this.setData({
      locationX:locationX,
      locationY:locationY,
      
      markers: [{
        // iconPath: "/images/detail/address.png",
        id: 0,
        latitude: locationX,
        longitude: locationY,
        width: 50,
        height: 50
      }],
    });
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }
})