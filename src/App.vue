<template>
  <div>
    <NavComponent />
    <b-container id="app-container">
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import NavComponent from '@/components/NavComponent.vue'

export default {
  components: {
    NavComponent
  }
}
</script>

<style>
  #app-container {
    margin-bottom: 8px;
  }
</style>
