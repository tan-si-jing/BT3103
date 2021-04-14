<template>
<nav class="navbar navbar-expand-lg navbar-light" style="background-color: rgba(237, 246, 249, 1);">
  <a class="navbar-brand" href="/">
    <img src="../../public/YGS-logo.svg" width="30" height="30" class="d-inline-block align-top" style="margin: 0px 10px;">
    Your Green Stop
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent" style="margin: 0px 10px;">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle active" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color:#4e6657;font-family:EB Garamond; font-size: 17px">
          Products
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <SearchBar/>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="/products">View all products</a>
        </div>
      </li>
    </ul>
    <ul class="navbar-nav">
      <li class="nav-item justify-content-end">
        <a class="nav-link"><LoginSignup/></a>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
import LoginSignup from './LoginSignup.vue'
import SearchBar from './SearchBar.vue'
export default {
  components: {
    LoginSignup,
    SearchBar
  }
}
</script>

<style scoped>
.navbar-brand{
  font-weight: 700;
  font-size: 23px;
  font-family: EB Garamond;
  font-variant-caps: small-caps;
}
</style>
