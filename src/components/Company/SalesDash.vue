<template>
  <div id="hist">
    <div id="heading">Your Products:</div>
    <ul id="itemsList">
      <li id="item" v-for="i in products" :key="i[0]">
        <img id="img1" v-bind:src="i[1].img_url" />
        <br />
        {{i[1].name}}
      </li>
    </ul>
    <div id="heading">Purchases:</div>
    <div
      v-for="(value,name) in this.purchasedProducts"
      :key="name"
    >{{name}}: Purchased {{value}} times</div>
  </div>
</template>

<script>
import { fb, database } from "../../firebase.js";

export default {
  data() {
    return {
      products: [],
      purchasedProducts: {}
    };
  },
  methods: {
    fetchProducts: async function() {
      let id = await fb.auth().currentUser.uid;
      await database
        .collection("companies")
        .doc(id)
        .get()
        .then(doc => {
          this.name = doc.data().name;
        });
      await database
        .collection("products")
        .where("company_name", "==", this.name)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            this.products.push([doc.id, doc.data()]);
          });
        });
    },
    fetchPurchased: async function() {
      for (let i = 0; i < this.products.length; i++) {
        this.purchasedProducts[this.products[i][1].name] = 0;
      }
      //var allPurchases =[];
      await database
        .collection("purchased")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (doc.data().name in this.purchasedProducts) {
              this.purchasedProducts[doc.data().name]++;
            }
          });
        });
    }
  },
  async created() {
    await this.fetchProducts();
    await this.fetchPurchased();
  }
};
</script>

<style scoped>
#hist {
  padding-bottom: 40px;
}

#item {
  padding: 35px;
  background-color: #c1d9ca;
  margin: 30px;
  flex-grow: 1;
  flex-basis: 300px;
  border-radius: 15px;
}

#itemsList {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  padding: 30px;
}

#img1 {
  min-width: 170px;
  max-height: 170px;
}

#heading {
  font-family: "EB Garamond";
  font-size: 25px;
}

.card {
  padding: 30px;
  margin: 30px;
  background: #c1d9ca;
  border-radius: 15px;
}
</style>