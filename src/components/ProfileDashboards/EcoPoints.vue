<template>
  <div id="eco">
    <ul id="itemsList">
      <li id="listitem" v-for="i in rewards" :key="i.name">
        <b style="font-size:20px;">{{i.name}}</b>
        <br>
        Points needed: {{i.points}}
        <br>
        Code to redeem: {{i.code}}
      </li>
    </ul>
  </div>
</template>

<script>
import { database } from "../../firebase.js";

export default {
  data() {
    return {
      rewards: []
    };
  },
  methods: {
    fetchRewards: function() {
      database
        .collection("rewards")
        .orderBy("name")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            this.rewards.push(doc.data());
          });
        });
    }
  },
  created() {
    this.fetchRewards();
  }
};
</script>

<style>
#eco {
  margin-bottom: 1px;
}
#listitem {
  padding: 35px 10px;
  background-color: #c1d9ca;
  margin: 15px 15px;
  flex-grow: 1;
  flex-basis: 300px;
  border-radius:10px;
}
#itemsList {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  margin-bottom: 30px;
  padding-left: 0;
  width: 80%
}
</style>