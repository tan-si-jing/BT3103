<template>
  <div>
    <div id="pagebody">
      <div>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <span>
          <hr />
          <i class="fa fa-shopping-cart fa-5x cart-icon"></i>
          <i class="fa fa-credit-card-alt fa-5x card-icon"></i>
          <i class="fa fa-check fa-5x tick-icon"></i>
        </span>
      </div>
      <div id="cartlist">
        <ul id="headings">
          <li id="shipping"> <b>Shipping Address: </b></li>
          <li><b>Purchases:</b></li>
          <br />
        </ul>
        <br />
        <div id="content" >
        <ul id="left">
          <li><input placeholder="Full Name"></li><br>
          <li><input placeholder="Address" height="80px"></li><br>
          <li><input placeholder="Country"></li><br>
          <li><input placeholder="City"></li><br>
          <li><input placeholder="Postal Code"></li><br>
          <li><input placeholder="Contact No."></li>
        </ul>
        <ul id="right">
          <li id="rightLI" v-for= "item in products" v-bind:key="item.id">
            <span id="item_span"><img id="item_img" :src="item.img" /></span><br />
            <span id="item_span_middle"><b>{{ item.name }} (x {{ item.qty}})</b><br />
            <a id="co2footprint"></a><span> {{ item.footprint }}g</span></span><br />
            <span id="item_span"> ${{item.price*item.qty}}</span><br />
          </li><br><br>
        </ul>
        </div>
      </div>
      <div id="details">
        <span><i class="fa fa-leaf leaf-icon"></i> Total ECO-Points: {{ totalpoints }}</span><br />
        <span>Total: ${{ total }}</span><br>
      </div>
      <div>
      <button id="payment" v-on:click="route()">Proceed to Pay</button>
      <router-link id="update" to="/user/cartitems" exact>Update Cart</router-link>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from "../Footer.vue";
// import { fb, database } from "../../firebase.js";

export default {
  data() {
    return {
      // total: 50,
      // points: 606
    };
  },
  components: {
    Footer
  },
  props: {
    products: {
      type: Object
    },
    total: {
      type: Number
    },
    totalpoints: {
      type: Number
    }
  },
  methods: {
    route: function() {
      this.$router.push({ name: "cartpayment", params: {total: this.total, totalpoints: this.totalpoints}});
    }
  }
};
</script>

<style scoped>
#pagebody {
  background-color: #d8e2dc;
  width: 100%;
  min-height: 800px;
  position: relative;
}

.cart-icon {
  position: absolute;
  font-size: 40px;
  width: 70px;
  height: 70px;
  background: #67a9a2;
  border-radius: 50%;
  text-align: center;
  line-height: 70px;
  vertical-align: middle;
  align-content: center;

  left: 25%;
  top: 14%;
}

hr {
  position: absolute;
  width: 47%;
  height: 0px;
  border-top: 2px dashed #006d77;

  top: 16%;
  left: 28%;
}

.card-icon {
  position: absolute;
  font-size: 35px;
  width: 70px;
  height: 70px;
  background: #67a9a2;
  border-radius: 50%;
  text-align: center;
  line-height: 70px;
  vertical-align: middle;

  left: 46%;
  top: 14%;
}

.tick-icon {
  position: absolute;
  font-size: 40px;
  width: 70px;
  height: 70px;
  background: #91ccc6;
  border-radius: 50%;
  text-align: center;
  line-height: 70px;
  vertical-align: middle;

  left: 71%;
  top: 14%;
}

.leaf-icon {
  font-size: 20px;
  color: #006d77;
}

#cartlist {
  width: 65%;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  max-height: 350px;
  background-color: whitesmoke;
  border-radius: 25px;
  position: relative;
  float: left;
  margin-top: 14%;
  margin-left: 18%;
  overflow-y: scroll;
  padding-right: 0.5%;
}

#headings, #content {
  display: flex;
  list-style-type: none;
  padding: 1%;
  font-family: 'EB Garamond';
  font-size: 20px;
}

#left {
  float: left;
  flex: 1;
}

#right {
  float: right;
  flex: 1;
}

ul {
  list-style-type: none;
}

li {
  flex: 0.9;
  text-align: center;
}

#shipping {
  flex: 1.1;
  text-align: center;
  margin-right: 10%;
}

input {
  width: 70%;
}

#co2footprint {
  content: url("https://api.iconify.design/iwwa:co2.svg?height=30");
  vertical-align: -0.5em;
}

#details {
  margin-top: 1%;
  position: relative;
  float: right;
  margin-right: 18%;
}

#item_img {
  width: 60px;
  height: 60px;
}

#rightLI {
  display: flex;
}

#item_span {
  flex: 0.5;
  font-size: 15px;
}

#item_span_middle {
  flex: 1;
  font-size: 15px;
}

#payment {
  font-family: "Garamond";
  font-size: 15px;
  background-color: #688a75;
  border-color: #688a75;
  color: white;
  border-radius: 5px;
  padding: 7px;
  margin-top: 5%;
  position: relative;
  float: right;
  margin-right: -12%;
}

#update {
  font-family: "Garamond";
  font-size: 15px;
  background-color: #688a75;
  border-color: #688a75;
  color: white;
  border-radius: 5px;
  padding: 9px;
  margin-top: 5%;
  position: relative;
  float: right;
  margin-right: -4%;
}
</style>