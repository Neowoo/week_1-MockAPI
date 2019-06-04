import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        queryUserId: "",
        preloader: false,
        loginAccount: "",
        loginPassword: "",
        maxDate: new Date(),
        interestOptions: ["玩電動", "打籃球", "看書", "潛水", "健身", "飛行傘", "繪圖", "游泳", "寫書法"],
        taiwanCities: ["臺北市", "基隆市", "新北市", "宜蘭縣", "新竹市", "新竹縣", "桃園縣", "苗栗縣", "臺中市", "彰化縣", "南投縣", "嘉義市", "嘉義縣", "雲林縣", "臺南市", "高雄市", "澎湖縣", "屏東縣", "臺東縣", "花蓮縣", "金門縣", "連江縣", "南海諸島"],
        userDataUpdate: {
            id: "",
            address: {
                city: "",
                address_detail: ""
            },
            lastName: "",
            firstName: "",
            tel: "",
            birthday: "",
            gender: "",
            interest: [],
            photo: "",
            lastName_valid: false,
            firstName_valid: false,
            tel_valid: false,
            photo_valid: false,
            address_valid: false,
            account: "",
            password: "",
            account_valid: false,
            password_valid: false
        },
        userDataAdd: {
            address: {
                city: "",
                address_detail: ""
            },
            lastName: "",
            firstName: "",
            tel: "",
            birthday: "",
            gender: "",
            interest: [],
            photo: "",
            account: "",
            password: "",
            lastName_valid: false,
            firstName_valid: false,
            tel_valid: false,
            photo_valid: false,
            address_valid: false,
        },
        managerData: {
            address: {
                city: "",
                address_detail: ""
            },
            lastName: "",
            firstName: "",
            tel: "",
            birthday: "",
            gender: "",
            interest: [],
            photo: "",
            account: "",
            password: ""
        }
    },
    mutations: {
        getManagerData(state, data) {
            state.managerData.account = data.account;
            state.managerData.address.city = data.city;
            state.managerData.address.address_detail = data.address;
            state.managerData.lastName = data.lastName;
            state.managerData.firstName = data.firstName;
            state.managerData.tel = data.tel;
            state.managerData.birthday = data.birthday;
            state.managerData.gender = data.gender;
            state.managerData.interest = data.interest;
            state.managerData.photo = data.photo;
            state.managerData.password = data.password;
        },
        clearLoginData(state) {
            state.loginAccount = "";
            state.loginPassword = "";
        },
        addUserRecord(state, userData) {
            state.loginAccount = userData.userId;
            state.loginPassword = userData.userPassword;
        },
        preloader_on(state) {
            state.preloader = true;
        },
        preloader_off(state) {
            state.preloader = false;
        }
    },
    actions: {
        login({state, commit, dispatch}, self) {
            commit("preloader_on");
            if (state.loginAccount !== "" && state.loginPassword !== "") {
                axios.get("?filter=" + state.loginPassword + "&search=" + state.loginAccount)
                    .then(res => {
                        console.log(res.data[0]);
                        if (res.data.length == 0) {
                            alert("帳號或密碼輸入錯誤");
                            dispatch("clearLoginData");
                            commit("preloader_off")
                            return;
                        }
                        localStorage.setItem("loginID", state.loginAccount);
                        localStorage.setItem("loginPassword", state.loginPassword);
                        localStorage.setItem("loginNow", true);
                        commit("getManagerData", res.data[0]);
                        commit("clearLoginData")
                        self.$router.push("/personalInfo");
                        commit("preloader_off")
                    })
            } else {
                alert("請輸入帳號、密碼")
                commit("preloader_off")
            }
        },
        personalInfo_reload({state, commit}) {
            let recordId = localStorage.getItem("loginID");
            let recordPassword = localStorage.getItem("loginPassword");
            commit("addUserRecord", {
                userId: recordId,
                userPassword: recordPassword
            })
            axios.get("?filter=" + state.loginPassword + "&search=" + state.loginAccount)
                .then(res => {
                    commit("getManagerData", res.data[0]);
                });
            console.log(recordId)
        },
        logOut({commit}, self) {
            // alert("hi")
            self.$router.push("/")
            localStorage.removeItem("loginID");
            localStorage.removeItem("loginPassword");
            localStorage.removeItem("loginNow");
        }
    }
})
