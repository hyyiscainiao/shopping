import request from '@/units/request'
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 0,
      couponId: 0,
      isUsePoints: 0,
      ...obj
    }
  })
}

export const submitOrder = (mode, params) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10,
    couponId: 0,
    payType: 10,
    isUsePoints: 0,
    ...params
  })
}

export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}

export const cancleOrder = (orderId) => {
  return request.post('/order/cancel', {
    orderId
  })
}
