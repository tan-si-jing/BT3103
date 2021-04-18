<template>
  <div id="welcome">
    <div id="greeting">Welcome back, {{ name }}!</div>
    <br />
    <div id="thanks">Joined since April 2021</div>
    <div id="thanks">
      Thank you for being part of our community to preserve our mother earth.
      We reallly appreciate your effort in doing yout part to producing sustainable and environmentally friendly products for our customers to enjoy!
    </div>
    <br />
  </div>
</template>

<script>
import { fb, database } from "../firebase.js";
export default {
  data() {
    return {
      //points: null,
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
          //this.points = doc.data().points;
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