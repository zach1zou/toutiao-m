import request from '@/utils/request'
import store from '@/store'
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data: data
  })
}

export const sendCodes = (mobile) => {
  return request({
    method: 'get',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

export const getUserInfo = () => {
  return request({
    method: 'get',
    url: '/v1_0/user',
    headers: {
      Authorization: `Bear ${store.state.user.token}`
    }
  })
}
// 获取用户个人资料
export const getUserInfoApi = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

// 编辑用户个人资料

export const ChangeUserInfoApi = (name, gender, birthday, realName, intro) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data: {
      name,
      gender,
      birthday,
      real_name: realName,
      intro
    }
  })
}
// 编辑用户照片资料（头像、身份证照片）
export const ChangeUserPhotoApi = (photo) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data: photo
  })
}
// 关注用户
export const followingsApi = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: { target }
  })
}
// 取消关注用户
export const NotfollowingsApi = (target) => {
  return request({
    method: 'delete',
    url: `/v1_0/user/followings/${target}`
  })
}
