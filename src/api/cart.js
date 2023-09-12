import request from '@/units/request'
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId, goodsNum, goodsSkuId
  })
}

export const getCartList = () => {
  return request.get('/cart/list')
}

export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId, goodsNum, goodsSkuId
  })
}

export const delCarts = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
