<template>
  <div id="welcome">
    <div id="greeting">Welcome back, {{ name }}!</div>
    <br>
    <div id="thanks">Thank you for being a part of our community to preserve our mother Earth.</div>
    <br>
    <div id="points">
      You have {{points}} EcoPoints
      <img
        id="icon"
        src="https://image.flaticon.com/icons/png/128/53/53775.png"
      />
    </div>
  </div>
</template>

<script>
import { fb, database } from "../firebase.js";
export default {
  data() {
    return {
      points: null,
      name: null
    };
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
          this.points = doc.data().points;
        });
    }
  },
  created() {
    this.fetchUserData();
  }
};
</script>

<style scoped>
#welcome {
  background: #81af93;
  border-radius: 25px;
  font-family: "EB Garamond";
  padding: 30px;
}
#hello {
  color: black;
  font-weight: bold;
  font-size: 24px;
}
#greeting {
  color: #00565e;
  font-weight: bold;
  font-size: 30px;
}
#thanks {
  color: #00565e;
  font-size: 20px;
}
#points {
  color: black;
  font-weight: bold;
  font-size: 30px;
}
#icon {
  max-width: 30px;
}
</style>