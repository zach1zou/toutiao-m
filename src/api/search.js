import request from '@/utils/request'

export const getSuggestionListApi = (q) => {
  return request({
    method: 'get',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
