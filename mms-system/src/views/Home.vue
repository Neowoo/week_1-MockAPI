<template>
  <div class="home">
    <UserDataOverview/>
  </div>
</template>

<script>
// @ is an alias to /src
import UserDataOverview from '@/components/UserDataOverview.vue'

export default {
  name: 'home',
  components: {
    UserDataOverview
  }
}
</script>
