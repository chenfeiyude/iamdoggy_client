import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import LobbyLayout from "@/layout/lobby/LobbyLayout";

// GeneralViews
import NotFound from "@/pages/Errors/404";

// Admin pages
import Dashboard from "@/pages/Dashboard";
import UserProfile from "@/pages/UserProfile";
import Notifications from "@/pages/Notifications";
import Icons from "@/pages/Icons";
import Typography from "@/pages/Typography";
import TableList from "@/pages/TableList";
import Login from "@/pages/Login";
import Registration from "@/pages/Registration";

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
      },
      {
        path: "registration",
        name: "registration",
        component: Registration
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
  {
    path: "/errors", 
    component: LobbyLayout,
    redirect: "/errors/404",
    children: [
      {
        path: "404",
        name: "404",
        component: NotFound
      }
    ]
  },
  { 
    path: "*",
    redirect: "/errors/404"
  }
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
