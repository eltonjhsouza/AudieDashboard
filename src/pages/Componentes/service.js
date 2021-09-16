import { http, newsHttp } from 'src/boot/axios'

// Urls

export const saveUrl = (payload) => {
  return http.post('/api/v1/url', payload).then(i => i.data)
}

export const getUrl = (id) => {
  return http.get('/api/v1/url/' + id).then(i => i.data)
}

export const getAllUrls = () => {
  return http.get('/api/v1/url/all').then(i => i.data)
}

export const getAllUrlsByTypeId = (id) => {
  return http.get('/api/v1/url/allByTypeId/' + id).then(i => i.data)
}

export const updateUrlById = (id, payload) => {
  return http.put('/api/v1/url/' + id, payload).then(i => i.data)
}

export const deleteUrlById = (id) => {
  return http.delete('/api/v1/url/' + id).then(i => i.data)
}

// NEWS 
export const getNews = () => {
  return http.get('/api/v1/News/').then(i => i.data)
}

//Personalize
export const postConfiguration = (payload) => {
  return http.post('/api/v1/Personalize', payload).then(i => i.data)
}

export const getConfiguration = () => {
  return http.get('/api/v1/Personalize/').then(i => i.data)
}

