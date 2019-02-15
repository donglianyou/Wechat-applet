// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowPinDao:false,
    // 内容高度
    height:100,
    // 所有频道
    channels:[
      { name: '推荐', id: 'tuijian', data: [] },
      { name: '热点', id: 'redian', data: [] },
      { name: '本地', id: 'bendi', data: [] },
      { name: '社会', id: 'shehui', data: [] },
      { name: '娱乐', id: 'yule', data: [] },
      { name: '军事', id: 'jushi', data: [] },
      { name: '科技', id: 'keji', data: [] },
      { name: '汽车', id: 'qiche', data: [] },
    ],
    // 当前激活的频道
    activeChannel:'tuijian',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showPinDao:function(){
    this.setData({isShowPinDao:true})
  },
  hidePinDao:function(){
    this.setData({ isShowPinDao:false})
  },
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    // 设置内容区域高度
    var height = wx.getSystemInfoSync().windowHeight - 45;
    this.setData({height:height});
    // 接收this指向
    var that = this;
    // 请求数据
    wx.request({
      url: 'http://c.m.163.com/nc/article/headline/data/10-20.html?from=toutiao&passport=&devId=OPdeGFsVSojY0ILFe6009pLR%2FMsg7TLJv5TjaQQ6Hpjxd%2BaWU4dx4OOCg2vE3noj&size=20&version=5.5.3&spever=false&net=wifi&lat=&lon=&ts=1456985878&sign=oDwq9mBweKUtUuiS%2FPvB015PyTDKHSxuyuVq2076XQB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore',
      success(res) {
        // console.log(res.data)
        that.setData({'channels[0].data':res.data.data})
      }
    })
  },
  // 点击切换频道
  clickChangeChannel:function(e){
    // 获取当前点击的频道id
    var id = e.currentTarget.dataset.id;
    // 设置当前正在浏览频道id
    this.setData({ activeChannel: id});
    
    // 获取当前频道下标
    var index = e.currentTarget.dataset.index;
    // 检测当前频道是否有数据
    if (this.data.channels[index].data.length == 0){
      // 如果没有 请求接口获取数据
      var that = this;
      wx.request({
        url: 'http://c.m.163.com/nc/article/headline/data/10-20.html?from=toutiao&passport=&devId=OPdeGFsVSojY0ILFe6009pLR%2FMsg7TLJv5TjaQQ6Hpjxd%2BaWU4dx4OOCg2vE3noj&size=20&version=5.5.3&spever=false&net=wifi&lat=&lon=&ts=1456985878&sign=oDwq9mBweKUtUuiS%2FPvB015PyTDKHSxuyuVq2076XQB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore',
        success(res) {
          var key = 'channels['+index+'].data';
          that.setData({[key]: res.data.data })
        }
      })
    }
    
  },
  // 滑动切换频道
  swipeChangeChannel:function(e){
    // 获取当前事件的itemId
    var id = e.detail.currentItemId;
    // 设置正在浏览的频道id
    this.setData({activeChannel:id});
    // 获取当前频道下标
    var index = e.detail.current;
    // console.log(index);
    // 检测当前频道是否有数据
    if (this.data.channels[index].data.length == 0) {
      // 如果没有 请求接口获取数据
      var that = this;
      wx.request({
        url: 'http://c.m.163.com/nc/article/headline/data/10-20.html?from=toutiao&passport=&devId=OPdeGFsVSojY0ILFe6009pLR%2FMsg7TLJv5TjaQQ6Hpjxd%2BaWU4dx4OOCg2vE3noj&size=20&version=5.5.3&spever=false&net=wifi&lat=&lon=&ts=1456985878&sign=oDwq9mBweKUtUuiS%2FPvB015PyTDKHSxuyuVq2076XQB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore',
        success(res) {
          var key = 'channels[' + index + '].data';
          that.setData({ [key]: res.data.data })
        }
      })
    }
  },
  lower(e){
    console.log(e);
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

  }
})