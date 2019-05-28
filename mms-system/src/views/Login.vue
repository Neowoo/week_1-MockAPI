<template>
    <div class="login__bg">
        <LoginForm></LoginForm>
    </div>
</template>
<script>
    import LoginForm from "@/components/LoginForm.vue"

    export default {
        name: "login",
        components: {
            LoginForm
        }
    }
</script>
<style scoped>
    .login__bg{
        background:linear-gradient(-80deg, #fff 50%, #80cbc4 50%);
        height: 100vh;
    }
</style>