<template>
  <div class="container personalInfo">
    <div class="row">
      <div class="col s3 personalInfo--photo">
        <img :src="$store.state.managerData.photo">
      </div>
      <div class="col s9">
        <div class="row personalInfo--header">
          <p
            class="personalInfo--name col s3"
          >{{$store.state.managerData.lastName + $store.state.managerData.firstName}}
            <i class="material-icons right">exit_to_app</i>
          </p>
          <div class="row col s4 personalInfo__editMember">
            <!-- <i class="material-icons personalInfo__editMember--icon col s3">group</i>
            <span class="personalInfo__editMember--title">會員資料編輯區</span> -->
            <a class="waves-effect red lighten-3 btn">會員編輯<i class="material-icons right">group</i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.$store.dispatch("personalInfo_reload");
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
  min-height: 150px;
  clip-path: circle(25% at 50% 50%);
}
p.personalInfo--name {
  font-size: 2vw;
  margin: 0;
}
.personalInfo--header {
  padding-top: 11%;
}
.personalInfo__editMember--icon {
  font-size: 1.5vw;
  margin-top: 1%;
}
.personalInfo__editMember--title {
  font-size: 1vw;
}
.personalInfo__editMember {
  margin-top: .8%;
}
</style>