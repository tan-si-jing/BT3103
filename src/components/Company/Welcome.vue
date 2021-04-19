<template>
  <div id="welcome">
    <div id="greeting">{{ name }}</div>
    <br />
    <div id="thanks">
      Thank you for being part of our community to preserve our Mother Earth.
      We really appreciate your effort in doing your part to produce sustainable and eco-friendly products for our customers to enjoy!
    </div>
    <br />
  </div>
</template>

<script>
import { fb, database } from "../../firebase.js";
export default {
  data() {
    return {
      //points: null,
      name: null
    };
  },
  methods: {
    fetchUserData() {
      let id = fb.auth().currentUser.uid;
      database
        .collection("companies")
        .doc(id)
        .get()
        .then(doc => {
          this.name = doc.data().name;
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
  padding: 40px;
  margin: auto;
  margin-top: 70px;
}
#greeting {
  color: #00565e;
  font-weight: bold;
  font-size: 30px;
}
#thanks {
  color: black;
  font-size: 25px;
}
</style>