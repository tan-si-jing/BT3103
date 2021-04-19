<template>
  <div id="hist">
    <h5>
      This section contains details regarding the carbon footprint of the items
      that you have purchased.
    </h5>
    <div id="empty" v-if="purchased.length == 0">
      No items purchased yet :(
    </div>
    <div v-else style="display: flex; justify-content: space-evenly;">
      <div class="card">
        <h5 style="font-weight:bold;">Product with lowest footprint</h5>
        <img id="img1" :src="this.purchased[0].img_url" />
        <div id="pdtname">{{ this.purchased[0].name }}</div>
        <div>
          <span id="co2footprint"></span>
          {{ this.purchased[0].footprint }} g
        </div>
      </div>
      <div class="card">
        <h5 style="font-weight:bold;">Product with highest footprint</h5>
        <img
          id="img1"
          :src="this.purchased[this.purchased.length - 1].img_url"
        />
        <div id="pdtname">
          {{ this.purchased[this.purchased.length - 1].name }}
        </div>
        <div>
          <span id="co2footprint"></span>
          {{ this.purchased[this.purchased.length - 1].footprint }} g
        </div>
      </div>
    </div>
    <div id="chart">
      <bar-chart
        v-if="loaded"
        v-bind:chartData="chartData"
        v-bind:options="options"
      ></bar-chart>
    </div>
  </div>
</template>

<script>
import { fb, database } from "../../firebase.js";
import BarChart from "./PurchDash.js";

export default {
  components: {
    BarChart,
  },
  props: {
    chartData: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
    loaded: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      user_id: null,
      purchased: [],
    };
  },
  methods: {
    fetchPurchased: async function() {
      this.user_id = fb.auth().currentUser.uid;
      await database
        .collection("purchased")
        .where("user_id", "==", this.user_id)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.purchased.push(doc.data());
          });
        });
      this.purchased.sort((a, b) => (a.footprint > b.footprint ? 1 : -1));
    },
  },
  created() {
    this.fetchPurchased();
  },
};
</script>

<style scoped>
#hist {
  padding-bottom: 40px;
}
#item {
  padding-bottom: 20px;
  padding-top: 10px;
}
#img1 {
  width: 200px;
  height: 200px;
  align-self: center;
}

ul {
  list-style-type: none;
}

.card {
  padding: 30px;
  margin: 30px;
  background: #c1d9ca;
  border-radius: 15px;
}

h5 {
  padding: 10px;
}

#pdtname {
  padding: 2%;
}

#chart {
  width: 80%;
  margin: auto;
}

#empty {
  margin: auto;
  margin-top: 50px;
  padding: 30px;
  width: 30%;
  border-radius: 20px;
  background: rgb(237, 246, 249);
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 50px;
}

#co2footprint {
  content: url("https://api.iconify.design/iwwa:co2.svg?height=30");
  vertical-align: -0.45em;
}
</style>
