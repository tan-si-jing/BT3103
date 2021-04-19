<template>
  <div>
    <div id="top-container">
      <Welcome/>
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
    showDash: function() {
      this.display = "SalesDash";
    },
    showAnalysis: function() {
      this.display = "SalesAnalysis";
    }
  },
  async created() {
    this.fetchProducts();
  },
  beforeDestroy() {
    this.display = "";
  }
};
</script>

<style scoped>
#welcome {
  width: 40%;
}

#top-container {
  height: 65vh;
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