<template>
  <div>
  <b-input-group id="searchBar" size="sm" class="mb-2">
    <b-input-group-prepend is-text>
      <b-icon icon="search"></b-icon>
    </b-input-group-prepend>
    <b-form-input type="search" placeholder="Search products" v-on:keyup.enter="route($event)"></b-form-input>
  </b-input-group> 
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    route: function (event) {
      let keyword = event.target.value;
      this.$router
        .push({ path: "products", query: { searchTerm: keyword } }) //link to Products.vue
        .then(() => location.reload());
    },
  },
};
</script>

<style scoped>
#searchBar {
  padding: 5px;
}
</style>