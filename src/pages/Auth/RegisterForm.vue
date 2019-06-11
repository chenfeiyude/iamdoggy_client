<template>
  <div>
    <response-error v-bind:response_errors="response_errors"></response-error>
    <form id="register_form" v-on:submit.prevent="register">
      <div class="form-group" :class="{ 'control': true }">
        <input  v-model="user.username" v-validate="'required|email'" v-on:blur="checkEmail" v-on:focus="clearErrorMessage" class="form-control fadeIn second" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="email" placeholder="Enter email">
        <div class="alert alert-warning" v-show="errors.has('email')">
          <button type="button" aria-hidden="true" class="close"></button>
          <span>{{ errors.first('email') }}</span>
        </div>
      </div>
      <div class="form-group" :class="{ 'control': true }">
        <input v-model="user.password" v-validate="'required|min:6|max:20'" class="form-control fadeIn third" :class="{'input': true, 'is-danger': errors.has('password') }" name="password" type="password" ref="password" placeholder="Enter password">
        <div class="alert alert-warning" v-show="errors.has('password')">
          <button type="button" aria-hidden="true" class="close"></button>
          <span>{{ errors.first('password') }}</span>
        </div>
      </div>
      <div class="form-group" :class="{ 'control': true }">
        <input v-validate="'required|confirmed:password'" class="form-control fadeIn third" :class="{'input': true, 'is-danger': errors.has('password_confirmation') }" name="password_confirmation" type="password" placeholder="Confirm password">
        <div class="alert alert-warning" v-show="errors.has('password_confirmation')">
          <button type="button" aria-hidden="true" class="close"></button>
          <span>{{ errors.first('password_confirmation') }}</span>
        </div>
      </div>
      <div class="form-group">
        <input type="submit" :disabled="errors.any() || response_errors.length > 0" class="btn btn-primary fadeIn fourth" value="Sign Up">
      </div>
    </form>
  </div>
</template>

<script>
import auth from '../../js/auth'
import * as types from '../../js/types'
import ResponseError from '../Notifications/ResponseError'

export default {
  name: 'RegisterForm',
  data(){
  	  return {
        user: {
            username: '',
            password: '',
        },
        check_email_response : { },
        response_errors:[]
  	  }
  },
  components: {
      ResponseError
  },
  computed: {

  },
  methods:{
    register(){
      this.clearErrorMessage();
      this.$validator.validateAll().then((result) => {
            if (result) {
              auth.register(this.user.username, this.user.password).then(response => {
                this.$store.commit(types.LOGIN, response.data);
                this.$router.push('/');
              })
            .catch(error => {
              this.response_errors = error;
            });
          }
      });
    },
    checkEmail(){
      auth.check_email(this.user.username)
      .then(response =>{
        this.check_email_response = response.data;
        if(this.check_email_response.exist){
          this.response_errors.push("This email has already been registered");
        }else{
          this.clearErrorMessage();
        }
      })
      .catch(error => {
        this.response_errors = error;
      });
    },
    clearErrorMessage: function() {
      this.response_errors = [];
    }
  }
}
</script>
