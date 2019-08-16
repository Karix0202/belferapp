<template>
    <b-row>
        <b-col md="8" sm="12" id="login-holder">
            <h1>Zaloguj się</h1>
            <LoginComponent />
        </b-col>
    </b-row>
</template>
<script>
import LoginComponent from '@/components/LoginComponent.vue'

export default {
    name: 'Login',
    components: {
        LoginComponent
    },
    created() {
        if (this.$store.getters.loggedIn) {
            this.$router.push({name: 'home'})
        }
    }
}
</script>

<style>
#login-holder {
    margin: 0 auto;
}

#login-holder > h1 {
    margin-top: 16px;
}
</style>
