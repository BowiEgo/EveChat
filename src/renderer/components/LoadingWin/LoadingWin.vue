<template>
  <div class="loading">
    <div 
      v-for="(item, index) in 5" 
      :key="index" 
      class="circle" 
      :style="{width: width + 'px', height: height + 'px'}">
      <div 
        class="dot" 
        :style="{width: dotSize + 'px', height: dotSize + 'px'}">
      </div>
    </div>
    <!-- <div class="circle" :style="{width: width + 'px', height: height + 'px'}">
      <div class="dot" :style="{width: dotSize + 'px', height: dotSize + 'px'}"></div>
    </div>
    <div class="circle" :style="{width: width + 'px', height: height + 'px'}">
      <div class="dot" :style="{width: dotSize + 'px', height: dotSize + 'px'}"></div>
    </div>
    <div class="circle" :style="{width: width + 'px', height: height + 'px'}">
      <div class="dot" :style="{width: dotSize + 'px', height: dotSize + 'px'}"></div>
    </div>
    <div class="circle" :style="{width: width + 'px', height: height + 'px'}">
      <div class="dot" :style="{width: dotSize + 'px', height: dotSize + 'px'}"></div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'LoadingWin',
  props: {
    dotSize: {
      type: Number,
      default: 5
    },
    width: {
      type: Number,
      default: 38
    },
    height: {
      type: Number,
      default: 38
    }
  }
}
</script>

<style scoped>
.loading {
  /* position: absolute; */
  /* width: 40px; */
  margin: auto;
}
.loading .circle {
  position: absolute;
  /* width: 38px; */
  /* height: 38px; */
  opacity: 0;
  transform: rotate(225deg);
  animation-iteration-count: infinite;
  animation-name: orbit;
  animation-duration: 5.5s;
}
.loading .circle .dot {
  position: absolute;
  /* width: 5px; */
  /* height: 5px; */
  border-radius: 50%;
  background: #fff;
  /* Pick a color */
}
.loading .circle:nth-child(2) {
  animation-delay: 240ms;
}
.loading .circle:nth-child(3) {
  animation-delay: 480ms;
}
.loading .circle:nth-child(4) {
  animation-delay: 720ms;
}
.loading .circle:nth-child(5) {
  animation-delay: 960ms;
}
@keyframes orbit {
  0% {
    transform: rotate(225deg);
    opacity: 1;
    animation-timing-function: ease-out;
  }
  7% {
    transform: rotate(345deg);
    animation-timing-function: linear;
  }
  30% {
    transform: rotate(455deg);
    animation-timing-function: ease-in-out;
  }
  39% {
    transform: rotate(690deg);
    animation-timing-function: linear;
  }
  70% {
    transform: rotate(815deg);
    opacity: 1;
    animation-timing-function: ease-out;
  }
  75% {
    transform: rotate(945deg);
    animation-timing-function: ease-out;
  }
  76% {
    transform: rotate(945deg);
    opacity: 0;
  }
  100% {
    transform: rotate(945deg);
    opacity: 0;
  }
}

</style>
