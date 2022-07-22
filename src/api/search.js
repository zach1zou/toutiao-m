import request from '@/utils/request'
// 获取搜索建议
export const getSuggestionListApi = (q) => {
  return request({
    method: 'get',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 获取搜索结果
export const getResultListApi = (page, perPage, q) => {
  return request({
    method: 'get',
    url: '/v1_0/search',
    params: {
      page,
      per_page: perPage,
      q
    }
  })
}
