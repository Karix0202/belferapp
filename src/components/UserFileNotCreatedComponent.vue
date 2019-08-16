<template>
    <div class="user-warning">
        <h2>Uwaga! Nie skonfigurowałeś pliku z użytkownikami!</h2>
        <b-button variant="danger" @click="openConfig">Skonfiguruj</b-button>
    </div>
</template>

<script>
const { remote, ipcRenderer } = require('electron')

export default {
    name: 'UserFileNotCreatedComponent',
    methods: {
        openConfig() {
            this.$router.push({name: 'config'})
        }
    }
}
</script>

<style>
    .user-warning {
        color: red;
    }
</style>
