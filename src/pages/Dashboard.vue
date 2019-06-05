<template>
  <div>
    <!-- errors -->
    <response-error v-bind:response_errors="response_errors"></response-error>
    <!--Stats cards-->
    <div class="row">
      <div class="col-md-6 col-xl-3" v-for="stats in statsCards" :key="stats.title">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </div>
      
    </div>

    <!--Dogs-->
    <div class="row">
      <div class="col-md-6 col-xl-3" >
        <card class="card" title="Find Random Dog">
          <div>
            <form @submit.prevent>
              <div class="text-center">
                <p-button type="info"
                          round
                          @click.native.prevent="getRandomDog">
                  Rock!
                </p-button>
              </div>
              <div class="clearfix"></div>
            </form>
          </div>
        </card>
      </div>
      <div class="col-md-6 col-xl-3" >
        <card class="card" title="Activities">
          <div v-if="activity_log != ''">
            <pre>{{ activity_log }}</pre>
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
      statsCards: [],
      dogs: [],
      activity_log: '',
      response_errors:[]
    };
  },
  created(){
      this.getDogs();
      this.interval = setInterval(() => this.getActivityLog(), 10000);
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
      this.statsCards = [];
      doggy.get_dogs()
            .then(response => {
              this.dogs = response.data;
              this.statsCards.push({ type: "warning",
                          icon: "ti-server",
                          title: "Dogs",
                          value: this.dogs.length,
                          footerText: "Updated now",
                          footerIcon: "ti-reload"
                        });
              if(this.dogs.length > 0) {
                this.$store.commit(types.DOG, this.dogs[0]);
              } 
            })
            .catch(error => {
              this.response_errors = error;
            });
    },
    getActivityLog() {
      if(this.$store.state.dog.id > 0) {
          doggy.get_activity_log(this.$store.state.dog.id, 5)
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
