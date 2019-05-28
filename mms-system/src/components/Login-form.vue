<template>
    <div class="row col s6 offset-s6">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input id="first_name" type="text" class="validate">
            <label for="first_name">帳號：</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="password" type="password" class="validate">
            <label for="password">密碼</label>
          </div>
        </div>
      </form>
    </div>
</template>
<script>
export default {};
</script>
<style>
.w-30 {
  width: 30%;
}

.w-50 {
    width: 50%;
}
.mb-10 {
  margin-bottom: 10%;
}
.d-flex {
  display: flex;
}
.align-center {
  width: 100%;
  height: 100vh;
  align-items: center;
}
.justify-center {
  justify-content: space-between;
}
</style>

<style scoped>
.material-icons.login__page-icon {
  font-size: 4rem;
  margin-top: 0.5rem;
}
</style>
