<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/dashboard" name="Dashboard" icon="ti-panel"/>
        <sidebar-link to="/stats" name="User Profile" icon="ti-user"/>
        <sidebar-link to="/table-list" name="Table List" icon="ti-view-list-alt"/>
        <sidebar-link to="/typography" name="Typography" icon="ti-text"/>
        <sidebar-link to="/icons" name="Icons" icon="ti-pencil-alt2"/>
        <sidebar-link to="/notifications" name="Notifications" icon="ti-bell"/>
      </template>
      <mobile-menu>
        <drop-down class="nav-item"
                     title="Hello"
                     title-classes="nav-link"
                     icon="ti-user">
            <router-link :to="{path:'/settings'}" class="dropdown-item"><i class="ti-settings"></i> Settings</router-link>
            <a href="#" v-on:click="logout" class="dropdown-item"><i class="ti-power-off"></i> Log out</a>
        </drop-down>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
import auth from "../../js/auth"
import * as types from "../../js/types"
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    logout(){
      auth.logout().then(response => {
        this.$store.commit(types.LOGOUT);
        this.$router.push({
          path: '/auth/login'
        });
      });
    }
  }
};
</script>
