<template>
  <div>
    <!-- errors -->
    <response-error v-bind:response_errors="response_errors"></response-error>
    <!--Stats cards-->
    <div class="row">
      <div class="col-md-6 col-xl-3">
        <stats-card>
          <div class="icon-big text-center icon-warning" slot="header">
            <i class="ti-server"></i>
          </div>
          <div class="numbers" slot="content">
            <p>Dogs</p>
            {{dogs.length}}
          </div>
          <div class="stats" slot="footer">
            <i class="ti-reload"></i> Updated now
          </div>
        </stats-card>
      </div>
      <div class="col-md-6 col-xl-3">
        <stats-card>
          <div class="icon-big text-center icon-warning" slot="header">
            <i class="ti-search"></i>
          </div>
          <div class="numbers" slot="content">
            <p>Need a dog?</p>
                <p-button type="info"
                          round
                          @click.native.prevent="getRandomDog">
                  Rock!
                </p-button>
          </div>
          <div class="stats" slot="footer">
            <i class="ti-reload"></i> Updated now
          </div>
        </stats-card>
      </div>
    </div>

    <!--Dogs-->
    <div class="row">
      <div class="col-md-6 col-xl-3" >
        <card class="card" title="Activities">
          <div v-if="activity_log != ''">
            <textarea rows="5" class="form-control rounded-0" readonly>{{ activity_log }}</textarea>
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
      activity_log: '',
      response_errors:[]
    };
  },
  created(){
      this.getDogs();
      this.interval = setInterval(() => this.generateActivity(), 10000);
  },
  methods: {
    getRandomDog() {
      this.$validator.validateAll().then((result) => {
          if (result) {
             events.find_random_dog()
              .then(response => {
                this.getDogs();
              })
              .catch(error => {
                this.response_errors = error;
              });
          }
      });
    },
    getDogs() {
      doggy.get_dogs()
            .then(response => {
              this.dogs = response.data;
              if(this.dogs.length > 0) {
                this.$store.commit(types.DOG, this.dogs[0]);
              } 
            })
            .catch(error => {
              this.response_errors = error;
            });
    },
    generateActivity() {
      if(this.$store.state.dog.id > 0) {
          doggy.generate_activity(this.$store.state.dog.id)
            .then(response => {
              this.activity_log = response.data.log;
            })
            .catch(error => {
              this.response_errors = error;
            });
      }
      

    }
  }
};
</script>
<style>
</style>
