<template>
    <div class="container personal__info">
        <div class="row">
            <div class="col s3  personal__info--photo">
                <img :src="$store.state.managerData.photo">
            </div>
            <div class="col s9">
<!--                <span class="flow-text">5-columns wide pulled to the left by 7-columns.</span>-->
                <p class="personal__info__content--name">{{$store.state.managerData.lastName + $store.state.managerData.firstName}}</p>
            </div>
        </div>
    </div>
</template>
<script>

</script>
<style scoped>
    .container.personal__info {
        padding-top: 5%;
    }
    .personal__info--photo img{
        width: 100%;
        height: 100%;
    }
    .personal__info--photo {
        min-height: 150px;
        clip-path: circle(37% at 50% 50%);
    }
    h4.personal__info__content--name {
        padding: 6% 0 0 5%;
        font-size: 2rem;
    }
</style>