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
      <PurchDash v-bind:chartData="chartData" v-bind:options="options" v-bind:loaded="loaded"> </PurchDash>
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
      display: "",
      loaded: false,
      chartData: null,
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: "Footprint of Products Purchased",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
              },
            },
          ],
        },
        responsive: true,
        maintainAspectRatio: false,
      }
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
    fetchItems: function() {
      let datacollection = {
        labels: [],
        datasets: [
          {
            label: "Footprint of Products Purchased",
            backgroundColor: [
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
              "#2c3e50",
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
              "#2c3e50",
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
              "#2c3e50",
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
              "#2c3e50",
            ],
            data: [],
          },
        ],
      }
      var user_id = "";
      user_id = fb.auth().currentUser.uid;
      database
        .collection("purchased")
        .where("user_id", "==", user_id)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            var pName = doc.data().name;
            var pFootprint = doc.data().footprint;
            if (!datacollection.labels.includes(pName)) {
              datacollection.labels.push(pName);
              datacollection.datasets[0].data.push(pFootprint);
            }
          });
        });
      return datacollection;
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
  async mounted () {
    this.loaded = false
    try {
      const datacollection = await this.fetchItems();
      this.chartData = datacollection
      this.loaded = true
    } catch (e) {
      console.error(e)
    }
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