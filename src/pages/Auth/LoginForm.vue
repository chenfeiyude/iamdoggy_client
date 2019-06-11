<template>
  <div>
    <response-error v-bind:response_errors="response_errors"></response-error>
    <form id="login_form" v-on:submit.prevent="doLogin">
      <div class="form-group" :class="{ 'control': true }">
        <input v-model="user.username" v-validate="'required|email'" class="form-control fadeIn second" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="email" placeholder="Enter email">
        <div class="alert alert-warning" v-show="errors.has('email')">
          <button type="button" aria-hidden="true" class="close"></button>
          <span>{{ errors.first('email') }}</span>
        </div>
      </div>
      <div class="form-group" :class="{ 'control': true }">
          <input v-model="user.password" v-validate="'required|min:2'" class="form-control fadeIn third" :class="{'input': true, 'is-danger': errors.has('password') }" name="password" type="password" placeholder="Enter password">
          <div class="alert alert-warning" v-show="errors.has('password')">
            <button type="button" aria-hidden="true" class="close"></button>
            <span>{{ errors.first('password') }}</span>
          </div>
      </div>
      <div class="form-group">
        <input type="submit" class="btn btn-primary fadeIn fourth" value="Log In">
      </div>
    </form>
  </div>
</template>

<script>
import auth from '../../js/auth'
import * as types from '../../js/types'
import ResponseError from '../Notifications/ResponseError'

export default{
    data(){
    	  return {
          user: {
              username: '',
              password: '',
          },
          response_errors:[]
    	  }
    },
    components: {
        ResponseError
    },
    created() {
      if(this.$store.state.sessionExpired){
        this.response_errors.push("You have been logout, please login again");
      }
    },
    methods:{
      doLogin(){
        this.$validator.validateAll().then((result) => {
          if (result) {
             auth.login(this.user.username, this.user.password)
              .then(response => {
                  this.$store.commit(types.LOGIN, response.data);
                  let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                  this.$router.push({
                    path: redirect
                  });
              })
              .catch(error => {
                this.response_errors = error;
              });
          }
        });
      }
    }
}
</script>
