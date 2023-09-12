const INFO_KEY = 'hm_shopping_info'
const Key = 'HistoryKey'
export const getInfo = () => {
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : { token: '', userId: '' }
}

export const setInfo = (info) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(info))
}

export const removeInfo = (info) => {
  localStorage.removeItem(info)
}

export const getKey = () => {
  const result = localStorage.getItem(Key)
  return result ? JSON.parse(result) : []
}

export const setKey = (arr) => {
  localStorage.setItem(Key, JSON.stringify(arr))
}
