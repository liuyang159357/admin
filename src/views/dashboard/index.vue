<template>
  <div class="dashboard-container">
    <Card></Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from './Card'
export default {
  name: 'Dashboard',
  components:{
    Card
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 20px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
