<template>
  <div>
    <div id="top-container">
    <Welcome style="grid-column: 2;  grid-row-start: 1;justify-self:center;"></Welcome>
    <button v-on:click="redeemPoints()" id="redeem">Redeem Eco-Points</button>
    </div>
    <nav id="profnav">
      <button v-on:click="showDash()" class="nav-btn">Purchase Dashboard</button>
      <button v-on:click="showHist()" class="nav-btn">Purchase History</button>
      <button v-on:click="showLead()" class="nav-btn">Leaderboard</button>
    </nav>
    <div v-if="this.display == ''">
    <h3 style="font-weight: bold; margin: 30px;">Click the options above to view each section!</h3>
    </div>
    <div v-else-if="this.display == 'Leaderboard'">
      <Leaderboard />
    </div>
    <div v-else-if="this.display == 'PurchDash'">
      <PurchDash />
    </div>
    <div v-else-if="this.display == 'PurchHist'">
      <PurchHist />
    </div>
    <div v-else-if="this.display == 'EcoPoints'">
      <EcoPoints />
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from "./Footer.vue";
import Welcome from "./Welcome.vue";
import EcoPoints from "./ProfileDashboards/EcoPoints.vue";
import Leaderboard from "./ProfileDashboards/Leaderboard.vue";
import PurchDash from "./ProfileDashboards/PurchDash.vue";
import PurchHist from "./ProfileDashboards/PurchHist.vue";
import { fb, database } from "../firebase.js";

export default {
  data() {
    return {
      name: null,
      display: ""
    };
  },
  components: {
    Footer,
    Welcome,
    EcoPoints,
    Leaderboard,
    PurchDash,
    PurchHist
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
    redeemPoints: function() {
      this.display = "EcoPoints";
    },
    showDash: function() {
      this.display = "PurchDash";
    },
    showHist: function() {
      this.display = "PurchHist";
    },
    showLead: function() {
      this.display = "Leaderboard";
    }
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
  background: #81AF93;
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