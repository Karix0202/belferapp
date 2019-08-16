<template>
    <b-row>
        <b-col md="8" sm="12" id="login-holder">
            <h1>Stwórz nowego użytkownika</h1>
            <AddUserComponent />
        </b-col>
    </b-row>
</template>

<script>
import AddUserComponent from '@/components/AddUserComponent.vue'

export default {
    name: 'AddUser',
    components: {
        AddUserComponent
    }
}
</script>