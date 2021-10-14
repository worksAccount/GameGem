import request from '@/utils/request'

export function logIn(data) {
  let url = '/offerwall/api/ads/wallPlayerLogin'
  const keys = Object.keys(data)
  if (keys.length) {
    keys.map((key, index) => {
      if (index === 0) url += `?${key}=${data[key]}`
      if (index !== 0) url += `&${key}=${data[key]}`
    })
  }

  return request({
    url: url,
    method: 'post',
    data
  })
}

export function signUp(data) {
  return request({
    url: '/offerwall/api/ads/register',
    method: 'post',
    data
  })
}

export function addTask(data) {
  let url = '/offerwall/api/ads/addTask'
  const keys = Object.keys(data)
  if (keys.length) {
    keys.map((key, index) => {
      if (index === 0) url += `?${key}=${data[key]}`
      if (index !== 0) url += `&${key}=${data[key]}`
    })
  }
  return request({
    url: url,
    method: 'post',
    data
  })
}

export function addTaskSendMail(data) {
  let url = '/offerwall/api/ads/addTaskSendMail'
  const keys = Object.keys(data)
  if (keys.length) {
    keys.map((key, index) => {
      if (index === 0) url += `?${key}=${data[key]}`
      if (index !== 0) url += `&${key}=${data[key]}`
    })
  }
  return request({
    url: url,
    method: 'post',
    data
  })
}

export function sendTaskMail(data) {
  let url = '/offerwall/api/ads/sendTaskMail'
  const keys = Object.keys(data)
  if (keys.length) {
    keys.map((key, index) => {
      if (index === 0) url += `?${key}=${data[key]}`
      if (index !== 0) url += `&${key}=${data[key]}`
    })
  }
  return request({
    url: url,
    method: 'post',
    data
  })
}

export function getTask(data) {
  let url = '/offerwall/api/ads/queryTasks'
  return request({
    url: url,
    method: 'get',
    data
  })
}

export function getList(data) {
  let url = '/offerwall/api/ads/offerList'
  const keys = Object.keys(data)
  if (keys.length) {
    keys.map((key, index) => {
      if (index === 0) url += `?${key}=${data[key]}`
      if (index !== 0) url += `&${key}=${data[key]}`
    })
  }

  return request({
    url: url,
    method: 'get'
  })
}

export function changePlayerPassword(data) {
  let url = '/offerwall/api/ads/changePlayerPassword'
  const keys = Object.keys(data)
  if (keys.length) {
    keys.map((key, index) => {
      if (index === 0) url += `?${key}=${data[key]}`
      if (index !== 0) url += `&${key}=${data[key]}`
    })
  }

  return request({
    url: url,
    method: 'post'
  })
}

export function getVerificationCode(data) {
  let url = '/offerwall/api/ads/getCode'
  const keys = Object.keys(data)
  if (keys.length) {
    keys.map((key, index) => {
      if (index === 0) url += `?${key}=${data[key]}`
      if (index !== 0) url += `&${key}=${data[key]}`
    })
  }

  return request({
    url: url,
    method: 'post'
  })
}

export function changePlayerPasswordByCode(data) {
  let url = '/offerwall/api/ads/changePlayerPasswordByCode'
  const keys = Object.keys(data)
  if (keys.length) {
    keys.map((key, index) => {
      if (index === 0) url += `?${key}=${data[key]}`
      if (index !== 0) url += `&${key}=${data[key]}`
    })
  }

  return request({
    url: url,
    method: 'post'
  })
}

export function queryBalanceRecords(data) {
  let url = '/offerwall/api/ads/queryBalanceRecords'
  return request({
    url: url,
    method: 'get',
    data
  })
}
