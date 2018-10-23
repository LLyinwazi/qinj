const db = wx.cloud.database()
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        loggined: false,
        user: {
            memberId: '',
            memberName: '',
            phone: ''
        },
       // all_coupon_list: [],
        my_coupon_list: []
    },

    //展示所有优惠券列表
    getAllCoupon: function () {
      var _this = this;
        wx.request({
            url: 'https://139.199.154.55/coupon/getAllCoupon',
            method: 'POST',
            success: res => {
              console.log("--------success all_coupon_list----" + res.data[0].couponName),
                this.setData({
                     all_coupon_list:res.data
                  })
            }
        }),
          console.log("-------- all_coupon_list----" + this.all_coupon_list)          
    },

    checkCoupons:function() {
      console.log("-------- all_coupon_list----" + this.all_coupon_list)    
    },

    bindAddCoupon: function () {

    },

    bindGetUser: function () {
        wx.request({
            url: 'https://139.199.154.55/getUser',
            data: {
                phone: '13686892927'
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            method: 'POST',
            success: res => {
                console.log('success-getName:' + res.data.memberName),
                    this.setData({
                        user: res.data
                    })
                console.log('now-user:' + this.data.user.memberId)
            },
            fail: res => {
                console.error('fail-get data')
            }
        })
    },

    bindtest: function () {
        wx.request({
            url: 'https://139.199.154.55/find',
            data: {
                phone: '13686892927'
            },
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success: res => {
                console.log('success-getName' + res.data.toString)
            },
            fail: res => {
                console.error('fail-get data')
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            this.setData({
                                avatarUrl: res.userInfo.avatarUrl,
                                userInfo: res.userInfo
                            })
                        }
                    })
                }
            }
        }),
          this.getAllCoupon;
    },

    onGetOpenid: function () {
        // 调用云函数
        wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
                console.log('[云函数] [login] user openid: ', res.result.openid)
                app.globalData.openid = res.result.openid
                wx.navigateTo({
                    url: '../index/index',
                })
            },
            fail: err => {
                console.error('[云函数] [login] 调用失败', err)
                wx.navigateTo({
                    url: '../index/index',
                })
            }
        })
    },

    // 用户微信登陆
    getUserInfo: function () {
        wx.getUserInfo({
            success: function (res) {
                var userInfo = res.userInfo
                userInfoSetInSQL(userInfo)
            },
            fail: function () {
                userAccess()
            }
        })
    },

    // 登陆成功，记录用户信息
    userInfoSetInSQL: function (userInfo) {
        wx.getStorage({
            key: 'third_Session',
            success: function (res) {
                wx.request({
                    url: 'Our Server ApiUrl',
                    data: {
                        third_Session: res.data,
                        nickName: userInfo.nickName,
                        avatarUrl: userInfo.avatarUrl,
                        gender: userInfo.gender,
                        province: userInfo.province,
                        city: userInfo.city,
                        country: userInfo.country
                    },
                    success: function (res) {
                        if (true) {
                            //SQL更新用户数据成功
                        } else {
                            //SQL更新用户数据失败
                        }
                    }
                })
            }
        })
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