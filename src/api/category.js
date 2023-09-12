import request from '@/units/request'

export const getCategoryData = () => {
  return request.get('/category/list')
}
