<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans|Roboto+Mono|Work+Sans:400,700&display=swap");
@import url("//fonts.googleapis.com/css?family=EB+Garamond");

#app {
  font-family: Work Sans, EB Garamond;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color:rgba(216, 226, 220, 1);
}
</style>