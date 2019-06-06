<template>
  <div class="wrapper lobby-wrapper">
    <lobby-content @click.native="toggleSidebar">

    </lobby-content>

    <content-footer></content-footer>
  </div>
</template>
<style lang="scss">

.lobby-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column; 
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}

</style>
<script>
import ContentFooter from "./ContentFooter.vue";
import LobbyContent from "./Content.vue";
export default {
  components: {
    ContentFooter,
    LobbyContent
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
