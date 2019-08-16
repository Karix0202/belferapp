<template>
    <div>
        <b-form @submit='onSubmit'>
            <b-form-group id='group-1' label='Nazwa użytkownika' label-for='text-username'>
                <b-input id='text-username' placeholder='Nazwa użytkownika' v-model='form.username' required type='text'></b-input>
            </b-form-group>

            <b-form-group id='group-2' label='Hasło' label-for='text-password'>
                <b-input id='text-password' placeholder='Hasło' v-model='form.password' required type='password'></b-input>
            </b-form-group>

            <b-alert show variant="danger" v-if="error.show">{{ error.message }}</b-alert>

            <b-button type="submit" variant="primary">Zaloguj się</b-button>
        </b-form>
    </div>
</template>
<script>

export default {
    name: 'LoginComponent',
    data() {
        return {
            error: {
                show: false,
                message: ''
            },
            form: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();

            this.$store.dispatch('retrieveToken', {
                username: this.form.username,
                password: this.form.password
            }).then(resp => {
                this.$store.dispatch('getRoles')
                .then(this.$router.push({name: 'home'}))
            }).catch(error => {
                console.log(error);
                this.form.password = '';
                this.error.show = true;
                if (error.response.status == 401) {
                    this.error.message = 'Nazwa użytkownika lub hasło jest błędne! Spróbuj ponownie.';
                } else {
                    this.error.message = 'Coś poszło nie tak! Spróbuj ponownie teraz lub później';
                }
            });
        }
    }
}
</script>