axios.defaults.baseURL = "https://5cdab7b5eb39f80014a75933.mockapi.io/users";
let app = new Vue({
    el: "#app",
    data: {
        maxDate: new Date(),
        interestOptions: ["玩電動", "打籃球", "看書", "潛水", "測試", "飛行傘", "繪圖", "游泳", "寫書法"],
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

        },
        queryUserId: '',
        editFormToggle: false,
        addFormToggle: false,
        userData: [],
        currentPage: 1,
    },
    computed: {
        addUser_birthdayFormat() {
            let birthday = this.userDataAdd.birthday;
            let YYYY = birthday.getFullYear();
            let MM = birthday.getMonth() + 1;
            let DD = birthday.getDate();
            return YYYY + "-" + MM + "-" + DD;
        },
        editUser_birthdayFormat() {
            let birthday = this.userDataUpdate.birthday;
            let YYYY = birthday.getFullYear();
            let MM = birthday.getMonth() + 1;
            let DD = birthday.getDate();
            return YYYY + "-" + MM + "-" + DD;
        }
    },
    methods: {
        firstPage() {
            let jsonData = [];
            this.currentPage = 1;
            axios.get("?page=1&limit=6")
                .then(res => {
                    for (i = 0; i < res.data.length; i++) {
                        jsonData.push(res.data[i]);
                    }
                })
            this.userData = jsonData;
        },
        theLastPage() {
            let jsonData = [];
            this.currentPage = this.pageNumbers.length;
            console.log(this.currentPage)
            axios.get("?page=" + this.currentPage +
                "&limit=6")
                .then(res => {
                    for (i = 0; i < res.data.length; i++) {
                        jsonData.push(res.data[i]);
                    }
                })
            this.userData = jsonData;
        },
        choosePage(index) {
            let jsonData = [];
            this.currentPage = index + 1;
            axios.get("?page=" + this.currentPage +
                "&limit=6")
                .then(res => {
                    for (i = 0; i < res.data.length; i++) {
                        jsonData.push(res.data[i]);
                    }
                });
            this.userData = jsonData;
        },
        lastPage() {
            if (this.currentPage > 1) {
                let jsonData = [];
                this.currentPage -= 1
                axios.get("?page=" + this.currentPage +
                    "&limit=6")
                    .then(res => {
                        console.log(res);
                        for (i = 0; i < res.data.length; i++) {
                            jsonData.push(res.data[i]);
                        }
                    })
                this.userData = jsonData;
                this.userListReload();
                console.log(this.currentPage)
            }
        },
        nextPage() {
            if (this.currentPage < this.pageNumbers.length) {
                let jsonData = [];
                this.currentPage += 1
                axios.get("?page=" + this.currentPage +
                    "&limit=6")
                    .then(res => {
                        console.log(res);
                        for (i = 0; i < res.data.length; i++) {
                            jsonData.push(res.data[i]);
                        }
                    })
                this.userData = jsonData;
                this.userListReload();
                console.log(this.currentPage)
            }
        },
        userListReload() {
            let jsonData = [];
            axios.get("?page=" + this.currentPage +
                "&limit=6")
                .then(res => {
                    for (i = 0; i < res.data.length; i++) {
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
            this.editUser_checkValid_lastName();
            this.editUser_checkValid_firstName();
            this.editUser_checkValid_tel();
            this.editUser_checkValid_address();
            this.editFormToggle = true;
            console.log(index)
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
            if (this.userDataUpdate.lastName_valid && this.userDataUpdate.firstName_valid && this.userDataUpdate.tel_valid) {
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
        editUser_checkValid_address(){
            let address = this.userDataUpdate.address.address_detail;
            // console.log("測試"+ address);
            if(address !== ""){
                this.userDataUpdate.address_valid = true;
            } else {
                this.userDataUpdate.address_valid = false;
            }
            // console.log("測試"+this.userDataUpdate.address_valid)
            // if(address){
            //     this.userDataUpdate.address_valid == true;
            // } else {
            //     this.userDataUpdate.address_valid == false;
            // }
            // this.userDataUpdate.address_valid = true;
        },
        addUserConfirm() {
            if (this.userDataAdd.lastName_valid && this.userDataAdd.firstName_valid && this.userDataAdd.tel_valid) {
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
                                errMassage = "上傳圖片過大!"
                        }
                        alert(errMassage);
                    })
            } else {
                alert("請確認填妥表單")
            }
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
        checkPageNumbers() {
            axios.get("")
                .then(res => {
                    let pageNumbers = [];
                    let pageCounter = Math.ceil(res.data.length / 6);
                    for (i = 1; i <= pageCounter; i++) {
                        pageNumbers.push(i);
                    }
                    this.pageNumbers = pageNumbers;
                    console.log(this.pageNumbers);
                })
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
        var elems = document.querySelectorAll('.datepicker');
        var instances = M.Datepicker.init(elems, options);
    }
})