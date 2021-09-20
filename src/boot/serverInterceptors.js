// import { eventHub } from '../../config.js'
import { Dialog } from "quasar"

export default (http, store, router) => {
  http.interceptors.request.use((config) => {
    // Do something before request is sent
    return store.dispatch("checkRefreshToken").then((token) => {
      // if (token) {
        // config.headers.common.Authorization = `Bearer ${token}`
        config.headers.common.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImE5MjU4NmYyN2Q1NzhhODBjZmZkMzQzNjMyNmJjZWQ2IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2MzIxNDAzMjAsImV4cCI6MTYzMjIyNjcyMCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTEwMSIsImF1ZCI6WyJhY2NvdW50IiwiY29tbWVyY2lhbHN0dWRpbyIsImFpcmVzc3R1ZGlvIl0sImNsaWVudF9pZCI6ImFpcmVzY29tbWVyY2lhbHdlYiIsInN1YiI6ImVsdG9uamhzb3V6YUBnbWFpbC5jb20iLCJhdXRoX3RpbWUiOjE2MzIxNDAyNzMsImlkcCI6ImxvY2FsIiwiQ29udGFjdE5hbWUiOiJFbHRvbiBHbWFpbCAxIiwiVG9rZW5UeXBlIjoiVXNlckNyZWRlbmNpYWwiLCJlbWFpbCI6ImVsdG9uamhzb3V6YUBnbWFpbC5jb20iLCJFbWFpbENvbmZpcm1lZCI6dHJ1ZSwiVXNlckNyZWF0ZWREYXRlIjoiMTMvMDYvMjAxNyAxMjozNTo0NyIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCIsImFjY291bnQiLCJhY2NvdW50LnJlYWQiLCJjb21tZXJjaWFsc3R1ZGlvIiwiY29tbWVyY2lhbHN0dWRpby5hY2Nlc3MiLCJhaXJlc3N0dWRpbyIsImFpcmVzc3R1ZGlvLmFjY2VzcyIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwd2QiXX0.nsIw8nKmLszTDuq9fI8AMevfzN1FHpWJk-qzZXn7hDyNccYmpPrwKYvxogEqi8kwqfjdpjrQtwv0imCLxeYocja2oOxmT4nSuwcnXFEde1bY1eIWp1RQpXt-9B7bB7B7N3PATAxALenVXUJ3wPIJHSblosOtyYxXpaGEfabd_X79o_A4wo3FQMZ0LjAJKlxOrPzyAhk0LTJ3CZwmmyLPsBQEpE08wW19bOApXcncWoU1fpYXnslrbR16aJ0n3O7hPmCaTWVEBQucA8xwtXjj-9lDPabNaPFodOIu-s6WhUkcCjiPbNf3fLulpNxRmqg_s9ZuqKUBtHMnrSmeBzNNag`
      // }
      return config
    })
  })

  // https://github.com/mzabriskie/axios#interceptors
  http.interceptors.request.use(
    function(config) {
      // Do something before request is sent
      if (store.state.language != null) {
        config.headers["x-language"] = store.state.language
      } else {
        config.headers["x-language"] = "pt-br"
      }

      if (store.state.selected_station) {
        config.headers["X-StationId"] =
          store.state.selected_station.stationId || sessionStorage.stationId
      }

      return config
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error)
    }
  )

  http.interceptors.response.use(
    (response) => {
      return response
    },
    /**
     * This is a central point to handle all
     * error messages generated by HTTP
     * requests
     */
    (error) => {
      const { response } = error
      console.log(response)

      if ([401].indexOf(response.status) > -1) {
        // store.dispatch('checkRefreshToken2');
        router.push({
          name: "requestAccessToken",
          query: { redirectUrl: window.location.href }
        })
        // store.dispatch(SEND_NOTIFY, {
        //   title: `Sessão`,
        //   message: 'Sua sessão expirou, por favor faça login novamente.',
        //   type: 'info'
        // });
      } else if ([403].indexOf(response.status) > -1) {
        router.push({ name: "stations" })
      } else if ([400].indexOf(response.status) > -1) {
        let message = ""
        if (response.data.hasOwnProperty("notifications")) {
          response.data.notifications.forEach((element) => {
            message = message + element.message + "<br/>"
          })
          // alert(message)
          Dialog.create({
            title: `Ops... Houve um problema!`,
            message:
              `
              <b>Algo ocorreu ao tentar processar sua ação. Veja abaixo detalhes do ocorrido:</b>
              <br/><br/>` + message,
            html: true,
            cancel: false,
            ok: {
              label: "Ok",
              "no-caps": true,
              color: "red-8"
            }
          })
        } else if (response.data.hasOwnProperty("errors")) {
          // alert(JSON.stringify(response))
          if (response.data.errors.hasOwnProperty("issueDate")) {
            Dialog.create({
              title: "Ops... Houve um problema!",
              message:
                `
                <b>Algo ocorreu ao tentar processar sua ação. Veja abaixo detalhes do ocorrido:</b>
                <br/><br/>` +
                "Data de Emissão: " +
                JSON.stringify(response.data.errors.issueDate),
              html: true,
              cancel: false,
              ok: {
                label: "Ok",
                "no-caps": true,
                color: "red-8"
              }
            })
          } else {
            Dialog.create({
              title: "Ops... Houve um problema!",
              message:
                `
                <b>Algo ocorreu ao tentar processar sua ação. Veja abaixo detalhes do ocorrido:</b>
                <br/><br/>` + JSON.stringify(response.data.errors),
              html: true,
              cancel: false,
              ok: {
                label: "Ok",
                "no-caps": true,
                color: "red-8"
              }
            })
          }
        } else {
          // alert(JSON.stringify(response))
          Dialog.create({
            title: "Ops... Houve um problema!",
            message:
              `
              <b>Algo ocorreu ao tentar processar sua ação. Veja abaixo detalhes do ocorrido:</b>
              <br/><br/>` + JSON.stringify(response),
            html: true,
            cancel: false,
            ok: {
              label: "Ok",
              "no-caps": true,
              color: "red-8"
            }
          })
        }
      } else if ([500].indexOf(response.status) > -1) {
        if (typeof response.data === "string") {
          if (response.data.includes("x-stationid precisa ser setado")) {
            router.push({ name: "stations" })
          }
        } else {
          Dialog.create({
            title: "Ops... Houve um problema!",
            message:
              `
              <b>Algo ocorreu ao tentar processar sua ação. Veja abaixo detalhes do ocorrido:</b>
              <br/><br/>` + JSON.stringify(response),
            html: true,
            cancel: false,
            ok: {
              label: "Ok",
              "no-caps": true,
              color: "red-8"
            }
          })
        }
      } else {
        // alert(JSON.stringify(response))
        Dialog.create({
          title: "Ops... Houve um problema!",
          message:
            `
            <b>Algo ocorreu ao tentar processar sua ação. Veja abaixo detalhes do ocorrido:</b>
            <br/><br/>` + JSON.stringify(response),
          html: true,
          cancel: false,
          ok: {
            label: "Ok",
            "no-caps": true,
            color: "red-8"
          }
        })
      }

      console.log(response.status)

      if (typeof response.data.push === "function") {
        // if (isArray(response.data)) {
        // store.dispatch('setMessage', { type: 'error', message: response.data.messages })
      } else {
        // store.dispatch('setMessage', { type: 'validation', message: response.data })
      }
      // store.dispatch('setFetching', { fetching: false })
      return Promise.reject(error)
    }
  )
}