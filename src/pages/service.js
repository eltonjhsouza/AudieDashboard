import { http, newsHttp } from 'src/boot/axios'

export const getStation = (payload) => {
  return http.get('/api/v1/Station/ByToken/' + payload).then(i => i.data)
}

export const getPromotions = () => {
  return http.get('/api/v1/Promotion').then(i => i.data)
}


// News

export const getNews = (payload) => {
  return newsHttp.get('/v2/everything?q=all&apiKey=043097549b174edd84cd9d36d04d3e79&from=' + payload + '&language=pt').then(i => i.data)
}

// Users and Promotions

export const postUser = (payload) => {
  return http.post('/api/v1/Person/', payload).then(i => i.data)
}

export const postParticipant = (payload) => {
  return http.post('/api/v1/Participant', payload).then(i => i.data)
}


export const getParticipantbyPromoID = (payload) => {
  return http.get('/api/v1/Participant/ByPromotionID/' + payload).then(i => i.data)
}


// Persons

export const getPersonByID = (payload) => {
  return http.get('/api/v1/Person/ById/' + payload).then(i => i.data)
}



// Listener
export const postActiveListener = (playload)  => {
  return http.post('/api/v1/Listener/ActiveListeners', playload).then(i => i.data)
}

export const updateListenerStatus = (listenerID, playload)  => {
  return http.put('/api/v1/Listener/' + listenerID, playload).then(i => i.data)
}

export const getActiveListeners = () => {
    return http.get('/api/v1/Listener/Active').then(i => i.data)
  }
  
// Posts
export const getPosts = () => {
  return http.get('/api/v1/News/').then(i => i.data)
}

export const addPost = (payload) => {
  return http.post('/api/v1/News/', payload).then(i => i.data)
}

export const deletePost = (id) => {
  return http.delete('/api/v1/News/' + id).then(i => i.data)
}

export const updatePost = (id, payload) => {
  return http.put('/api/v1/News/' + id, payload).then(i => i.data)
}

// Categorias
export const getCategory = () => {
  return http.get('/api/v1/NewsCategory/').then(i => i.data)
}

export const addCategory = (payload) => {
  return http.post('/api/v1/NewsCategory/', payload).then(i => i.data)
}

export const getCategoryById = (id) => {
  return http.get('/api/v1/NewsCategory/ById/' + id).then(i => i.data)
}

export const updateCategory = (id, payload) => {
  return http.put('/api/v1/NewsCategory/' + id, payload).then(i => i.data)
}

export const deleteCategory = (id) => {
  return http.delete('/api/v1/NewsCategory/' + id).then(i => i.data)
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

export const updateUrlById = (id, payload) => {
  return http.put('/api/v1/url/' + id, payload).then(i => i.data)
}

export const deleteUrlById = (id) => {
  return http.delete('/api/v1/url/' + id).then(i => i.data)
}
