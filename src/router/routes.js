import loginCallback from "../components/loginCallback.vue"
import requestAccessToken from "../components/requestAccessToken.vue"

const meta = {
  requiresAuth: true
}

const routes = [
  {
    path: "/",
    redirect: "/info/home"
  },
  {
      path: "/",
      component: () => import("../layouts/Account.vue"),
      children: [
        {
          name: "login",
          path: "info/home",
          component: () => import("pages/myaccount/home")
        }
      ]
    },
  
  {
    path: "/",
    meta,
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '/Home', meta, component: () => import('pages/Dashboard.vue')},
      {path: '/Dashboard2', meta, component: () => import('pages/Dashboard2.vue')},
      {path: '/Profile', meta, component: () => import('pages/UserProfile.vue')},
      {path: '/Map', component: () => import('pages/Map.vue')},
      {path: '/MapMarker', component: () => import('pages/MapMarker.vue')},
      {path: '/StreetView', component: () => import('pages/StreetView.vue')},
      {path: '/TreeTable', component: () => import('pages/TreeTable.vue')},
      {path: '/Charts', component: () => import('pages/Charts.vue')},
      {path: '/Cards', component: () => import('pages/Cards.vue')},
      {path: '/Tables', component: () => import('pages/Tables.vue')},
      {path: '/Contact', component: () => import('pages/Contact.vue')},
      {path: '/Checkout', component: () => import('pages/Checkout.vue')},
      {path: '/Calendar', component: () => import('pages/Calendar.vue')},
      {path: '/Pagination', component: () => import('pages/Pagination.vue')},
      {path: '/Taskboard', component: () => import('pages/TaskBoard.vue')},
      {path: '/Ecommerce', component: () => import('pages/ProductCatalogues.vue')},
      {path: '/News', component: () => import('pages/News/News.vue')},
      {path: '/Category', component: () => import('pages/News/Category.vue')},
      {name: 'NewPost', meta, path: '/NewPost', component: () => import('pages/News/Posts.vue')},
      {name: 'Streaming', meta, path: '/Streaming', component: () => import('pages/Componentes/Streaming/Streaming.vue')},
      {name: 'Settings', meta, path: '/Settings', component: () => import('pages/Settings/Settings.vue')},
      {name: 'Personalize', meta, path: '/Personalize', component: () => import('pages/Componentes/Personalizar/Personalize.vue')},
      {name: 'PreviewApp', meta, path: '/PreviewApp', component: () => import('pages/Componentes/PreviewApp/PreviewApp.vue')},

    ]
  },
  {
    path: '/Lock',
    component: () => import('pages/LockScreen.vue')
  },
  {
    path: '/Maintenance',
    component: () => import('pages/Maintenance.vue')
  },
  {
    path: '/Pricing',
    component: () => import('pages/Pricing.vue')
  },
  {
    path: '/Login-1',
    component: () => import('pages/Login-1.vue')
  },
  {
    path: '/Mail',
    component: () => import('layouts/Mail.vue')
  },
  {
    path: '/Lock-2',
    component: () => import('pages/LockScreen-2.vue')
  },

  {
    path: "/",
    component: () => import("layouts/Account.vue"),
    children: [
      {
        name: "logout",
        path: "logout",
        component: () => import("pages/myaccount/back")
      }
    ]
  },
  
  {
    path: "/account",
    meta,
    component: () => import("layouts/Stations.vue"),
    children: [
      {
        name: "stations",
        meta,
        path: "stations",
        component: () => import("pages/myaccount/stations.vue")
      },
      {
        name: "operators",
        meta,
        path: "operators/",
        component: () => import("pages/myaccount/components/operators.vue")
      }
    ]
  },
  {
    path: "/login-callback",
    component: loginCallback
  },

  {
    path: "/request-access-token",
    name: "requestAccessToken",
    component: requestAccessToken
  },
]


// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
