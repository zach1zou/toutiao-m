import request from '@/utils/request'
// 获取评论或评论回复
export const getCommentListApi = (type, source, offset, limit) => {
  return request({
    method: 'get',
    url: '/v1_0/comments',
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}
// 对评论或评论回复点赞
export const getCommentlikingsApi = (target) => {
  return request({
    method: 'post',
    url: '/v1_0/comment/likings',
    params: {
      target
    }
  })
}
