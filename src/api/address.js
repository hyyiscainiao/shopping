import request from '@/units/request'
export const getaddress = () => {
  return request.get('/address/list')
}
