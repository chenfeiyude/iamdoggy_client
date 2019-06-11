<template>
  <div class="fadeInDown">
    <div id="formContent">
      <!-- Icon -->
      <div class="fadeIn first">
        <span class="ti-user"></span> 
      </div>
      <register-form>

      </register-form>
      <div  id="formFooter" class="form-group">
        <small id="emailHelp">Already have an account? <router-link to="/auth/login">Login</router-link>.</small>
        <small id="emailHelp" class="form-text text-muted">Can't remember your password? <router-link to="/auth/forgot_password">Reset your Password</router-link>.</small>
      </div>
    </div>
  </div>
</template>
<script>
import RegisterForm from "./Auth/RegisterForm"
export default {
  components: {
    RegisterForm
  }
};
</script>
<style>
</style>