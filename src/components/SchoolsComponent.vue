<template>
    <b-list-group id="schools-group" v-if="show">
        <b-list-group-item v-for="school in schools" v-bind:key="school.id" id="schools-group-item">
            <p>{{ school.name }}</p>
            <b-list-group>
                <b-list-group-item v-for="group in school.groups" v-bind:key="group.id">
                    {{ group.name }}
                </b-list-group-item>
            </b-list-group>
        </b-list-group-item>
    </b-list-group>
</template>

<script>
export default {
    name: 'SchoolsComponent',
    data() {
        return {
            schools: [],
            show: false
        }
    },
    created() {
        this.$store.dispatch('getSchools').then(resp => {
            this.schools = resp.data,
            this.show = true
        })
    }
}
</script>

<style>
    #schools-group-item {
        margin-bottom: 8px;
    }
</style>