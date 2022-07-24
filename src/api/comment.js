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
// 对文章或者评论进行评论
export const PostCommentListApi = (target, content, artId) => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data: {
      target,
      content,
      art_id: artId
    }
  })
}

// 对评论或评论回复点赞
export const getCommentlikingsApi = (target) => {
  return request({
    method: 'post',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}
