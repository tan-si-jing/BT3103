<template>
  <div id="lead">
    <button v-on:click="getCurrentStanding()">Get Your Current Position</button>
    <ol>
      <li v-for="j in users" :key="j[0]">{{j[0]}}: {{j[1]}} Points</li>
    </ol>
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import { fb, database } from "../../firebase.js";

export default {
  data() {
    return {
      user_id: null,
      users: [],
      position: 0,
      usrArr: []
    };
  },
  methods: {
    fetchUserData: function() {
      this.user_id = fb.auth().currentUser.uid;
    },
    fetchUsers: function() {
      database
        .collection("users")
        .orderBy("points", "desc")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            this.users.push([doc.data().name, doc.data().points, doc.id]);
          });
        });
      //var usrArr = [];
    },
    getUserArray: async function() {
      await database
        .collection("users")
        .doc(this.user_id)
        .get()
        .then(snapshot => {
          this.usrArr = [
            snapshot.data().name,
            snapshot.data().points,
            this.user_id
          ];
        });
      console.log(this.usrArr);
      this.position = this.users.indexOf(this.usrArr) + 2;
    },
    getCurrentStanding: function() {
      alert("Your current rank is: " + this.position);
    }
  },
  async created() {
    await this.fetchUserData();
    await this.fetchUsers();
    this.getUserArray();
  }
};
</script>

<style scoped>
#lead {
  padding-bottom: 17px;
}
ol {
  padding: 50px 30%;
}
li {
  background-color: rgb(237, 246, 249);
  border-radius: 10px;
  margin: 15px;
  padding:15px;
}
button {
  background-color: #c1d9ca;
  width: 250px;
  border-radius:10px;
  padding:10px;
}
</style>