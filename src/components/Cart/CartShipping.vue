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
          <li><input v-model="full_name" placeholder="Full Name"></li><br>
          <li><input v-model="address" placeholder="Address" height="80px"></li><br>
          <li><input v-model="country" placeholder="Country"></li><br>
          <li><input v-model="city" placeholder="City"></li><br>
          <li><input v-model="postal_code" placeholder="Postal Code"></li><br>
          <li><input v-model="contact" placeholder="Contact No."></li>
        </ul>
        <ul id="right">
          <li id="rightLI" v-for= "item in products" v-bind:key="item.id">
            <span id="item_span"><img id="item_img" :src="item.img" /></span><br />
            <span id="item_span_middle"><b>{{ item.name }} (x {{ item.qty}})</b><br />
            <a id="co2footprint"></a><span> {{ item.footprint }}g</span></span><br />
            <span id="item_span"> ${{(item.price*item.qty).toFixed(2)}}</span><br />
          </li><br><br>
        </ul>
        </div>
      </div>
      <div id="details">
        <b><i class="fa fa-leaf leaf-icon"></i> Total Eco points: {{ totalpoints }}</b><br />
        <b>Total: ${{ total.toFixed(2) }}</b><br>
        <router-link id="update" to="/user/cartitems" exact>Update Cart</router-link>
        <button id="payment" v-on:click="route()">Proceed to Pay</button>
      </div>
    </div>
    <Footer/>
  </div>
</template>


<script>
import Footer from "../Footer.vue";
//import { fb, database } from "../../firebase.js";

export default {
  data() {
    return {
      full_name: '',
      address: '',
      country: '',
      city: '',
      postal_code: '',
      contact: ''
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
    },
    minusPoints: {
      type: Number
    }
  },
  methods: {
    route: function() {
      // checking if any input fields are empty before proceeding to payment page
      if (this.full_name == '' || this.address == '' || this.country == '' || this.city == '' || this.postal_code == '' || this.contact == '') {
        alert("Fill in all details before proceeding.");
      }
      else {
      this.$router.push({ name: "cartpayment", params: {products: this.products, total: this.total, totalpoints: this.totalpoints, minusPoints: this.minusPoints}});
      }
    }
  }
};
</script>

<style scoped>
#pagebody {
  background-color: #d8e2dc;
  width: 100%;
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
  top: 20%;
}

hr {
  position: absolute;
  width: 47%;
  height: 0px;
  border-top: 2px dashed #006d77;
  top: 22%;
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
  border: 3px solid black;
  left: 48%;
  top: 20%;
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
  top: 20%;
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
  margin-top: 200px;
  margin-bottom: 30px;
  background-color: whitesmoke;
  border-radius: 25px;
}

#headings {
  display: flex;
  list-style-type: none;
  font-family: 'EB Garamond';
  font-size: 20px;
  margin-bottom: 0px;
  padding-left: 0px;
  padding-top: 30px;
}

#content {
  display: flex;
  list-style-type: none;
  padding: 0px 20px 30px;
  font-family: 'EB Garamond';
  font-size: 20px;
}

#left {
  float: left;
  flex: 1;
  padding: 0;
}

#right {
  float: right;
  flex: 1;
  padding: 0;
}

ul {
  list-style-type: none;
}

li {
  flex: 0.9;
  text-align: center;
}

#shipping {
  flex: 1;
  text-align: center;
}

input {
  width: 70%;
}

#co2footprint {
  content: url("https://api.iconify.design/iwwa:co2.svg?height=30");
  vertical-align: -0.5em;
}

#details {
  text-align: end;
  width:80%;
}

#item_img {
  width: 60px;
  height: 60px;
}

#rightLI {
  display: flex;
  padding: 0px 0px 10px;
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
  margin: 20px 0px 40px;
}

#update {
  font-family: "Garamond";
  font-size: 15px;
  background-color: #688a75;
  border-color: #688a75;
  color: white;
  border-radius: 5px;
  padding: 12px;
  margin:20px;
}
</style>