<template>
    <div>
        <button v-on:click="removeProduct">Remove</button>
    </div>
</template>

<script>
import { database } from '../../firebase'
export default {
  props: {
    id: {
      type: String
    }
  },
  methods: {
    removeProduct: function () {
      database.collection("products").doc(this.id).delete()
    }
  }
}
</script>

<style scoped>
button {
  color: white;
  background-color: #688A75;
  border-color: #688A75;
  border-radius: 10px;
}

</style>

