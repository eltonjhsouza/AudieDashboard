import { http, newsHttp, airesUrl } from 'src/boot/axios'

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

// Upaload de imagens
export const s3policy = () => {
  return http.get('/api/v1/s3policy/').then(i => i.data)
}

export const saveImageFile = (payload) => {
  return http.post('/api/v1/image', payload).then(i => i.data)
}

export const getImgUrl = (fileName) => {
  return http.get('/api/v1/image/' + fileName).then(i => i.data)
}

//Busca biblioteca do Aires
export const getLibraryFiles = (type) => {
  return airesUrl.get("/api/v1/file?fileType=" + type).then((i) => i.data)
}

export const getFileById = (fileId) => {
  return airesUrl.get("/api/v1/file/detail/" + fileId).then((i) => i.data)
}

export const deleteFile = (fileId) => {
  return airesUrl
    .delete("/api/v1/file/instance/" + fileId + "/")
    .then((i) => i.data)
}

export const setFileAsUploded = (payload) => {
  return airesUrl
    .put("/api/v1/file/update/status/upload", payload)
    .then((i) => i.data)
}

export const getIntanceContent = () => {
  return airesUrl.get("/api/v1/instance/summary/").then((i) => i.data)
}

export const saveFile = (payload) => {
  return airesUrl.post("/api/v1/file/create/", payload).then((i) => i.data)
}