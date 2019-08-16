<template>
<div>
    <b-row>
      <b-col md="8" sm="12" id="holder">
        <h2>Konfiguracja</h2>
        <p>Atulna lokalizacja: {{ path }}</p>
        <b-btn variang="primiary" @click="selectDirectory">Wybierz lokalizacje</b-btn>
      </b-col>
    </b-row>
  </div>
</template>

<script>
const { dialog } = require('electron').remote

export default {
    name: 'Config',
    data() {
        return {
            path: !this.$store.getters.userFile ? 'Brak' : this.$store.state.userFile   
        }
    },
    methods: {
        selectDirectory() {
            dialog.showOpenDialog({
                properties: ['openDirectory']
            }, callback => {
                if (callback !== undefined) {
                    this.$store.dispatch('setUserFilePath', {
                        path: callback[0]
                    })
                    this.path = callback[0]
                }
            })
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