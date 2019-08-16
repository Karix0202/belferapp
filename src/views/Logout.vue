<template>
    
</template>

<script>
const { dialog } = require('electron').remote

export default {
    name: 'Logout',
    created () {
        this.$store.dispatch('destroyToken')
        .then(resp => {
            this.$router.push({name: 'login'})
        }).catch(error => {
            dialog.showMessageBox(null, {
                type: 'warning',
                title: 'Uwaga!',
                message: 'Nie udało się wylogować. Spróbuj ponownie!',
            })
        })
    }
}
</script>