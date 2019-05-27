<template>
    <div>
        <h3 class="title-area">
            會員資料系統
        </h3>
        <div class="mainArea__form  d-flex-center">
            <!-- 新增表單 -->
            <div class="row p-absolute mainArea__form" v-if="addFormToggle">
                <div class="add-userform-background" @click="buttonCancel"></div>
                <div class="add-userform-content">
                    <a class="btn-floating btn-large waves-effect helfway-fab red lighten-2 mainArea__form-close"
                       @click="buttonCancel"><i class="material-icons">close</i></a>
                    <form class="col mainArea__form grey lighten-5 z-depth-2">
                        <h5 class="mainArea__form-title">新增會員資料</h5>
                        <div class="row">
                            <div class="input-field col s6">
                                <input type="text" id="add_last_name" v-model="userDataAdd.lastName" class="validate"
                                       pattern="[\u4e00-\u9fa5]{0,5}" @change="addUser_checkValid_lastName">
                                <label for="add_last_name">姓</label>
                                <p v-show="!userDataAdd.lastName_valid" class="validRecommend">請輸入0~5字中文</p>
                            </div>
                            <div class="input-field col s6">
                                <input id="add_first_name" type="text" class="validate" v-model="userDataAdd.firstName"
                                       pattern="[\u4e00-\u9fa5]{0,5}"
                                       @change="addUser_checkValid_firstName">
                                <label for="add_first_name">名</label>
                                <p v-show="!userDataAdd.firstName_valid" class="validRecommend">請輸入0~5字中文</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="add_tel" type="text" class="validate" v-model="userDataAdd.tel"
                                       @change="addUser_checkValid_tel" pattern="^09[0-9]{8}$">
                                <label for="add_tel">電話</label>
                                <p v-show="!userDataAdd.tel_valid" class="validRecommend tel-valid-recommend">
                                    請輸入台灣手機格式(09+8碼)</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <p>生日</p>
                                <v-date-picker mode="single" v-model="userDataAdd.birthday" :max-date="maxDate"
                                               is-required/>
                            </div>
                            <div class="input-field col s12">
                                <p>性別</p>
                                <p>
                                    <label>
                                        <input name="group1" type="radio" checked v-model="userDataAdd.gender"
                                               value="男"/>
                                        <span>男</span>
                                    </label>
                                    <label>
                                        <input name="group1" type="radio" v-model="userDataAdd.gender" value="女"/>
                                        <span>女</span>
                                    </label>
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <p>興趣</p>
                                <p class="user-interest">
                                    <label v-for="(options, index) in interestOptions" :key="index">
                                        <input type="checkbox" :value="options" v-model="userDataAdd.interest"/>
                                        <span>{{options}}</span>
                                    </label>
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s4">
                                <select class="browser-default " v-model="userDataAdd.address.city"
                                        @change="addUser_checkValid_address">
                                    <option value="" disabled selected>選擇縣/市</option>
                                    <option v-for="(cities, index) in taiwanCities" :key="index">
                                        {{cities}}
                                    </option>
                                </select>
                            </div>
                            <div class="input-field col s8">
                                <input type="text" class="validate" v-model="userDataAdd.address.address_detail"
                                       @change="addUser_checkValid_address">
                                <label for="email">地址</label>
                                <p v-show="!userDataAdd.address_valid" class="validRecommend">地址請勿空白</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="file-field input-field col s12">
                                <div class="btn">
                                    <span>照片</span>
                                    <input type="file" @change="uploadPhoto_AddUser">
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s6 offset-s6">
                                <button class="btn grey lighten-2" @click="clearRemainData">取消</button>
                                <button class="btn teal lighten-3 ml-1" @click.prevent="addUserConfirm">確定</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <!--            編輯表單-->
            <div class="row p-absolute mainArea__form" v-if="editFormToggle">
                <div class="edit-userform-background" @click.sef="buttonCancel"></div>
                <div class="edit-userform-content">
                    <a class="btn-floating btn-large waves-effect helfway-fab red lighten-2 mainArea__form-close"
                       @click="buttonCancel"><i class="material-icons">close</i></a>
                    <form class="col mainArea__form grey lighten-5 z-depth-2">
                        <h5 class="mainArea__form-title">編輯會員資料</h5>
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="last_name" type="text" class="validate" v-model="userDataUpdate.lastName"
                                       @change="editUser_checkValid_lastName" pattern="[\u4e00-\u9fa5]{0,5}">
                                <label for="last_name" :class="{active: userDataUpdate.lastName_valid}">姓</label>
                                <p v-show="!userDataUpdate.lastName_valid" class="validRecommend">請輸入0~5字中文</p>
                            </div>
                            <div class="input-field col s6">
                                <input id="first_name" type="text" class="validate" v-model="userDataUpdate.firstName"
                                       @change="editUser_checkValid_firstName" pattern="[\u4e00-\u9fa5]{0,5}">
                                <label for="first_name" :class="{active: userDataUpdate.firstName_valid}">名</label>
                                <p v-show="!userDataUpdate.firstName_valid" class="validRecommend">請輸入0~5字中文</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="tel" type="text" class="validate" v-model="userDataUpdate.tel"
                                       @change="editUser_checkValid_tel"
                                       pattern="^09[0-9]{8}$">
                                <label for="tel" :class="{active: userDataUpdate.tel_valid}">電話</label>
                                <p v-show="!userDataUpdate.tel_valid" class="validRecommend tel-valid-recommend">
                                    請輸入台灣手機格式(09+8碼)</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <p>生日</p>
                                <v-date-picker mode="single" v-model="userDataUpdate.birthday" :max-date="maxDate"
                                               is-required/>
                            </div>
                            <div class="input-field col s12">
                                <p>性別</p>
                                <p>
                                    <label>
                                        <input name="group1" type="radio" checked v-model="userDataUpdate.gender"
                                               value="男"/>
                                        <span>男</span>
                                    </label>
                                    <label>
                                        <input name="group1" type="radio" v-model="userDataUpdate.gender" value="女"/>
                                        <span>女</span>
                                    </label>
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <p>興趣</p>
                                <p class="user-interest">
                                    <label v-for="(options, index) in interestOptions" :key="index">
                                        <input type="checkbox" :value="options" v-model="userDataUpdate.interest"/>
                                        <span>{{options}}</span>
                                    </label>
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s4">
                                <select class="browser-default " v-model="userDataUpdate.address.city">
                                    <option value="" disabled selected>選擇縣/市</option>
                                    <option v-for="(cities, index) in taiwanCities" :key="index">
                                        {{cities}}
                                    </option>
                                </select>
                            </div>
                            <div class="input-field col s8">
                                <input type="text" class="validate"
                                       v-model="userDataUpdate.address.address_detail"
                                       @change="editUser_checkValid_address">
                                <label :class="{active: userDataUpdate.address_valid}">地址</label>
                                <p v-show="!userDataUpdate.address_valid" class="validRecommend">地址請勿空白</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="file-field input-field col s12">
                                <div class="btn">
                                    <span>File</span>
                                    <input type="file" @change="uploadPhoto_updateUser">
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text" v-model="userDataUpdate.photo">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s6 offset-s6">
                                <button class="btn grey lighten-2" @click="buttonCancel">取消</button>
                                <input type="submit" class="btn teal lighten-3 ml-1" @click.prevent="editConfirm">
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
        <table class="striped centered">
            <thead>
            <tr>
                <th>會員編號</th>
                <th>姓名</th>
                <th>電話</th>
                <th>生日</th>
                <th>性別</th>
                <th>興趣</th>
                <th>地址</th>
                <th>照片</th>
                <th>編輯</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="(users, index) in userData" :key="index">
                <td>{{users.id}}</td>
                <td>{{users.lastName + users.firstName}}</td>
                <td>{{users.tel}}</td>
                <td>{{users.birthday}}</td>
                <td>{{users.gender}}</td>
                <td>
                    <ul>
                        <li v-for="(items, index) in users.interest">{{items}}</li>
                    </ul>
                </td>
                <td>{{users.city + users.address}}</td>
                <td>
                    <img :src="users.photo" alt="photo" width="120" height="120">
                </td>
                <td>
                    <i class="material-icons col m3 editItem" @click="editUser(index)">create</i>
                    <i class="material-icons col m3 editItem" @click="deleteUser(index)">clear</i>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="addUserBtn">
            <a class="red lighten-2 btn-small" @click="addFormToggle = true"><i class="material-icons left">add</i>新增會員</a>
        </div>
        <ul class="d-flex-center pageList">
            <li class="pageList__first-last-items" @click="firstPage">第一頁</li>
            <li><i class="material-icons last-next-page" @click="lastPage">chevron_left</i></li>
            <li class="pageList__item pageList__item-choose" v-for="(pages, index) in pageNumbers" :key="index"
                @click="choosePage(index)">
                {{pages}}
            </li>
            <li><i class="material-icons last-next-page" @click="nextPage">chevron_right</i></li>
            <li class="pageList__first-last-items" @click="theLastPage">第末頁</li>
        </ul>
    </div>
</template>

<script>
    import axios from "axios"

    export default {
        name: 'UserDataOverview',
        data() {
            return {
                maxDate: new Date(),
                interestOptions: ["玩電動", "打籃球", "看書", "潛水", "健身", "飛行傘", "繪圖", "游泳", "寫書法"],
                taiwanCities: ["臺北市", "基隆市", "新北市", "宜蘭縣", "新竹市", "新竹縣", "桃園縣", "苗栗縣", "臺中市", "彰化縣", "南投縣", "嘉義市", "嘉義縣", "雲林縣", "臺南市", "高雄市", "澎湖縣", "屏東縣", "臺東縣", "花蓮縣", "金門縣", "連江縣", "南海諸島"],
                pageNumbers: [],
                userDataUpdate: {
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
                    lastName_valid: false,
                    firstName_valid: false,
                    tel_valid: false,
                    photo_valid: false,
                    address_valid: false

                },
                queryUserId: '',
                editFormToggle: false,
                addFormToggle: false,
                userData: [],
                currentPage: 1
            }
        },
        methods: {
            userListReload() {
                let jsonData = [];
                axios.get("?page=" + this.currentPage +
                    "&limit=6")
                    .then(res => {
                        for (let i = 0; i < res.data.length; i++) {
                            jsonData.push(res.data[i]);
                        }
                        console.log(jsonData)
                    });
                this.userData = jsonData;
                this.userDataAdd.firstName_valid = false;
                this.userDataAdd.lastName_valid = false;
                this.userDataAdd.tel_valid = false
            },
            deleteUser(index) {
                this.queryUserId = this.userData[index].id;
                console.log(this.userData[index].id)
                axios.delete("/" + this.queryUserId)
                    .then(res => {
                        console.log(res);
                        this.userListReload();
                        this.checkPageNumbers();
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            editUser(index) {
                this.read_selected_userData(index);
                this.editUser_checkValid_lastName();
                this.editUser_checkValid_firstName();
                this.editUser_checkValid_tel();
                this.editUser_checkValid_address();
                this.editFormToggle = true;
                console.log(index)
            },
            read_selected_userData(index) {
                let userData = this.userData[index];
                this.queryUserId = userData.id;
                this.userDataUpdate.firstName = userData.firstName;
                this.userDataUpdate.lastName = userData.lastName;
                this.userDataUpdate.tel = userData.tel;
                this.userDataUpdate.birthday = new Date(userData.birthday);
                this.userDataUpdate.gender = userData.gender;
                this.userDataUpdate.photo = userData.photo;
                this.userDataUpdate.interest = userData.interest;
                this.userDataUpdate.address.city = userData.city;
                this.userDataUpdate.address.address_detail = userData.address;
            },
            buttonCancel() {
                this.editFormToggle = false;
                this.addFormToggle = false;
                this.clearRemainData();
            },
            uploadPhoto_AddUser(e) {
                let file = e.target.files[0];
                let reader = new FileReader();
                console.log(file.size);
                reader.onloadend = (e) => {
                    this.userDataAdd.photo = reader.result;
                };
                reader.readAsDataURL(file);
            },
            uploadPhoto_updateUser(e) {
                let file = e.target.files[0];
                let reader = new FileReader();
                console.log(file.size);
                reader.onloadend = (e) => {
                    this.userDataUpdate.photo = reader.result;
                };
                reader.readAsDataURL(file);
            },
            editConfirm() {
                if (this.userDataUpdate.lastName_valid && this.userDataUpdate.firstName_valid && this.userDataUpdate.tel_valid && this.userDataUpdate.address_valid) {
                    axios.put("/" + this.queryUserId, {
                        firstName: this.userDataUpdate.firstName,
                        lastName: this.userDataUpdate.lastName,
                        tel: this.userDataUpdate.tel,
                        birthday: this.editUser_birthdayFormat,
                        gender: this.userDataUpdate.gender,
                        interest: this.userDataUpdate.interest,
                        city: this.userDataUpdate.address.city,
                        address: this.userDataUpdate.address.address_detail,
                        photo: this.userDataUpdate.photo
                    })
                        .then(res => {
                            console.log(res);
                            this.userListReload();
                            this.clearRemainData();
                            this.editFormToggle = false;
                        })
                        .catch(err => {
                            let errMassage;
                            switch (err.response.status) {
                                case 413 :
                                    errMassage = "上傳圖片過大!"
                            }
                            alert(errMassage);
                        })
                } else {
                    alert("請確認填妥表單")
                }
            },
            editUser_checkValid_lastName() {
                let lastName = this.userDataUpdate.lastName;
                let lastNameRegexp = "[\u4e00-\u9fa5]{0,5}";
                let checkResult = lastName.match(lastNameRegexp);
                console.log(checkResult);
                if (checkResult[0] !== '' && checkResult.input.length <= 5) {
                    this.userDataUpdate.lastName_valid = true;
                } else {
                    this.userDataUpdate.lastName_valid = false;
                }
            },
            editUser_checkValid_firstName() {
                let firstName = this.userDataUpdate.firstName;
                let firstNameRegexp = "[\u4e00-\u9fa5]{0,5}";
                let checkResult = firstName.match(firstNameRegexp);
                if (checkResult[0] !== '' && checkResult.input.length <= 5) {
                    this.userDataUpdate.firstName_valid = true;
                } else {
                    this.userDataUpdate.firstName_valid = false;
                }
            },
            editUser_checkValid_tel() {
                let tel = this.userDataUpdate.tel;
                let telRegexp = "^09[0-9]{8}$";
                let checkResult = tel.match(telRegexp);
                console.log(checkResult[0]);
                if (checkResult[0] !== '' && checkResult.input.length <= 10) {
                    this.userDataUpdate.tel_valid = true;
                } else {
                    this.userDataUpdate.tel_valid = false;
                }
            },
            editUser_checkValid_address() {
                let address = this.userDataUpdate.address.address_detail;
                let city = this.userDataUpdate.address.city;
                if (address !== "" && city !== "") {
                    this.userDataUpdate.address_valid = true;
                } else {
                    this.userDataUpdate.address_valid = false;
                }
            },
            addUserConfirm() {
                if (this.userDataAdd.lastName_valid && this.userDataAdd.firstName_valid && this.userDataAdd.tel_valid && this.userDataAdd.address_valid) {
                    axios.post("", {
                        firstName: this.userDataAdd.firstName,
                        lastName: this.userDataAdd.lastName,
                        tel: this.userDataAdd.tel,
                        birthday: this.addUser_birthdayFormat,
                        gender: this.userDataAdd.gender,
                        interest: this.userDataAdd.interest,
                        city: this.userDataAdd.address.city,
                        address: this.userDataAdd.address.address_detail,
                        photo: this.userDataAdd.photo
                    })
                        .then(res => {
                            console.log(res);
                            this.checkPageNumbers();
                            this.userListReload();
                            this.clearRemainData();
                            this.addFormToggle = false;
                        })
                        .catch(err => {
                            console.log(err.response.status);
                            let errMassage;
                            switch (err.response.status) {
                                case 413 :
                                    errMassage = "請上傳50kb以下圖片!"
                            }
                            alert(errMassage);
                        })
                } else {
                    alert("請確認填妥表格")
                }
            },
            buttonCancel() {
                this.editFormToggle = false;
                this.addFormToggle = false;
                this.clearRemainData();
            },
            addUser_checkValid_lastName() {
                let lastName = this.userDataAdd.lastName;
                let lastNameRegexp = "[\u4e00-\u9fa5]{0,5}";
                let checkResult = lastName.match(lastNameRegexp);
                console.log(checkResult);
                if (checkResult[0] !== '' && checkResult.input.length <= 5) {
                    this.userDataAdd.lastName_valid = true;
                } else {
                    this.userDataAdd.lastName_valid = false;
                }
            },
            addUser_checkValid_firstName() {
                let firstName = this.userDataAdd.firstName;
                let firstNameRegexp = "[\u4e00-\u9fa5]{0,5}";
                let checkResult = firstName.match(firstNameRegexp);
                if (checkResult[0] !== '' && checkResult.input.length <= 5) {
                    this.userDataAdd.firstName_valid = true;
                } else {
                    this.userDataAdd.firstName_valid = false;
                }
            },
            addUser_checkValid_tel() {
                let tel = this.userDataAdd.tel;
                let telRegexp = "^09[0-9]{8}$";
                let checkResult = tel.match(telRegexp);
                if (checkResult[0] !== '' && checkResult.input.length <= 10) {
                    this.userDataAdd.tel_valid = true;
                } else {
                    this.userDataAdd.tel_valid = false;
                }
            },
            addUser_checkValid_address() {
                let address = this.userDataAdd.address.address_detail;
                let city = this.userDataAdd.address.city;
                if (address !== "" && city !== "") {
                    this.userDataAdd.address_valid = true;
                } else {
                    this.userDataAdd.address_valid = false;
                }
            },
            firstPage() {
                let jsonData = [];
                this.currentPage = 1;
                axios.get("?page=1&limit=6")
                    .then(res => {
                        for (let i = 0; i < res.data.length; i++) {
                            jsonData.push(res.data[i]);
                        }
                        console.log(res.data.length)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                this.userData = jsonData;
            },
            checkPageNumbers() {
                axios.get("")
                    .then(res => {
                        console.log(res)
                        let pageNumbers = [];
                        let pageCounter = Math.ceil(res.data.length / 6);
                        for (let i = 1; i <= pageCounter; i++) {
                            pageNumbers.push(i);
                        }
                        this.pageNumbers = pageNumbers;
                        console.log(this.pageNumbers);
                    })
            },
            choosePage(index) {
                let jsonData = [];
                this.currentPage = index + 1;
                axios.get("?page=" + this.currentPage +
                    "&limit=6")
                    .then(res => {
                        for (let i = 0; i < res.data.length; i++) {
                            jsonData.push(res.data[i]);
                        }
                    });
                this.userData = jsonData;
            },
            lastPage() {
                if (this.currentPage > 1) {
                    let jsonData = [];
                    this.currentPage -= 1;
                    axios.get("?page=" + this.currentPage +
                        "&limit=6")
                        .then(res => {
                            console.log(res);
                            for (let i = 0; i < res.data.length; i++) {
                                jsonData.push(res.data[i]);
                            }
                        })
                    this.userData = jsonData;
                    this.userListReload();
                    console.log(this.currentPage)
                }
            },
            theLastPage() {
                let jsonData = [];
                this.currentPage = this.pageNumbers.length;
                axios.get("?page=" + this.currentPage +
                    "&limit=6")
                    .then(res => {
                        for (let i = 0; i < res.data.length; i++) {
                            jsonData.push(res.data[i]);
                        }
                    })
                this.userData = jsonData;
            },
            nextPage() {
                if (this.currentPage < this.pageNumbers.length) {
                    let jsonData = [];
                    this.currentPage += 1;
                    axios.get("?page=" + this.currentPage +
                        "&limit=6")
                        .then(res => {
                            console.log(res);
                            for (let i = 0; i < res.data.length; i++) {
                                jsonData.push(res.data[i]);
                            }
                        });
                    this.userData = jsonData;
                    this.userListReload();
                }
            },
            clearRemainData() {
                this.userDataAdd.lastName = "";
                this.userDataAdd.firstName = "";
                this.userDataAdd.tel = "";
                this.userDataAdd.birthday = "";
                this.userDataAdd.gender = "";
                this.userDataAdd.interest = [];
                this.userDataAdd.address.city = "";
                this.userDataAdd.address.address_detail = "";
                this.userDataAdd.photo = "";
                this.userDataUpdate.lastName = "";
                this.userDataUpdate.firstName = "";
                this.userDataUpdate.tel = "";
                this.userDataUpdate.birthday = "";
                this.userDataUpdate.gender = "";
                this.userDataUpdate.interest = [];
                this.userDataUpdate.photo = "";
                this.userDataAdd.lastName_valid = false;
                this.userDataAdd.firstName_valid = false;
                this.userDataAdd.tel_valid = false;
                this.userDataUpdate.lastName_valid = false;
                this.userDataUpdate.firstName_valid = false;
                this.userDataUpdate.tel_valid = false;
                this.userDataUpdate.address_valid = false;
            }
        },
        created() {
            this.firstPage();
            this.checkPageNumbers();
        }
    }
</script>

<style src=""></style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    *:not(.material-icons) {
        font-family: 'Noto Sans TC', sans-serif;
    }

    .title-area {
        text-align: center;
        margin: 2% 0 3%;
    }

    .addUserBtn {
        text-align: center;
        padding: 2%;
    }

    .addUserBtn a {
        letter-spacing: .3rem;
        margin: auto;
    }

    .pagination {
        text-align: center;
        z-index: -100;
    }

    .p-fixed {
        position: fixed;
    }

    .p-absolute {
        position: absolute;
    }

    .mainArea {
        display: flex;
        justify-content: center;
        z-index: 10;
    }

    #app {
        height: 100vh;
    }

    mainArea__form {
        margin: auto;
    }

    .d-flex-center {
        display: flex;
        justify-content: center;
    }

    .ml-1 {
        margin-left: 1rem;
    }

    .mainArea__form-close {
        position: absolute;
        right: -8%;
        top: -3%;
    }

    .last-next-page {
        font-size: 2rem;
    }

    .pageList__item {
        font-size: 1.5rem;
        padding: .6rem;
        margin: 0 .25rem;
    }

    /*.pageList__item-choose {*/
    /*    background-color: #e57373;*/
    /*    color: white;*/
    /*    border-radius: .3rem;*/
    /*}*/

    .pageList li:hover {
        color: #e57373;
    }

    .pageList li {
        vertical-align: center;
        line-height: .8rem;
        cursor: pointer;
    }

    .pageList__first-last-items {
        font-size: 1.2rem;
        padding: .5rem;
    }

    .editItem {
        cursor: pointer;
    }

    .editItem:hover {
        color: #e57373;
    }

    .mainArea__form-title {
        text-align: center;
        font-size: 2rem;
    }

    .add-userform-background {
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
    }

    .add-userform-content {
        position: relative;
        z-index: 2;
        display: flex;
        justify-content: center;
        top: -5rem;
        max-width: 391.5px;
    }

    .edit-userform-background {
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
    }

    .edit-userform-content {
        position: relative;
        z-index: 2;
        display: flex;
        justify-content: center;
        top: -5rem;
        max-width: 391.5px;
    }

    .validRecommend {
        font-size: .5rem;
    }

    .tel-valid-recommend {
        text-align: center;
    }

    .user-interest p {
        margin-left: 1rem;
    }

    .user-interest span {
        margin-left: .5rem;
    }
</style>
