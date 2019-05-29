<template>
  <div class="container">
    <div class="title-area row">
      <h3 class="col s6 offset-s3 text-center">
        會員資料系統
      </h3>
      <div class="col s3 backToPersonalInfo">
        <router-link :to="{name: 'personal-info'}">
          <a class="waves-effect waves-light btn-small">
            <i class="material-icons right">cloud</i>返回個人資料
          </a>
        </router-link>
      </div>
    </div>
    <div class="mainArea__form d-flex-center">
      <!-- 新增表單 -->
      <div class="row p-absolute mainArea__form" v-if="addFormToggle">
        <div class="add-userform-background" @click="buttonCancel"></div>
        <div class="add-userform-content">
          <a
            class="btn-floating btn-large waves-effect helfway-fab red lighten-2 mainArea__form-close"
            @click="buttonCancel"
          >
            <i class="material-icons">close</i>
          </a>
          <form class="col mainArea__form grey lighten-5 z-depth-2">
            <h5 class="mainArea__form-title">新增會員資料</h5>
            <div class="row">
              <div class="input-field col s12">
                <input
                  type="text"
                  id="add_account"
                  v-validate="'min:6'"
                  name="userAccount"
                  class="validate"
                  :class="{ invalid: errors.has('userAccount') }"
                  v-model="$store.state.userDataAdd.account"
                >
                <label for="add_account">帳號</label>
                <span class="dataFormAlert" v-show="errors.has('userAccount')">請至少輸入6個字元</span>
              </div>
              <div class="input-field col s12">
                <input
                  type="password"
                  id="add_password"
                  v-validate="'min:6'"
                  name="userPassword"
                  class="validate"
                  :class="{ invalid: errors.has('userPassword') }"
                  v-model="$store.state.userDataAdd.password"
                >
                <label for="add_password">密碼</label>
                <span class="dataFormAlert" v-show="errors.has('userPassword')">請至少輸入6個字元</span>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s6">
                <input
                  type="text"
                  id="add_last_name"
                  v-model="$store.state.userDataAdd.lastName"
                  class="validate"
                  pattern="[\u4e00-\u9fa5]{0,5}"
                  @change="addUser_checkValid_lastName"
                >
                <label for="add_last_name">姓</label>
                <p
                  v-show="!$store.state.userDataAdd.lastName_valid"
                  class="validRecommend"
                >請輸入0~5字中文</p>
              </div>
              <div class="input-field col s6">
                <input
                  id="add_first_name"
                  type="text"
                  class="validate"
                  v-model="$store.state.userDataAdd.firstName"
                  pattern="[\u4e00-\u9fa5]{0,5}"
                  @change="addUser_checkValid_firstName"
                >
                <label for="add_first_name">名</label>
                <p
                  v-show="!$store.state.userDataAdd.firstName_valid"
                  class="validRecommend"
                >請輸入0~5字中文</p>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input
                  id="add_tel"
                  type="text"
                  class="validate"
                  v-model="$store.state.userDataAdd.tel"
                  @change="addUser_checkValid_tel"
                  pattern="^09[0-9]{8}$"
                >
                <label for="add_tel">電話</label>
                <p
                  v-show="!$store.state.userDataAdd.tel_valid"
                  class="validRecommend tel-valid-recommend"
                >請輸入台灣手機格式(09+8碼)</p>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <p>生日</p>
                <v-date-picker
                  mode="single"
                  v-model="$store.state.userDataAdd.birthday"
                  :max-date="this.$store.state.maxDate"
                  is-required
                />
              </div>
              <div class="input-field col s12">
                <p>性別</p>
                <p>
                  <label>
                    <input
                      name="group1"
                      type="radio"
                      checked
                      v-model="$store.state.userDataAdd.gender"
                      value="男"
                    >
                    <span>男</span>
                  </label>
                  <label>
                    <input
                      name="group1"
                      type="radio"
                      v-model="$store.state.userDataAdd.gender"
                      value="女"
                    >
                    <span>女</span>
                  </label>
                </p>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <p>興趣</p>
                <p class="user-interest">
                  <label v-for="(options, index) in this.$store.state.interestOptions" :key="index">
                    <input
                      type="checkbox"
                      :value="options"
                      v-model="$store.state.userDataAdd.interest"
                    >
                    <span>{{options}}</span>
                  </label>
                </p>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s4">
                <select
                  class="browser-default"
                  v-model="$store.state.userDataAdd.address.city"
                  @change="addUser_checkValid_address"
                >
                  <option value disabled selected>選擇縣/市</option>
                  <option
                    v-for="(cities, index) in this.$store.state.taiwanCities"
                    :key="index"
                  >{{cities}}</option>
                </select>
              </div>
              <div class="input-field col s8">
                <input
                  type="text"
                  class="validate"
                  v-model="$store.state.userDataAdd.address.address_detail"
                  @change="addUser_checkValid_address"
                >
                <label for="email">地址</label>
                <!--                                <p v-show="!$store.state.userDataAdd.address_valid" class="validRecommend">地址請勿空白</p>-->
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
                <button class="btn teal lighten-3 ml-1" @click.prevent="addUser_before_confirm">確定</button>
                <!--                                <a class="waves-effect waves-light btn" @click="test">測試鈕</a>-->
              </div>
            </div>
          </form>
        </div>
      </div>
      <!--            編輯表單-->
      <div class="row p-absolute mainArea__form" v-if="editFormToggle">
        <div class="edit-userform-background" @click="buttonCancel"></div>
        <div class="edit-userform-content">
          <a
            class="btn-floating btn-large waves-effect helfway-fab red lighten-2 mainArea__form-close"
            @click="buttonCancel"
          >
            <i class="material-icons">close</i>
          </a>
          <form class="col mainArea__form grey lighten-5 z-depth-2">
            <h5 class="mainArea__form-title">編輯會員資料</h5>
            <div class="row">
              <div class="input-field col s12">
                <input
                  type="text"
                  id="edit_account"
                  v-validate="'min:6'"
                  name="editUserAccount"
                  class="validate"
                  :class="{ invalid: errors.has('editUserAccount') }"
                  @change="editUser_checkValid_account"
                  v-model="$store.state.userDataUpdate.account"
                >
                <label
                  for="edit_account"
                  :class="{active: $store.state.userDataUpdate.account_valid}"
                >帳號</label>
                <span class="dataFormAlert" v-show="errors.has('editUserAccount')">請至少輸入6個字元</span>
              </div>
              <div class="input-field col s12">
                <input
                  type="password"
                  id="edit_password"
                  v-validate="'min:6'"
                  name="editUserPassword"
                  class="validate"
                  :class="{ invalid: errors.has('editUserPassword') }"
                  @change="editUser_checkValid_password"
                  v-model="$store.state.userDataUpdate.password"
                >
                <label
                  for="edit_password"
                  :class="{active: $store.state.userDataUpdate.password_valid}"
                >密碼</label>
                <span class="dataFormAlert" v-show="errors.has('editUserPassword')">請至少輸入6個字元</span>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s6">
                <input
                  id="last_name"
                  type="text"
                  class="validate"
                  v-model="$store.state.userDataUpdate.lastName"
                  @change="editUser_checkValid_lastName"
                  pattern="[\u4e00-\u9fa5]{0,5}"
                >
                <label
                  for="last_name"
                  :class="{active: $store.state.userDataUpdate.lastName_valid}"
                >姓</label>
                <p
                  v-show="!$store.state.userDataUpdate.lastName_valid"
                  class="validRecommend"
                >請輸入0~5字中文</p>
              </div>
              <div class="input-field col s6">
                <input
                  id="first_name"
                  type="text"
                  class="validate"
                  v-model="$store.state.userDataUpdate.firstName"
                  @change="editUser_checkValid_firstName"
                  pattern="[\u4e00-\u9fa5]{0,5}"
                >
                <label
                  for="first_name"
                  :class="{active: $store.state.userDataUpdate.firstName_valid}"
                >名</label>
                <p
                  v-show="!$store.state.userDataUpdate.firstName_valid"
                  class="validRecommend"
                >請輸入0~5字中文</p>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input
                  id="tel"
                  type="text"
                  class="validate"
                  v-model="$store.state.userDataUpdate.tel"
                  @change="editUser_checkValid_tel"
                  pattern="^09[0-9]{8}$"
                >
                <label for="tel" :class="{active: $store.state.userDataUpdate.tel_valid}">電話</label>
                <p
                  v-show="!$store.state.userDataUpdate.tel_valid"
                  class="validRecommend tel-valid-recommend"
                >請輸入台灣手機格式(09+8碼)</p>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <p>生日</p>
                <v-date-picker
                  mode="single"
                  v-model="$store.state.userDataUpdate.birthday"
                  :max-date="this.$store.state.maxDate"
                  is-required
                />
              </div>
              <div class="input-field col s12">
                <p>性別</p>
                <p>
                  <label>
                    <input
                      name="group1"
                      type="radio"
                      checked
                      v-model="$store.state.userDataUpdate.gender"
                      value="男"
                    >
                    <span>男</span>
                  </label>
                  <label>
                    <input
                      name="group1"
                      type="radio"
                      v-model="$store.state.userDataUpdate.gender"
                      value="女"
                    >
                    <span>女</span>
                  </label>
                </p>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <p>興趣</p>
                <p class="user-interest">
                  <label v-for="(options, index) in this.$store.state.interestOptions" :key="index">
                    <input
                      type="checkbox"
                      :value="options"
                      v-model="$store.state.userDataUpdate.interest"
                    >
                    <span>{{options}}</span>
                  </label>
                </p>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s4">
                <select class="browser-default" v-model="$store.state.userDataUpdate.address.city">
                  <option value disabled selected>選擇縣/市</option>
                  <option
                    v-for="(cities, index) in this.$store.state.taiwanCities"
                    :key="index"
                  >{{cities}}</option>
                </select>
              </div>
              <div class="input-field col s8">
                <input
                  type="text"
                  class="validate"
                  v-model="$store.state.userDataUpdate.address.address_detail"
                  @change="editUser_checkValid_address"
                >
                <label :class="{active: $store.state.userDataUpdate.address_valid}">地址</label>
                <p v-show="!$store.state.userDataUpdate.address_valid" class="validRecommend">地址請勿空白</p>
              </div>
            </div>
            <div class="row">
              <div class="file-field input-field col s12">
                <div class="btn">
                  <span>File</span>
                  <input type="file" @change="uploadPhoto_updateUser">
                </div>
                <div class="file-path-wrapper">
                  <input
                    class="file-path validate"
                    type="text"
                    v-model="$store.state.userDataUpdate.photo"
                  >
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
              <li v-for="(items, index) in users.interest" :key="index">{{items}}</li>
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
      <a class="red lighten-2 btn-small" @click="addFormToggle = true">
        <i class="material-icons left">add</i>新增會員
      </a>
    </div>
    <ul class="d-flex-center pageList">
      <li class="pageList__first-last-items" @click="firstPage">第一頁</li>
      <li>
        <i class="material-icons last-next-page" @click="lastPage">chevron_left</i>
      </li>
      <li
        class="pageList__item pageList__item-choose"
        v-for="(pages, index) in pageNumbers"
        :key="index"
        @click="choosePage(index)"
      >{{pages}}</li>
      <li>
        <i class="material-icons last-next-page" @click="nextPage">chevron_right</i>
      </li>
      <li class="pageList__first-last-items" @click="theLastPage">第末頁</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserDataOverview",
  data() {
    return {
      pageNumbers: [],
      queryUserId: "",
      editFormToggle: false,
      addFormToggle: false,
      userData: [],
      currentPage: 1
    };
  },
  computed: {
    addUser_birthdayFormat() {
      let birthday = this.$store.state.userDataAdd.birthday;
      let YYYY = birthday.getFullYear();
      let MM = birthday.getMonth() + 1;
      let DD = birthday.getDate();
      return YYYY + "-" + MM + "-" + DD;
    },
    editUser_birthdayFormat() {
      let birthday = this.$store.state.userDataUpdate.birthday;
      let YYYY = birthday.getFullYear();
      let MM = birthday.getMonth() + 1;
      let DD = birthday.getDate();
      return YYYY + "-" + MM + "-" + DD;
    }
  },
  methods: {
    userListReload() {
      let jsonData = [];
      axios.get("?page=" + this.currentPage + "&limit=6").then(res => {
        for (let i = 0; i < res.data.length; i++) {
          jsonData.push(res.data[i]);
        }
        console.log(jsonData);
      });
      this.userData = jsonData;
      this.$store.state.userDataAdd.firstName_valid = false;
      this.$store.state.userDataAdd.lastName_valid = false;
      this.$store.state.userDataAdd.tel_valid = false;
    },
    deleteUser(index) {
      this.queryUserId = this.userData[index].id;
      console.log(this.userData[index].id);
      axios
        .delete("/" + this.queryUserId)
        .then(res => {
          console.log(res);
          this.userListReload();
          this.checkPageNumbers();
        })
        .catch(err => {
          console.log(err);
        });
    },
    editUser(index) {
      this.read_selected_userData(index);
      this.editUser_checkValid_lastName();
      this.editUser_checkValid_firstName();
      this.editUser_checkValid_tel();
      this.editUser_checkValid_address();
      this.editUser_checkValid_account();
      this.editUser_checkValid_password();
      this.editFormToggle = true;
      console.log(index);
    },
    read_selected_userData(index) {
      let userData = this.userData[index];
      this.queryUserId = userData.id;
      this.$store.state.userDataUpdate.firstName = userData.firstName;
      this.$store.state.userDataUpdate.lastName = userData.lastName;
      this.$store.state.userDataUpdate.tel = userData.tel;
      this.$store.state.userDataUpdate.birthday = new Date(userData.birthday);
      this.$store.state.userDataUpdate.gender = userData.gender;
      this.$store.state.userDataUpdate.photo = userData.photo;
      this.$store.state.userDataUpdate.interest = userData.interest;
      this.$store.state.userDataUpdate.address.city = userData.city;
      this.$store.state.userDataUpdate.address.address_detail =
        userData.address;
      this.$store.state.userDataUpdate.account = userData.account;
      this.$store.state.userDataUpdate.password = userData.password;
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
      reader.onloadend = () => {
        this.$store.state.userDataAdd.photo = reader.result;
      };
      reader.readAsDataURL(file);
    },
    uploadPhoto_updateUser(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      console.log(file.size);
      reader.onloadend = () => {
        this.$store.state.userDataUpdate.photo = reader.result;
      };
      reader.readAsDataURL(file);
    },
    editConfirm() {
      if (
        this.$store.state.userDataUpdate.lastName_valid &&
        this.$store.state.userDataUpdate.firstName_valid &&
        this.$store.state.userDataUpdate.tel_valid &&
        this.$store.state.userDataUpdate.address_valid
      ) {
        axios
          .put("/" + this.queryUserId, {
            firstName: this.$store.state.userDataUpdate.firstName,
            lastName: this.$store.state.userDataUpdate.lastName,
            tel: this.$store.state.userDataUpdate.tel,
            birthday: this.editUser_birthdayFormat,
            gender: this.$store.state.userDataUpdate.gender,
            interest: this.$store.state.userDataUpdate.interest,
            city: this.$store.state.userDataUpdate.address.city,
            address: this.$store.state.userDataUpdate.address.address_detail,
            photo: this.$store.state.userDataUpdate.photo,
            account: this.$store.state.userDataUpdate.account,
            password: this.$store.state.userDataUpdate.password
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
              case 413:
                errMassage = "上傳圖片過大!";
            }
            alert(errMassage);
          });
      } else {
        alert("請確認填妥表單");
      }
    },
    editUser_checkValid_account() {
      let account = this.$store.state.userDataUpdate.account;
      if (account !== "") {
        this.$store.state.userDataUpdate.account_valid = true;
      } else {
        this.$store.state.userDataUpdate.account_valid = false;
      }
    },
    editUser_checkValid_password() {
      let password = this.$store.state.userDataUpdate.password;
      if (password !== "") {
        this.$store.state.userDataUpdate.password_valid = true;
      } else {
        this.$store.state.userDataUpdate.password_valid = false;
      }
    },
    editUser_checkValid_lastName() {
      let lastName = this.$store.state.userDataUpdate.lastName;
      let lastNameRegexp = "[\u4e00-\u9fa5]{0,5}";
      let checkResult = lastName.match(lastNameRegexp);
      console.log(checkResult);
      if (checkResult[0] !== "" && checkResult.input.length <= 5) {
        this.$store.state.userDataUpdate.lastName_valid = true;
      } else {
        this.$store.state.userDataUpdate.lastName_valid = false;
      }
    },
    editUser_checkValid_firstName() {
      let firstName = this.$store.state.userDataUpdate.firstName;
      let firstNameRegexp = "[\u4e00-\u9fa5]{0,5}";
      let checkResult = firstName.match(firstNameRegexp);
      if (checkResult[0] !== "" && checkResult.input.length <= 5) {
        this.$store.state.userDataUpdate.firstName_valid = true;
      } else {
        this.$store.state.userDataUpdate.firstName_valid = false;
      }
    },
    editUser_checkValid_tel() {
      let tel = this.$store.state.userDataUpdate.tel;
      let telRegexp = "^09[0-9]{8}$";
      let checkResult = tel.match(telRegexp);
      console.log(checkResult[0]);
      if (checkResult[0] !== "" && checkResult.input.length <= 10) {
        this.$store.state.userDataUpdate.tel_valid = true;
      } else {
        this.$store.state.userDataUpdate.tel_valid = false;
      }
    },
    editUser_checkValid_address() {
      let address = this.$store.state.userDataUpdate.address.address_detail;
      let city = this.$store.state.userDataUpdate.address.city;
      if (address !== "" && city !== "") {
        this.$store.state.userDataUpdate.address_valid = true;
      } else {
        this.$store.state.userDataUpdate.address_valid = false;
      }
    },
    addUser_before_confirm() {
      if (
        this.$store.state.userDataAdd.account !== "" &&
        this.$store.state.userDataAdd.password !== ""
      ) {
        axios
          .get("?search=" + this.$store.state.userDataAdd.account)
          .then(res => {
            if (res.data[0]) {
              alert("此帳號已存在，請更換帳號");
            } else {
              this.addUserConfirm();
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert("帳號、密碼必需填寫");
      }
      // this.addUser_before_confirm();
    },
    addUserConfirm() {
      let account_valid = this.errors.has("userAccount");
      let password_valid = this.errors.has("userPassword");
      console.log(account_valid);
      if (
        this.$store.state.userDataAdd.lastName_valid &&
        this.$store.state.userDataAdd.firstName_valid &&
        !account_valid &&
        !password_valid
      ) {
        axios
          .post("", {
            firstName: this.$store.state.userDataAdd.firstName,
            lastName: this.$store.state.userDataAdd.lastName,
            tel: this.$store.state.userDataAdd.tel,
            birthday: this.addUser_birthdayFormat,
            gender: this.$store.state.userDataAdd.gender,
            interest: this.$store.state.userDataAdd.interest,
            city: this.$store.state.userDataAdd.address.city,
            address: this.$store.state.userDataAdd.address.address_detail,
            photo: this.$store.state.userDataAdd.photo,
            account: this.$store.state.userDataAdd.account,
            password: this.$store.state.userDataAdd.password
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
              case 413:
                errMassage = "請上傳50kb以下圖片!";
            }
            alert(errMassage);
          });
      } else {
        alert("請確認填妥表格");
      }
    },
    addUser_checkValid_lastName() {
      let lastName = this.$store.state.userDataAdd.lastName;
      let lastNameRegexp = "[\u4e00-\u9fa5]{0,5}";
      let checkResult = lastName.match(lastNameRegexp);
      console.log(checkResult);
      if (checkResult[0] !== "" && checkResult.input.length <= 5) {
        this.$store.state.userDataAdd.lastName_valid = true;
      } else {
        this.$store.state.userDataAdd.lastName_valid = false;
      }
    },
    addUser_checkValid_firstName() {
      let firstName = this.$store.state.userDataAdd.firstName;
      let firstNameRegexp = "[\u4e00-\u9fa5]{0,5}";
      let checkResult = firstName.match(firstNameRegexp);
      if (checkResult[0] !== "" && checkResult.input.length <= 5) {
        this.$store.state.userDataAdd.firstName_valid = true;
      } else {
        this.$store.state.userDataAdd.firstName_valid = false;
      }
    },
    addUser_checkValid_tel() {
      let tel = this.$store.state.userDataAdd.tel;
      let telRegexp = "^09[0-9]{8}$";
      let checkResult = tel.match(telRegexp);
      if (checkResult[0] !== "" && checkResult.input.length <= 10) {
        this.$store.state.userDataAdd.tel_valid = true;
      } else {
        this.$store.state.userDataAdd.tel_valid = false;
      }
    },
    addUser_checkValid_address() {
      let address = this.$store.state.userDataAdd.address.address_detail;
      let city = this.$store.state.userDataAdd.address.city;
      if (address !== "" && city !== "") {
        this.$store.state.userDataAdd.address_valid = true;
      } else {
        this.$store.state.userDataAdd.address_valid = false;
      }
    },
    firstPage() {
      let jsonData = [];
      this.currentPage = 1;
      axios
        .get("?page=1&limit=6")
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            jsonData.push(res.data[i]);
          }
          console.log(res.data.length);
        })
        .catch(err => {
          console.log(err);
        });
      this.userData = jsonData;
    },
    checkPageNumbers() {
      axios.get("").then(res => {
        console.log(res);
        let pageNumbers = [];
        let pageCounter = Math.ceil(res.data.length / 6);
        for (let i = 1; i <= pageCounter; i++) {
          pageNumbers.push(i);
        }
        this.pageNumbers = pageNumbers;
        console.log(this.pageNumbers);
      });
    },
    choosePage(index) {
      let jsonData = [];
      this.currentPage = index + 1;
      axios.get("?page=" + this.currentPage + "&limit=6").then(res => {
        for (let i = 0; i < res.data.length; i++) {
          jsonData.push(res.data[i]);
        }
        console.log(res);
      });
      this.userData = jsonData;
    },
    lastPage() {
      if (this.currentPage > 1) {
        let jsonData = [];
        this.currentPage -= 1;
        axios.get("?page=" + this.currentPage + "&limit=6").then(res => {
          console.log(res);
          for (let i = 0; i < res.data.length; i++) {
            jsonData.push(res.data[i]);
          }
        });
        this.userData = jsonData;
        this.userListReload();
        console.log(this.currentPage);
      }
    },
    theLastPage() {
      let jsonData = [];
      this.currentPage = this.pageNumbers.length;
      axios.get("?page=" + this.currentPage + "&limit=6").then(res => {
        for (let i = 0; i < res.data.length; i++) {
          jsonData.push(res.data[i]);
        }
      });
      this.userData = jsonData;
    },
    nextPage() {
      if (this.currentPage < this.pageNumbers.length) {
        let jsonData = [];
        this.currentPage += 1;
        axios.get("?page=" + this.currentPage + "&limit=6").then(res => {
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
      this.$store.state.userDataAdd.account = "";
      this.$store.state.userDataAdd.password = "";
      this.$store.state.userDataAdd.lastName = "";
      this.$store.state.userDataAdd.firstName = "";
      this.$store.state.userDataAdd.tel = "";
      this.$store.state.userDataAdd.birthday = "";
      this.$store.state.userDataAdd.gender = "";
      this.$store.state.userDataAdd.interest = [];
      this.$store.state.userDataAdd.address.city = "";
      this.$store.state.userDataAdd.address.address_detail = "";
      this.$store.state.userDataAdd.photo = "";
      this.$store.state.userDataAdd.account = "";
      this.$store.state.userDataAdd.password = "";
      this.$store.state.userDataUpdate.lastName = "";
      this.$store.state.userDataUpdate.firstName = "";
      this.$store.state.userDataUpdate.tel = "";
      this.$store.state.userDataUpdate.birthday = "";
      this.$store.state.userDataUpdate.gender = "";
      this.$store.state.userDataUpdate.interest = [];
      this.$store.state.userDataUpdate.photo = "";
      this.$store.state.userDataAdd.lastName_valid = false;
      this.$store.state.userDataAdd.firstName_valid = false;
      this.$store.state.userDataAdd.tel_valid = false;
      this.$store.state.userDataUpdate.lastName_valid = false;
      this.$store.state.userDataUpdate.firstName_valid = false;
      this.$store.state.userDataUpdate.tel_valid = false;
      this.$store.state.userDataUpdate.address_valid = false;
      this.$store.state.userDataUpdate.account_valid = false;
      this.$store.state.userDataUpdate.password_valid = false;
    },
    test() {
      this.$router.push("/personalInfo");
    }
  },
  created() {
    this.firstPage();
    this.checkPageNumbers();
    this.clearRemainData();
  }
};
</script>
<style>
*:not(.material-icons):not(.btn) {
  font-family: "Noto Sans TC", sans-serif;
}

*:not(a):not(span):not(i) {
  color: #616161;
}

.p-fixed {
  position: fixed;
}

.p-absolute {
  position: absolute;
}

.text-center {
  text-align: center;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-area {
  /*text-align: center;*/
  margin: 2% 0 3%;
}

.addUserBtn {
  text-align: center;
  padding: 2%;
}

.addUserBtn a {
  letter-spacing: 0.3rem;
  margin: auto;
}

.pagination {
  text-align: center;
  z-index: -100;
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
  padding: 0.6rem;
  margin: 0 0.25rem;
}

.pageList li:hover {
  color: #e57373;
}

.pageList li {
  vertical-align: center;
  line-height: 0.8rem;
  cursor: pointer;
}

.pageList__first-last-items {
  font-size: 1.2rem;
  padding: 0.5rem;
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
  font-size: 0.5rem;
}

.tel-valid-recommend {
  text-align: center;
}

.user-interest p {
  margin-left: 1rem;
}

.user-interest span {
  margin-left: 0.5rem;
}

.dataFormAlert {
  font-size: 0.5rem;
  color: red;
}

.backToPersonalInfo {
  padding-top: 5%;
}
</style>
