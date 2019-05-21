axios.defaults.baseURL = "https://5cdab7b5eb39f80014a75933.mockapi.io/users";
let app = new Vue({
    el: "#app",
    data: {
        datePicker: {
            mode: "single",
            selectedDate: null
        },
        pageNumbers: [],
        userDataUpdate: {
            lastName: "",
            firstName: "",
            tel: "",
            photo: "",
            lastName_valid: false,
            firstName_valid: false,
            tel_valid: false,
            photo_valid: false
        },
        userDataAdd: {
            lastName: "",
            firstName: "",
            tel: "",
            photo: "",
            lastName_valid: false,
            firstName_valid: false,
            tel_valid: false,
            photo_valid: false
        },
        queryUserId: '',
        editFormToggle: false,
        addFormToggle: false,
        userData: [],
        currentPage: 1,
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
            this.queryUserId = this.userData[index].id;
            // this.userDataUpdate.firstName = this.userData[index].firstName;
            // this.userDataUpdate.lastName = this.userData[index].lastName;
            // this.userDataUpdate.tel = this.userData[index].tel;
            this.userDataUpdate.photo = this.userData[index].photo;
            this.editFormToggle = true;
            console.log(this.userData[index])
        },
        buttonCancel() {
            this.editFormToggle = false;
            this.addFormToggle = false;
            let userDataAdd = this.userDataAdd;
            let userDataUpdate = this.userDataUpdate
            this.clearRemainData();
            userDataAdd.lastName_valid = false;
            userDataAdd.firstName_valid = false;
            userDataAdd.tel_valid = false;
            userDataUpdate.lastName_valid = false;
            userDataUpdate.firstName_valid = false;
            userDataUpdate.tel_valid = false;

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
                    email: this.userDataUpdate.email,
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
            if (checkResult[0] !== '' && checkResult.input.length <= 10) {
                this.userDataUpdate.tel_valid = true;
            } else {
                this.userDataUpdate.tel_valid = false;
            }
        },
        addUserConfirm() {
            if (this.userDataAdd.lastName_valid && this.userDataAdd.firstName_valid && this.userDataAdd.tel_valid) {
                axios.post("", {
                    firstName: this.userDataAdd.firstName,
                    lastName: this.userDataAdd.lastName,
                    tel: this.userDataAdd.tel,
                    email: this.userDataAdd.email,
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
            this.userDataAdd.email = "";
            this.userDataAdd.photo = "";
            this.userDataUpdate.lastName = "";
            this.userDataUpdate.firstName = "";
            this.userDataUpdate.tel = "";
            this.userDataUpdate.photo = "";
        }
    },
    created() {
        this.firstPage();
        this.checkPageNumbers();
        var elems = document.querySelectorAll('.datepicker');
        var instances = M.Datepicker.init(elems, options);
    }
})