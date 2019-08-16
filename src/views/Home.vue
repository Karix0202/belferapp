<template>
  <div>
    <b-row>
      <b-col md="8" sm="12" id="holder">
        <UserFileNotCreatedComponent v-if="!isPath"/>
        <h2>Dostępne role:</h2>
        <RolesComponent />
        <h2>Dostępne szkoły i klasy:</h2>
        <SchoolsComponent />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import RolesComponent from '@/components/RolesComponent.vue'
import SchoolsComponent from '@/components/SchoolsComponent.vue'
import NavComponent from '@/components/NavComponent.vue'
import UserFileNotCreatedComponent from '@/components/UserFileNotCreatedComponent.vue'

export default {
  name: 'Home',
  components: {
    RolesComponent,
    SchoolsComponent,
    UserFileNotCreatedComponent
  },
  data() {
    return {
      isPath: this.$store.getters.userFile
    }
  }
}
</script>
<style>
  #holder {
    margin: 0 auto;
    margin-top: 16px;
  }
</style>
