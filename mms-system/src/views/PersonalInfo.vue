<template>
    <div class="container personalInfo">
        <div class="row">
            <div class="col s3 personalInfo--photo">
                <img :src="$store.state.managerData.photo">
            </div>
            <div class="col s9">
                <div class="row personalInfo--header">
                    <p
                            class="personalInfo__header--name col s3"
                    >{{$store.state.managerData.lastName + $store.state.managerData.firstName}}
                    </p>
                    <div class="row col s4 personalInfo__header--editMember">
                        <router-link :to="{name: 'userData'}">
                            <a class="waves-effect red lighten-2 btn">會員編輯<i class="material-icons right">group</i></a>
                        </router-link>
                    </div>
                    <div class="col s2 push-s3 personalInfo__logout">
                        <router-link :to="{name: 'login'}" >
                            <a class="btn-floating btn-large waves-effect red lighten-2 btn" @click="logOut"><i
                                    class="material-icons">exit_to_app</i></a>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="row personalInfo__sideArea">
            <div class="col s3">
                <ul>
                    <li class="row">
                        <img src="@/assets/gender-symbols.svg" class="col s2 offset-s2">
                        <div class="col s3 personalInfo__sideArea--content">{{$store.state.managerData.gender}}</div>
                    </li>
                    <li class="row">
                        <img src="@/assets/cake.svg" class="col s2 offset-s2">
                        <div class="col s5 personalInfo__sideArea--content">{{$store.state.managerData.birthday}}</div>
                    </li>
                    <li class="row">
                        <img src="@/assets/cellphone.svg" class="col s2 offset-s2">
                        <div class="col s6 personalInfo__sideArea--content">{{$store.state.managerData.tel}}</div>
                    </li>
                    <li class="row">
                        <img src="@/assets/address.svg" class="col s2 offset-s2">
                        <div class="col s6 personalInfo__sideArea--content">{{$store.state.managerData.address.city +
                            $store.state.managerData.address.address_detail}}
                        </div>
                    </li>
                </ul>
            </div>
            <div class="col s9">
                <h4>個人興趣</h4>
                <div class="row">
                    <div class="card col s3 interest-card"
                         v-for="(interest, index) in $store.state.managerData.interest" :key="index">
                        <div class="card-image waves-effect waves-block waves-light interest__card--img">
                            <img class="activator" src="@/assets/address.svg">
                        </div>
                        <div class="card-content text-center">
                            <span ref="interestItem" class="activator grey-text text-darken-4">{{interest}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {

            }
        },
        methods: {
          logOut(){
            this.$store.dispatch("logOut")
          }
        },
        created() {
            this.$store.dispatch("personalInfo_reload");
            // console.log(interestItem)
        }
    };
</script>
<style scoped>
    .container.personalInfo {
        padding-top: 1%;
    }

    .personalInfo--photo img {
        width: 100%;
        height: 100%;
    }

    .personalInfo--photo {
        max-height: 200px;
        clip-path: circle(25% at 50% 50%);
    }
    p.personalInfo__header--name {
        font-size: 2vw;
        margin: 0;
    }

    .personalInfo--header {
        padding-top: 7%;
    }

    .personalInfo__header--editMember {
        margin-top: .85%;
    }

    .personalInfo__header--editMember a {
        margin-top: 1.2%;
    }

    .personalInfo__logout a {
        color: black;
    }

    .personalInfo__logout span {
        font-size: 1.3vw;
        position: relative;
        top: .5rem;
    }

    .material-icons.personalInfo__logout--icon {
        position: relative;
        top: 1.1rem;
        font-size: 2vw;
        margin-left: 1rem;
        color: #616161;
    }

    .personalInfo__sideArea--content {
        text-align: left;
        font-size: 1vw;
        padding-top: 1%;
    }

    .interest-card {
        margin: 2%;
    }
    .interest__card--img {
        padding: 8% 1% 0% 1%
    }
</style>