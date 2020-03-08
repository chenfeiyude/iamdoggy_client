<template>
  <div>
    <!-- errors -->
    <response-error v-bind:response_errors="response_errors"></response-error>

    <!--Dogs-->
    <div class="row">
      <div v-for="dog in dogs" v-bind:key="dog" class="col-md-12 col-xl-6">
        <card :title="dog.breed" subTitle="All activities are related to this dog">
          <div slot="raw-content" class="table-responsive">
            <table class="table table-striped">
              <tr><th>Healthy</th><td>{{dog.healthy}}</td></tr>
              <tr><th>State</th><td>{{dog.state}}</td></tr>
              <tr><th>Born at</th><td>{{dog.born}}</td></tr>
              <tr><th>Age</th><td>{{dog.age}}</td></tr>
              <tr><th>Level</th><td>{{dog.level}}</td></tr>
              <tr><th>Speed</th><td>{{dog.speed}}</td></tr>
              <tr><th>Attack</th><td>{{dog.attack}}</td></tr>
              <tr><th>Defence</th><td>{{dog.defence}}</td></tr>
            </table>
          </div>
          <div slot="footer" v-show="dog.primary == false" class="text-center">
            <p-button type="info"
                        round
                        @click.native.prevent="setPrimaryDog(dog.id)">
                Set Primary
            </p-button>
           </div>
        </card>
      </div>
    </div>

  </div>
</template>
<script>
import { StatsCard, ChartCard } from "@/components/index";
import Chartist from 'chartist';
import events from '../js/events'
import doggy from '../js/doggy'
import * as types from '../js/types'
import ResponseError from './Notifications/ResponseError'

export default {
  components: {
    StatsCard,
    ChartCard,
    ResponseError
  },
  data() {
    return {
      dogs: [],
      response_errors:[]
    };
  },
  created(){
    this.getDogs();
  },
  methods: {
    getDogs() {
      doggy.get_dogs()
        .then(response => {
            this.dogs = response.data;
        })
        .catch(error => {
            this.response_errors = error;
        });
    },
    setPrimaryDog(pid) {
        doggy.set_primary_dog(pid)
        .then(response => {
            this.getDogs();
        })
        .catch(error => {
            this.response_errors = error;
        });
    }
  }
};
</script>
<style>
</style>
