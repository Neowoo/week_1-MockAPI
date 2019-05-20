axios.defaults.baseURL = "https://5cdab7b5eb39f80014a75933.mockapi.io/users";
// Vue.use(VeeValidate);
let app = new Vue({
    el: "#app",
    data: {
        pageNumbers: [],
        userDataUpdate: {
            lastName: "",
            firstName: "",
            tel: "",
            photo: ""
        },
        userDataAdd: {
            lastName: "",
            firstName: "",
            tel: "",
            photo: ""
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
                })
            this.userData = jsonData;
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
            this.userDataUpdate.firstName = this.userData[index].firstName;
            this.userDataUpdate.lastName = this.userData[index].lastName;
            this.userDataUpdate.tel = this.userData[index].tel;
            this.userDataUpdate.photo = this.userData[index].photo;
            this.editFormToggle = true;
            console.log(this.userData[index])
        },
        editCancel() {
            this.editFormToggle = false;
            this.addFormToggle = false;
            let userDataUpdate = this.userDataUpdate;
            userDataUpdate.lastName = "";
            userDataUpdate.firstName = "";
            userDataUpdate.tel = "";
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
        },
        addUserConfirm() {
            // alert('hi')
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
                    this.clearAddData();
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
        clearAddData() {
            this.userDataAdd.lastName = "";
            this.userDataAdd.firstName = "";
            this.userDataAdd.tel = "";
            this.userDataAdd.email = "";
            this.userDataAdd.photo = "";
        }
    },
    created() {
        this.firstPage();
        this.checkPageNumbers();
    }
})