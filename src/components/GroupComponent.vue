<template>
    <div>
        <b-card-group columns id="holder">
        <b-card v-for="group in groups" v-bind:key="group.id" class="mt-4">
            <b-card-title>{{ group.name }}</b-card-title>
                <b-card-text>
                    <div v-if="group.tutors.length > 0">
                        <p>Wychowawcy:</p>
                        <b-list-group>
                            <b-list-group-item v-for="tutor in group.tutors" v-bind:key="tutor.id" @click="onClickUser(tutor)">
                                    {{ tutor.username }}
                            </b-list-group-item>
                        </b-list-group>
                    </div>
                    <br>
                    <div v-if="group.students.length > 0">
                        <p>Uczniowie:</p>
                        <b-list-group>
                            <b-list-group-item v-for="student in group.students" v-bind:key="student.id" @click="onClickUser(student)">
                                    {{ student.username }}
                            </b-list-group-item>
                        </b-list-group>
                    </div>
                </b-card-text>
            </b-card>
        </b-card-group>
    </div>
</template>

<script>
const fs = require('fs')

export default {
    name: 'GroupComponent',
    props: ['thisSchool'],
    data() {
        return {
            propsGroups: this.thisSchool.groups,
            userModal: {
                user: null,
                show: false,
            },
            groups: [],
        }
    },
    methods: {
        onClickUser(user) {
            this.$parent.showpUserModal(user)
        },
    },
    created() {
        this.propsGroups.forEach(propGroup => {
            const group = {
                id: propGroup.id,
                name: propGroup.name,
                tutors: [],
                students: [],
            }

            this.$store.dispatch('getTutors', {group: propGroup.id})
            .then(data => {
                group.tutors = data
            })

            this.$store.dispatch('getStudents', {group: propGroup.id})
            .then(data => {
                group.students = data
            })

            this.groups.push(group)
        })
    }
}
</script>

<style>
  #holder {
    margin: 0 auto;
    margin-top: 16px;
  }
</style>