<template>
    <b-list-group id="role-group" v-if="show">
        <b-list-group-item v-for="role in roles" v-bind:key="role.id" id="role-group-item">
            {{ role.name }}   
        </b-list-group-item>
    </b-list-group>
</template>

<script>
export default {
    name: 'RolesComponent',
    data () {
        return {
            roles: [],
            show: false
        }
    },
    created () {
        this.$store.dispatch('getRoles').then(resp => {
            this.roles = resp.data,
            this.show = true
        })
    }
}
</script>

<style>
    #role-group-item {
        margin-bottom: 8px;
    }
</style>
