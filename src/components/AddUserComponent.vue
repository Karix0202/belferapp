<template>
    <div>
        <b-form @submit="onSubmit">
            <b-form-group id="input-group-1" label="Nazwa użytkownika" label-for="username">
                <b-form-input id="username" v-model="form.username" type="text" required placeholder="Nazwa użytkownika"/>
            </b-form-group>

            <b-form-group id="input-group-2" label="Pierwsze imie" label-for="firstname">
                <b-form-input id="firstname" v-model="form.first_name" type="text" placeholder="Pierwsze imie"/>
            </b-form-group>

            <b-form-group id="input-group-3" label="Nazwisko" label-for="surname">
                <b-form-input id="surname" v-model="form.surname" type="text" placeholder="Nazwisko"/>
            </b-form-group>

            <b-form-group id="input-group-4" label="Hasło" label-for="password">
                <b-form-input id="password" v-model="form.password" type="text" placeholder="Hasło" required/>
            </b-form-group>

            <b-form-group id="input-group-5" label="Rola" label-for="role" >
                <b-form-select id="role" v-model="form.role" :options="roles" required @change="roleOnChange()"></b-form-select>
            </b-form-group>

            <b-form-group id="input-group-6" label="Szkoła" label-for="school">
                <b-form-select id="school" v-model="form.school" :options="schools" required @change="onChange()"></b-form-select>
            </b-form-group>

            <b-form-group id="input-group-7" label="Klasa" label-for="group" v-if="form.role != 4 ? true : false">
                <b-form-select id="group" v-model="form.group" :options="groups" :required="form.role != 4 ? true : false"></b-form-select>
            </b-form-group>

            <b-alert :show="dismissSuccessCountDown" @dismissed="dismissSuccessCountDown=0" @dismiss-count-down="countDownChangedSuccess" variant="success" v-if="userAdded">
                Udało się dodać użytkownika
            </b-alert>

            <b-alert :show="dismissErrorCountDown" @dismissed="dismissErrorCountDown=0" @dismiss-count-down="countDownChangedError" variant="danger" v-if="userNotAdded">
                Nie udało się dodać użytkownika
            </b-alert>

            <b-button type="submit" variant="success">Stwórz</b-button>
            <b-button type="button" variant="primary" @click="fillMainInputs" style="margin: 4px;">Uzupełnij puste</b-button>
        </b-form>
    </div>
</template>

<script>
const { dialog } = require('electron').remote

export default {
    name: 'AddUserComponent',
    data () {
        return {
            form: {
                username: null,
                first_name: null,
                surname: null,
                password: null,
                role: null,
                school: null,
                group: null,
            },
            roles: [{text: 'Zaznacz rolę', value: null}],
            schools: [{text: 'Zaznacz szkołę', value: null}],
            groups: [{text: 'Zaznacz klasę', value: null}],
            userAdded: false,
            userNotAdded: false,
            dismissSuccessSecs: 5,
            dismissSuccessCountDown: 0,
            dismissErrorSecs: 5,
            dismissErrorCountDown: 0,
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault()

            this.$store.dispatch('createNewUser', this.form)
            .then(resp => {
                this.$store.dispatch('addUserToFile', this.form)
                .then(data => {
                    this.showSuccessAlert()
                    this.form.username = null,
                    this.form.first_name = null
                    this.form.surname = null
                    this.form.password = null
                    this.form.role = null
                    this.form.school = null
                    this.form.group = null
                    this.userNotAdded = false
                    this.userAdded = true
                })
                .catch(error => {
                    console.log(error)
                    this.userAdded = false
                    this.userNotAdded = true
                })
            })
            .catch(error => {
                console.log(error.response)
                this.userAdded = false
                this.userNotAdded = true
            })
        },
        onChange(e) {
            this.group = []
            this.groups = [{text: 'Zaznacz klasę', value: null}]
            this.form.group = null;
            this.$store.dispatch('getGroupsBySchool', {id: this.form.school}).then(resp => {
            resp.data.forEach(el => {
                this.groups.push({
                    text: el.name,
                    value: el.id
                })
            })
        })
        },
        randomString(length) {
            let result           = '';
            let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        },
        fillMainInputs() {
            if(this.form.school == null || this.form.role == null) {
                dialog.showMessageBox(null, {
                    type: 'warning',
                    title: 'Uwaga!',
                    message: 'Jeden z selektów nie jest zaznaczony',
                })
                return
            }

            this.form.password = this.randomString(12)

            let schoolName;
            this.$store.dispatch('getSingleSchool', {id: this.form.school})
            .then(resp => {
                schoolName = resp.data.name
                
                schoolName += '-' + this.randomString(4) 
                this.form.username = schoolName                
            })

        },
        roleOnChange(e) {
            if (this.form.role == 4) this.form.group = null
        },
        countDownChangedSuccess(dismissCountDown) {
            this.dismissSuccessSecs = dismissCountDown
        },
        showSuccessAlert() {
            this.dismissSuccessCountDown = this.dismissSuccessSecs
        },
        countDownChangedError(dismissCountDown) {
            this.dismissErrorSecs = dismissCountDown
        },
        showErrorAlert() {
            this.dismissErrorCountDown = this.dismissErrorSecs
        },
    },
    created() {
        this.$store.dispatch('getRoles').then(resp => {
            resp.data.forEach(el => {
                this.roles.push({
                    text: el.name,
                    value: el.id
                })
            })
        })
        this.$store.dispatch('getSchools').then(resp => {
            resp.data.forEach(el => {
                this.schools.push({
                    text: el.name,
                    value: el.id
                })
            })
        })
    }
}
</script>