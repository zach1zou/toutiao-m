import request from '@/utils/request'

export const getArticleListApi = (channelId, timestamp) => {
  return request({
    method: 'get',
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
