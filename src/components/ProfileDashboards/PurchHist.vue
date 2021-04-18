<template>
  <div id="hist">
    <h5>Thank you for these purchases which have helped to make the world a more sustainable place!</h5>
    <div id="empty" v-if="purchased.length==0">
      No items purchased yet :(
    </div>
    <ul id="itemsList">  
      <li id="item" v-for="j in purchased" :key="j.name">
        <img id="img1" v-bind:src="j.img_url" />
        <ul>
          <li id="description">{{ j.name }} x {{ j.qty }}</li>
          <li id="description">
            <img id="img2" src="https://image.flaticon.com/icons/png/128/679/679720.png" />
            {{ j.status }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { fb, database } from "../../firebase.js";

export default {
  data() {
    return {
      user_id: null,
      purchased: [],
    };
  },
  methods: {
    fetchPurchased: function() {
      this.user_id = fb.auth().currentUser.uid;
      database
        .collection("purchased")
        .where("user_id", "==", this.user_id)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            this.purchased.push(doc.data());
          });
        });
    }
  },
  created() {
    this.fetchPurchased();
  }
};
</script>

<style scoped>
#hist {
  padding-bottom: 40px;
}
#item {
  padding: 35px;
  background-color: #c1d9ca;
  margin: 30px;
  flex-grow: 1;
  flex-basis: 300px;
  border-radius:15px;
}

#itemsList {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  padding:30px;
}

#img1 {
  min-width: 170px;
  max-height: 170px;
}
#img2 {
  max-width: 15px;
}

ul {
  list-style-type: none;
  padding-bottom: 30px;
  padding-left: 0;
}

#description {
  padding: 1%;
  text-transform: capitalize;
}

#empty {
  margin: auto;
  margin-top: 50px;
  padding: 30px;
  width: 30%;
  border-radius: 20px;
  background: rgb(237, 246, 249);
  font-size: 20px;
  font-weight:bold;
}
</style>