<template>
  <div id="hist">
    <ul>
      <h3>Thank you for these purchases which have helped to make the world a more sustainable place!</h3>
      <li id="item" v-for="j in products" :key="j.name">
        <img id="img1" v-bind:src="j.img_url" />
        <ul>
          <li id="description">{{ j.name }} x {{ j.qty }}</li>
          <li id="description">
            <img id="img2" src="https://image.flaticon.com/icons/png/128/679/679720.png" />
            {{ j.status }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { fb, database } from "../../firebase.js";

export default {
  data() {
    return {
      user_id: null,
      // product_ids: [],
      products: []
      // purchased: [],
    };
  },
  methods: {
    fetchUserData: function() {
      this.user_id = fb.auth().currentUser.uid;
    },
    fetchProducts: function() {
      database
        .collection("purchased")
        .where("user_id", "==", this.user_id)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            this.products.push(doc.data());
          });
        });

      //console.log(this.product_ids);
      //console.log(this.products);
      //console.log(this.products[4]);
      //   ids.forEach(x => {
      //     this.purchased.push(products[x - 1]);
      //   });
    }
    // fetchPurchased: function() {
    //   database
    //     .collection("products")
    //     .where("pdt_id", "in", [1, 2])
    //     .get()
    //     .then((snapshot) => {
    //       snapshot.docs.forEach((doc) => {
    //         this.products.push(doc.data());
    //       });
    //     });
    //   //console.log(this.products[0]);
    //   // this.product_ids.forEach(x => {
    //   //   this.purchased.push(this.products[x - 1]);
    //   // });
    // },
    // fetchPurchased: function() {
    //   var arr = [];
    //   this.products.forEach(x => {
    //     arr.push(x);
    //   });
    //   console.log(arr);
    //   this.purchased = arr;
    // }
  },
  created() {
    this.fetchUserData();
    // this.fetchProductIDs();
    // console.log(this.product_ids);
    this.fetchProducts();
    //this.fetchPurchased();
  }
  // mounted() {
  //   this.fetchPurchased();
  // },
};
</script>

<style scoped>
#hist {
  padding-bottom: 40px;
}
#item {
  padding-bottom: 0px;
  padding-top: 20px;
  background: #c1d9ca;
  border-radius: 10px;
  margin: 10px 0;
  position: relative;
  left: 30%;
  width: 40%;
}
#img1 {
  position: relative;
  left: 4%;
  max-width: 170px;
}
#img2 {
  max-width: 15px;
}

ul {
  list-style-type: none;
  padding-bottom: 30px;
}

#description {
  padding: 1%;
  text-transform: capitalize;
}
</style>