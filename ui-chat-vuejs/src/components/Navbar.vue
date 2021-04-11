<template>
  <div>
    <h1>Navbar component!</h1>
    <b-link to="/login">Go to Login!!!</b-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Navbar extends Vue {}
</script>

<style lang="scss"></style>
