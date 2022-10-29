<template>
  <div class="timeDisplay">
    <span class="material-icons"> timer </span>
    <span>{{ getTime }}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: 0,
      clearTime: '',
    }
  },
  props: {
    programArr: Array,
  },
  methods: {
    stopTimer() {
      console.log('uuuuuu')
    },
  },
  computed: {
    getTime() {
      console.log(this.programArr)
      this.programArr ? '' : clearInterval(this.clearTime)
      return (this.time/1).toFixed(1);
    }
  },
  mounted() {
    this.clearTime = setInterval(() => {
      this.time++
    },1000)
  }
};
</script>
<style lang="scss" scoped>
.timeDisplay {
  display: flex;
}
</style>
