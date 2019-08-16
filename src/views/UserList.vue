<template>
    <div id="holder">
        <div v-for="school in schools" v-bind:key="school.id">
            <h2>{{ school.name }}:</h2>
            
            <GroupComponent :thisSchool='school'/>
        </div>

        <b-modal title="Szczegóły użytkownika" ref="user-modal" @hide="onHideUserModal">
            <div v-if="pickedUser != null">
                <p>Nazwa użytkownika: {{ pickedUser.username }}</p>
                <p>Hasło: {{ pickedUser.password }}</p>
                <p>Imię: {{ pickedUser.first_name }}</p>
                <p>Nazwisko: {{ pickedUser.surname }}</p>

                <b-button variant="danger" @click="deleteUser">Usuń mnie</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import GroupComponent from '@/components/GroupComponent.vue'

export default {
    name: 'UserList',
    components: {
        GroupComponent
    },
    methods: {
        showpUserModal(user) {
            this.pickedUser = user
            this.$refs['user-modal'].show()
        },
        onHideUserModal() {
            this.pickedUser = null
        },
        deleteUser() {
            this.$refs.GroupComponent.deleteUser(this.pickedUser);
        }
    },
    data() {
        return {
            'schools': [],
            pickedUser: null
        }
    },
    mounted() {
        this.$store.dispatch('getSchools')
        .then(resp => {
            resp.data.forEach(el => {
                this.$store.dispatch('getSchoolsWithGroups', {school: el.id})
                .then(resp => {
                    this.schools.push(resp.data)
                })
            })
        })
    }
}
</script>

<style>
  #holder > div > h2 {
    margin: 0 auto;
    margin-top: 16px;
    display: block;
  }
</style>