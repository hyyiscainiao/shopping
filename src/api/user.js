import request from '@/units/request'
export const getUserInfoDetail = () => {
  return request.get('/user/info')
}
