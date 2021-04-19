<template>
  <div id="hist">
    <div id="heading">Your Products</div>
    <div id="purchases">Total items listed: {{ this.products.length }}</div>
    <ul id="itemsList">
      <li id="item" v-for="i in products" :key="i[0]">
        <img id="img1" v-bind:src="i[1].img_url" />
        <br />
        {{ i[1].name }}, ${{ i[1].price }}
      </li>
    </ul>

    <div v-if="this.objectLoaded == true">
      <div id="heading">Purchases</div>
      <p
        id="purchases"
        v-for="(value,key) in this.sortedPurchasedProducts"
        :key="key"
      >
        {{ value[0] }}: Purchased {{ value[1] }} times
      </p>
    </div>
    <br />
    <div id="heading">Total Sales</div>
    <p id="purchases">${{ this.totalSales.toFixed(2) }}</p>
    <p></p>
  </div>
</template>

<script>
import { fb, database } from "../../firebase.js";

export default {
  data() {
    return {
      products: [],
      purchasedProducts: {},
      sortedPurchasedProducts: {},
      objectLoaded: false,
      totalSales: 0,
    };
  },
  methods: {
    fetchProducts: async function() {
      let id = await fb.auth().currentUser.uid;
      await database
        .collection("companies")
        .doc(id)
        .get()
        .then((doc) => {
          this.name = doc.data().name;
        });
      await database
        .collection("products")
        .where("company_name", "==", this.name)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.products.push([doc.id, doc.data()]);
          });
        });
    },
    fetchPurchased: async function() {
      for (let i = 0; i < this.products.length; i++) {
        // this.porducts[i][1]["count"] = await 0;
        this.purchasedProducts[this.products[i][1].name] = await 0;
      }
      //var allPurchases =[];
      await database
        .collection("purchased")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            // for (let i = 0; i < this.products.length; i++) {
            //   if (doc.data().name == this.products[i][1].name) {
            //     this.products[i][1]["count"]++;
            //   }
            // }
            if (doc.data().name in this.purchasedProducts) {
              this.purchasedProducts[doc.data().name]++;
            }
          });
        });
      this.objectLoaded = await true;
      this.sortedPurchasedProducts = Object.entries(this.purchasedProducts).sort(([,a],[,b]) => b-a);
      console.log(this.sortedPurchasedProducts)
      console.log(this.purchasedProducts)

    },
    fetchTotal: async function() {
      for (const [key, value] of Object.entries(this.purchasedProducts)) {
        for (let i = 0; i < this.products.length; i++) {
          if (key == this.products[i][1].name) {
            this.totalSales +=
              (await value) * parseFloat(this.products[i][1].price);
          }
        }
      }
      //this.totalSales.toFixed(2);
    },
  },
  async created() {
    await this.fetchProducts();
    await this.fetchPurchased();
    await this.fetchTotal();
  },
  //   mounted() {
  //     this.fetchPurchased();
  //   },
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
  font-weight: bold;
}

.card {
  padding: 30px;
  margin: 30px;
  background: #c1d9ca;
  border-radius: 15px;
}

#purchases {
  font-family: "EB Garamond";
  font-size: 23px;
}
</style>
