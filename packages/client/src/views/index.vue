<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from '../components/HelloWorld.vue'
import Demo2 from '@remote/http://127.0.0.1:7001/api/widget/file/6.vue'

</script>

<template>
  <img alt="Vue logo" src="../assets/logo.png">
<!--  <Demo />-->
  <Demo2 />
<!--  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />-->
</template>

<style>

</style>
