<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="/home" v-if="loggedIn">BelferApp</b-navbar-brand>
            <b-navbar-brand href="/" v-if="!loggedIn">BelferApp</b-navbar-brand>


            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav v-if="loggedIn">
                <b-navbar-nav>
                    <b-nav-item href="/user/add">Dodaj użytkownika</b-nav-item>
                    <b-nav-item href="/users">Użytkownicy</b-nav-item>

                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">
                    <b-nav-item href="/" v-if="!loggedIn">Zaloguj się</b-nav-item>

                    <b-nav-item-dropdown right v-if="loggedIn">
                        <template slot="button-content">Użytkownik</template>

                        <b-dropdown-item href="/config">Konfiguracja</b-dropdown-item>
                        <b-dropdown-item href="/logout">Wyloguj się</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: 'NavComponent',
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn
        }
    }
}
</script>