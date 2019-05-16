var app = new Vue({
        el: "#app",
        data: {
            pageNumbers: [],
            userDataUpdate: {
                lastName: "",
                firstName: "",
                tel: "",
                email: ""
            },
            userDataAdd: {
                lastName: "",
                firstName: "",
                tel: "",
                email: ""
            },
            queryUserId: '',
            editFormToggle: false,
            addFormToggle: false,
            userData: [],
            currentPage: 1,
        },
        methods: {
            firstPage() {
                var jsonData = [];
                this.currentPage = 1;
                axios.get("https://5cdab7b5eb39f80014a75933.mockapi.io/users?page=1&limit=6")
                    .then(res => {
                        for (i = 0; i < res.data.length; i++) {
                            jsonData.push(res.data[i]);
                        }
                    })
                this.userData = jsonData;
            },
            theLastPage() {
                var jsonData = [];
                this.currentPage = this.pageNumbers.length;
                console.log(this.currentPage)
                axios.get("https://5cdab7b5eb39f80014a75933.mockapi.io/users?page=" + this.currentPage +
                    "&limit=6")
                    .then(res => {
                        for (i = 0; i < res.data.length; i++) {
                            jsonData.push(res.data[i]);
                        }
                    })
                this.userData = jsonData;
            },
            choosePage(index) {
                var jsonData = [];
                this.currentPage = index + 1;
                axios.get("https://5cdab7b5eb39f80014a75933.mockapi.io/users?page=" + this.currentPage +
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
                    axios.get("https://5cdab7b5eb39f80014a75933.mockapi.io/users?page=" + this.currentPage +
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
                    axios.get("https://5cdab7b5eb39f80014a75933.mockapi.io/users?page=" + this.currentPage +
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
                var jsonData = [];
                axios.get("https://5cdab7b5eb39f80014a75933.mockapi.io/users?page=" + this.currentPage +
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
                axios.delete("https://5cdab7b5eb39f80014a75933.mockapi.io/users/" + this.queryUserId)
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
                this.editFormToggle = true;
                console.log(this.queryUserId)
            },
            editCancel() {
                this.editFormToggle = false;
                this.addFormToggle = false;
                var userDataUpdate = this.userDataUpdate;
                userDataUpdate.lastName = "",
                    userDataUpdate.firstName = "",
                    userDataUpdate.tel = "",
                    userDataUpdate.email = ""
            },
            editConfirm() {
                var fullName = this.userDataUpdate.lastName + this.userDataUpdate.firstName;
                axios.put("https://5cdab7b5eb39f80014a75933.mockapi.io/users/" + this.queryUserId, {
                    name: fullName,
                    tel: this.userDataUpdate.tel,
                    email: this.userDataUpdate.email
                })
                    .then(res => {
                        console.log(res);
                        this.userListReload();
                        this.editFormToggle = false;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            addUserConfirm() {
                // alert('hi')
                var fullName = this.userDataAdd.lastName + this.userDataAdd.firstName;
                axios.post("https://5cdab7b5eb39f80014a75933.mockapi.io/users", {
                    name: fullName,
                    tel: this.userDataAdd.tel,
                    email: this.userDataAdd.email
                })
                    .then(res => {
                        console.log(res);
                        this.checkPageNumbers()
                        this.userListReload()
                        this.clearAddData()
                        this.addFormToggle = false;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            checkPageNumbers() {
                axios.get("https://5cdab7b5eb39f80014a75933.mockapi.io/users")
                    .then(res => {
                        var pageNumbers = [];
                        var pageCounter = Math.ceil(res.data.length / 6);
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
            }
        },
        created() {
            this.firstPage();
            this.checkPageNumbers();
        }
    })