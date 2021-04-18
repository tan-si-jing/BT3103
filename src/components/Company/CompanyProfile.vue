<template>
  <div>
    <div id="top-container">
      <Welcome style="grid-column: 2;  grid-row-start: 1;justify-self:center;"></Welcome>
      <!--<button v-on:click="redeemPoints()" id="redeem">Redeem Eco-Points</button>-->
    </div>
    <nav id="profnav">
      <button v-on:click="showDash()" class="nav-btn">Sales Dashboard</button>
      <button v-on:click="showAnalysis()" class="nav-btn">Sales Analysis</button>
    </nav>
    <div v-if="this.display == ''">
      <h3 style="font-weight: bold; margin: 30px;">Click the options above to view each section!</h3>
    </div>
    <div v-else-if="this.display == 'SalesDash'">
      <SalesDash />
    </div>
    <div v-else-if="this.display == 'SalesAnalysis'">
      <SalesAnalysis />
    </div>
    <Footer />
  </div>
</template>

<script>
import Welcome from "./Welcome.vue";
import Footer from "../Footer";
import SalesDash from "./SalesDash";
import SalesAnalysis from "./SalesAnalysis.vue";
import { fb, database } from "../../firebase.js";

export default {
  data() {
    return {
      name: null,
      display: "",
      products: []
    };
  },
  components: {
    Footer,
    Welcome,
    SalesDash,
    SalesAnalysis
  },
  methods: {
    fetchUserData: function() {
      let id = fb.auth().currentUser.uid;
      database
        .collection("users")
        .doc(id)
        .get()
        .then(doc => {
          this.name = doc.data().name;
        });
    },
    fetchProducts: function() {
      database
        .collection("products")
        .where("company_name", "==", this.name)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            this.products.push([doc.id, doc.data()]);
          });
        });
    },
    // redeemPoints: function() {
    //   this.display = "EcoPoints";
    // },
    showDash: function() {
      this.display = "SalesDash";
    },
    showAnalysis: function() {
      this.display = "SalesAnalysis";
    }
    // showLead: function() {
    //   this.display = "Leaderboard";
    // }
  },
  created() {
    this.fetchUserData();
  },
  beforeDestroy() {
    this.display = "";
  }
};
</script>

<style scoped>
#top-container {
  padding: 60px;
  display: grid;
  grid-template-columns: 30% auto 30%;
  grid-template-rows: 275px auto 40px;
  grid-auto-flow: column;
  height: 70vh;
}

#redeem {
  border-radius: 10px;
  font-family: "EB Garamond";
  font-size: 20px;
  color: #d8e2dc;
  background: #006d77;
  grid-column-start: 2;
  grid-row-start: 3;
  justify-self: right;
  width: 190px;
}

#profnav {
  height: 40px;
  background: #81af93;
  display: flex;
  padding: 0px 20px;
  margin-bottom: 30px;
}

.nav-btn {
  font-family: "EB Garamond";
  font-size: 22px;
  color: white;
  background: #81af93;
  border: none;
  padding: 0px 15px;
}
</style>