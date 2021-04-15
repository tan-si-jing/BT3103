<template>
  <span>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <Button
      v-bind:class="{ clicked: isClicked, unclicked: !isClicked }"
      v-on:click="
        toggleLike();
        onChange();
      "
    >
      <i class="fa fa-heart"></i>
    </Button>
  </span>
</template>

<script>
import { fb, database } from "../firebase";
import firebase from "firebase/app";
export default {
  data() {
    return {
      userid: null,
      isClicked: this.liked.includes(this.id)
    };
  },
  methods: {
    toggleLike: function () {
      this.isClicked = !this.isClicked;
    },
    onChange: function () {
      this.userid = fb.auth().currentUser.uid;
      if (this.isClicked) {

        database
          .collection("users")
          .doc(this.userid)
          .update({
            liked: firebase.firestore.FieldValue.arrayUnion(this.id),
          });
      } else {
        database
          .collection("users")
          .doc(this.userid)
          .update({
            liked: firebase.firestore.FieldValue.arrayRemove(this.id),
          });
      }
    }
  },
  props: {
    id: String,
    liked: Array
  }
};
</script>

<style scoped>
.clicked {
  width: 40px;
  height: 40px;
  border: none;
  background-color: #d8e2dc;
  color: red;
}

.unclicked {
  width: 40px;
  height: 40px;
  border: none;
  background-color: #d8e2dc;
  color: white;
}
</style>