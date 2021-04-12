<template>
  <b-card class="flex-fill">
    <div class="d-flex">
      <Groups />
      <Messages />
    </div>
  </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Groups from '../components/Groups.vue';
import Messages from '../components/Messages.vue';

@Component({
  components: {
    Groups,
    Messages,
  },
})
export default class Chat extends Vue {}
</script>

<style lang="scss"></style>
