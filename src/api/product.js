import request from '@/units/request'
export const getProList = (paramsObj) => {
  const { goodsName, categoryId, sortPrice, sortType } = paramsObj
  return request.get('/goods/list', {
    params: {
      goodsName,
      page: 1,
      categoryId,
      sortPrice,
      sortType
    }
  })
}

export const getDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

export const getComment = (goodsId) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId, limit: 5
    }
  })
}
