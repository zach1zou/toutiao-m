import storage from '@/store/storage'
import request from '@/utils/request'

export const getUserChannels = () => {
  return request({
    method: 'get',
    url: '/v1_0/user/channels'
  })
}

export const getAllChannels = () => {
  return request({
    method: 'get',
    url: '/v1_0/channels'
  })
}

export const DelChannels = (target) => {
  return request({
    method: 'delete',
    url: `/v1_0/user/channels/${target}`
  })
}

export const AddChannels = (id, seq) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [{ id, seq }]
    }
  })
}

// eslint-disable-next-line camelcase
const Heima_Toutiao_Channel = 'Heima_Toutiao_Channel'

export const getMyChannelByLocal = () => storage.get(Heima_Toutiao_Channel)
export const setMyChannelByLocal = (Channel) =>
  storage.set(Heima_Toutiao_Channel, Channel)
