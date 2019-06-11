<template>
  <div class="fadeInDown">
    <div id="formContent">
      <!-- Icon -->
      <div class="fadeIn first">
        <span class="ti-user"></span> 
      </div>
      <login-form>

      </login-form>
      <!-- Remind Passowrd -->
      <div  id="formFooter" class="form-group">
        <small id="emailHelp">New user? <router-link to="/auth/registration">Sign Up</router-link>.</small>
        <small id="emailHelp" class="form-text text-muted">Can't remember your password? <router-link to="/auth/forgot_password">Reset your Password</router-link>.</small>
      </div>
    </div>
  </div>
</template>
<script>
import LoginForm from "./Auth/LoginForm"
export default {
  components: {
    LoginForm
  }
};
</script>
<style>
</style>