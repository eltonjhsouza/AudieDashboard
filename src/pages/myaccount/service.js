import { airesUrl } from "src/boot/axios"

export const loginPost = (payload) => {
  return airesUrl.post("/api/v1/auth/token/issuer/", payload).then((i) => i.data)
}

export const getInstances = () => {
  return airesUrl.get("/api/v1/auth/list-instances/").then((i) => i.data)
}

export const selectStation = (payload) => {
  return airesUrl.post("/api/v1/Instance/Is-Empty/", payload).then((i) => i.data)
}

export const setTimezone = (payload) => {
  return airesUrl.post("/api/v1/station/load/", payload).then((i) => i.data)
}

export const isAreaClient = () => {
  return airesUrl.get("/api/v1/Account/Is-Area-Cliente").then((i) => i.data)
}

export const sendWelcomeMail = () => {
  return airesUrl.get("api/rest-auth/user/sendwelcomeauthmail/").then((i) => i.data)
}

export const setStation = () => {
  return airesUrl.put("v1/station/configure-station").then((i) => i.data)
}

export const createInstance = () => {
  return airesUrl.get("/api/v1/instance/create-new").then((i) => i.data)
}

export const getOperatorsBySoftware = (idSoftware) => {
  return airesUrl
    .get('/api/v1/customeroperator/software/' + idSoftware)
    .then((i) => i.data)
}

export const getCustomerProfile = () => {
  return airesUrl.get('/api/v1/customerprofile').then((i) => i.data)
}