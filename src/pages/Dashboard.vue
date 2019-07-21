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
            <p>Credit</p>
            {{account.credit}}
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
            <i class="ti-face-smile"></i> Got {{dogs.length}} dogs
          </div>
        </stats-card>
      </div>
    </div>

    <!--Dogs-->
    <div class="row">
      <div class="col-md-12 col-xl-6">
        <card title="Primary Dog" subTitle="All activities are related to this dog">
          <div slot="raw-content" class="table-responsive">
            <table class="table table-striped">
              <tr><th>Breed</th><td>{{primary_dog.breed}}</td></tr>
              <tr><th>Level</th><td>{{primary_dog.level}}</td></tr>
              <tr><th>Speed</th><td>{{primary_dog.speed}}</td></tr>
              <tr><th>Attack</th><td>{{primary_dog.attack}}</td></tr>
              <tr><th>Defence</th><td>{{primary_dog.defence}}</td></tr>
            </table>
          </div>
        </card>
      </div>
      <div class="col-md-12 col-xl-6" >
        <card class="card" title="Activities">
          <div v-if="activity_log != ''">
            <textarea rows="10" class="form-control rounded-0" readonly>{{ activity_log }}</textarea>
          </div>
          <div v-else>
            <div class="icon-big text-center icon-info">
              <i class="ti-reload"></i> Loading
            </div>
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
import management from '../js/management'
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
      account: {credit: 0},
      dogs: [],
      activity_log: '',
      primary_dog: {
        id: 0,
        uid: null,
        age: 0,
        state: null,
        healthy: null,
        born: null,
        cost: 0,
        breed: null,
        level: 0,
        speed: 0,
        attack: 0,
        defence: 0
      },
      response_errors:[]
    };
  },
  created(){
    this.getAccount();
    this.getPrimaryDog();
    this.getDogs();
    this.interval = setInterval(() => this.generateActivity(), 1000);
  },
  destroyed() {
    // remove the interval when the user left this component
    this.interval && window.clearInterval(this.interval);
  },
  methods: {
    getRandomDog() {
      this.$validator.validateAll().then((result) => {
          if (result) {
             events.find_random_dog()
              .then(response => {
                this.getAccount();
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
            })
            .catch(error => {
              this.response_errors = error;
            });
    },
    getPrimaryDog() {
      doggy.get_primary_dog()
            .then(response => {
              this.primary_dog = response.data;
              this.$store.commit(types.PRIMARY_DOG, this.primary_dog);
            })
            .catch(error => {
              this.response_errors = error;
            });
    },
    generateActivity() {
      if(this.primary_dog.id > 0) {
          doggy.generate_activity(this.primary_dog.id)
            .then(response => {
              this.activity_log = response.data.log;
            })
            .catch(error => {
              this.response_errors = error;
            });
      }
    },
    getAccount() {
      management.get_account()
            .then(response => {
              this.account = response.data;
            })
            .catch(error => {
              this.response_errors = error;
            });
    },
  }
};
</script>
<style>
</style>
