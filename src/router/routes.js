import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import LobbyLayout from "@/layout/lobby/LobbyLayout.vue"

// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";
import Login from "@/pages/Login.vue"


const routes = [
  {
    path: "/auth",
    component: LobbyLayout,
    redirect: "/auth/login",
    children: [
      {
        path: "login",
        name: "login",
        component: Login
      }
    ]
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        meta: {
          requireAuth: true,
        },
        component: Dashboard
      },
      {
        path: "stats",
        name: "stats",
        meta: {
          requireAuth: true,
        },
        component: UserProfile
      },
      {
        path: "notifications",
        name: "notifications",
        meta: {
          requireAuth: true,
        },
        component: Notifications
      },
      {
        path: "icons",
        name: "icons",
        meta: {
          requireAuth: true,
        },
        component: Icons
      },
      {
        path: "typography",
        name: "typography",
        meta: {
          requireAuth: true,
        },
        component: Typography
      },
      {
        path: "table-list",
        name: "table-list",
        meta: {
          requireAuth: true,
        },
        component: TableList
      }
    ]
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
