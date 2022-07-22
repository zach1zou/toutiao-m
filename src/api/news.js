import request from '@/utils/request'
// 获取文章新闻推荐
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
// 获取文章细节
export const getArticleDetailApi = (articleId) => {
  return request({
    method: 'get',
    url: '/v1_0/articles/' + articleId,
    params: {
      article_id: articleId
    }
  })
}
