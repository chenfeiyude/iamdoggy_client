<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{routeName}}</a>
      <button class="navbar-toggler navbar-burger"
              type="button"
              @click="toggleSidebar"
              :aria-expanded="$sidebar.showSidebar"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <drop-down class="nav-item"
                     title="Hello"
                     title-classes="nav-link"
                     icon="ti-user">
            <router-link :to="{path:'/settings'}" class="dropdown-item"><i class="ti-settings"></i> Settings</router-link>
            <a href="#" v-on:click="logout" class="dropdown-item"><i class="ti-power-off"></i> Log out</a>
           </drop-down>
        </ul>
      </div>
    </div></nav>
</template>
<script>
import auth from "../../js/auth"
import * as types from "../../js/types"
export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  data() {
    return {
      activeNotifications: false,
      user: {
          username: '',
          firstName: '',
          lastName: ''
        }
    };
  },
  created(){
      this.user.username = this.$store.state.user.username;
      this.user.firstName = this.$store.state.user.firstName;
      this.user.lastName = this.$store.state.user.lastName;
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
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
<style>
</style>
