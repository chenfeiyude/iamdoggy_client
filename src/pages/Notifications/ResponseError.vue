<template>
  <div class="response-error" v-if="response_errors.length">
    <p class="alert alert-danger" v-for="(error, index) in uniqueErrors" :key="index" >{{ error }}</p>
  </div>
</template>

<script>
export default{
    name: 'ResponseError',
    props: ['response_errors'],
    computed: {
        uniqueErrors() {
            var filtered_array = [];
            for(var i =0; i < this.response_errors.length; i++) {
                if(filtered_array.indexOf(this.response_errors[i]) === -1) {
                    filtered_array.push(this.response_errors[i]);
                }
            }
            return filtered_array;
        }
    }
}
</script>
