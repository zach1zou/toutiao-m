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
// 收藏文章
export const getArticlecollectionsApi = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}
// 取消收藏
export const NotgetArticlecollectionsApi = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}
// 对文章点赞
export const getArticleLikingApi = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: { target }
  })
}
// 取消点赞
export const NotgetArticleLikingApi = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}
