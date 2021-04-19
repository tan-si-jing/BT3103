<template>
  <div>
    <Button id="remove" v-on:click="removeItem">Remove</Button>
  </div>
</template>

<script>
import { fb, database } from "../../firebase.js";
export default {
  data() {
    return {
    };
  },
  props: {
    pdt_id: {
      type: Number,
    }
  },
  methods: {
    removeItem: function () {
        let userid = fb.auth().currentUser.uid;
        database.collection("cart").doc(userid).get().then((doc) => {
            let cart = doc.data();
            let new_cart = {}
            for (const key_val in cart) {
                if (key_val != this.pdt_id) {
                    new_cart[key_val] = cart[key_val];
                }
            }
            if (Object.keys(new_cart).length == 0) {
              database.collection("cart").doc(userid).delete().then(() => {location.reload()});
            }
            else {
              database.collection("cart").doc(userid).set(new_cart).then(() => {location.reload()});
            }
        })
      }
  }
};
</script>

<style scoped>
#remove{
     width: 70px;
     height: 35px;
     padding: 3px;
     border-radius: 5px;
     background-color: #688A75;
    border-color: #688A75;
    font-family: 'EB Garamond';
    color: white;
    font-size: 15px;
    text-align: center;
 }
</style>