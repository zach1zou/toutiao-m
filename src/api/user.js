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
