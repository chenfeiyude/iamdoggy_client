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
    </div>

  </div>
</template>
<script>
import { StatsCard, ChartCard } from "@/components/index";
import Chartist from 'chartist';
import events from '../js/events'
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
      statsCards: [
        {
          type: "warning",
          icon: "ti-server",
          title: "Capacity",
          value: "105GB",
          footerText: "Updated now",
          footerIcon: "ti-reload"
        }
      ],
      dogs: [],
      response_errors:[]
    };
  },
  methods: {
    getRandomDog() {
      this.$validator.validateAll().then((result) => {
          if (result) {
             events.find_random_dog()
              .then(response => {
                this.$store.commit(types.DOG, response.data);
              })
              .catch(error => {
                this.response_errors = error;
              });
          }
      });
    }
  }
};
</script>
<style>
</style>
