<template>
    <div class="container">
        <div class="row" style="padding-top: 25%">
            <div class="col s6">
                <h1 class="login__title" style="margin-top: 10%;">
                    管理員登入
                    <i class="material-icons login__title--icon">account_circle</i>
                </h1>
            </div>
            <div class="col s6">
                <div class="row">
                    <form class="col s12">
                        <div class="row">
                            <div class="input-field col s7 offset-s2">
                                <input id="managerAccount" type="text" class="validate" v-model="$store.state.loginAccount">
                                <label for="managerAccount">
                                    帳號
                                    <i class="material-icons login__form--icon">person</i>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s7 offset-s2">
                                <input id="managerPassword" type="password" class="validate" v-model="$store.state.loginPassword">
                                <label for="managerPassword">
                                    密碼
                                    <i class="material-icons login__form--icon">vpn_key</i>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s7 offset-s2" style="text-align: center">
                                <a class="waves-effect waves-light btn" @click="login">登入</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios"
    export default {
        name: "LoginForm",
        data() {
            return {
                hello: "hihi"
            }
        },
        methods: {
            login(){
                let self = this;
                this.$store.dispatch("login", self)
            },
            test(){
                console.log(this.$store.state.loginPassword);
                axios.get("?filter=gundamt2006&search=wuhongyi2015")
                    .then( res => {
                        console.log(res.data)
                    })
            }
        },
        created() {
            this.$store.commit("clearLoginData");
        }
    }
</script>
<style scoped>
    .login__title {
        text-align: center;
        padding-right: 3rem;
    }

    .material-icons.login__title--icon {
        font-size: 80%;
    }

    .material-icons.login__form--icon {
        position: relative;
        top: .2rem;
    }

    label {
        font-size: 1.5rem;
    }
</style>