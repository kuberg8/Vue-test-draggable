<template>
  <div class="modal" @click.stop>
    <div class="field" @click.stop="$emit('close')"></div>
    <div class="window" :style="windowStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: "fit-content",
    },
    width: {
      type: String,
      default: "fit-content",
    },
  },
  computed: {
    windowStyle() {
      return {
        width: this.width,
        height: this.height,
      };
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;
}

.field {
  position: fixed;
  left: 0;
  top: 0;
  display: block;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  animation: backOpacity 0.2s linear;
}
@keyframes backOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.window {
  display: flex;
  width: 200px;
  height: 100px;
  background: #ffffff;
  box-shadow: 0px 28px 30px -20px rgba(0, 0, 0, 0.25);
  border-radius: .3rem;
  z-index: 1001;
  position: relative;
  animation: windowAnime 0.2s ease-in-out;
  color: black;
  box-sizing: border-box;
}

@keyframes windowAnime {
  0% {
    opacity: 0;
    transform: translate3d(0px, 100%, 0px);
  }
  100% {
    opacity: 1;
    transform: translate3d(0px, 0px, 0px);
  }
}
</style>
