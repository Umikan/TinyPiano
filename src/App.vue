<script setup lang="ts">
import Keyboard from './components/Keyboard.vue';
</script>

<style scoped>
.title {
  @apply text-4xl font-extrabold text-white;
  letter-spacing: 5px;
  animation: zoom 3s cubic-bezier(.20, -0, .80, 1) infinite;
}

@keyframes zoom {
  0% {
    opacity: 50%;
    transform: scale(100%);
  }
  50% {
    opacity: 100%;
    transform: scale(110%);
  }
  75%{
    opacity: 100%;
    transform: scale(115%);
  }
  100% {
    opacity: 50%;
    transform: scale(100%);
  }
}

.bg { 
  background-image: url(/john-moeses-bauan-Oj-G9GYlLr0-unsplash.jpg);
  background-size: cover;
  filter: blur(15px);
  opacity: 40%;
}
</style>
<template>
  <div>
  <div class="bg fixed w-screen h-screen">

  </div>
  <div class="flex bg-gradient-to-b from-sky-600 to-green-50 flex-col gap-y-24 w-screen h-screen items-center justify-center">
    <h1 class="title">Touch me!</h1>
    <div>
    <Keyboard class="drop-shadow-xl"/>
    </div>
  </div>
</div>
</template>
