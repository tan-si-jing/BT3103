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
      <div v-show="Object.keys(this.products).length>0" style="margin-top: 200px;">
      <div id="cartlist" >
        <ul id="headings">
          <li id="productheader">Product</li>
          <li>Price</li>
          <li>Quantity</li>
          <li>Total</li>
          <li>Eco Points</li>
          <br />
        </ul>
        <br />
        <ul>
          <li v-for="item in products" v-bind:key="item.id">
            <ul id="itemrow">
              <li id="itemname">
                <span id="item_span"><img id="item_img" :src="item.img" /></span
                ><br />
                <span id="item_span"
                  ><b>{{ item.name }}</b
                  ><br />
                  <a id="co2footprint"></a
                  ><span> {{ item.footprint }}g</span></span
                ><br />
                <span id="item_span"><CartRemoveBtn v-bind:pdt_id="item.id">Remove</CartRemoveBtn></span>
              </li>
              <li>${{ item.price }}</li>
              <li>{{ item.qty }}</li>
              <li>${{ (item.price * item.qty).toFixed(2) }}</li>
              <li>{{ item.qty * item.points }}</li>
            </ul>
          </li>
        </ul>
      </div>
      <div id="details">
      <span>Discount Code: <input v-model="discountcode"></span><br><br>
        <button id="view_total" v-on:click= "findTotal" >View Total</button><br><br>
        <span v-show="this.totalpoints > 0"><i class="fa fa-leaf leaf-icon"></i><b> Total ECO-Points: {{ totalpoints }}</b></span><br />
        <span v-show="this.subtotal > 0">Subtotal: ${{ subtotal }}</span><br>
        <span v-show="this.subtotal > 0">Discount: ${{ discount }}</span><br>
        <span v-show="this.subtotal > 0"><b>Grand Total: ${{ grand_total() }}</b></span><br>
      <button id="browse" v-on:click="pushBrowse()">Continue Browsing</button>
      <button v-on:click="checkViewed()" id="checkout">Check Out</button>
      </div>
    </div>
    <!-- if this.products is an empty object-->
    <div v-if="Object.keys(this.products).length == 0 && this.loading==false">
        <p id="empty-text"> Your cart is empty.</p><br>

      <!-- note: router-link to home page -->
      <router-link id="browseBtn" to="/user/home" exact>Continue Browsing</router-link>
    </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from "../Footer.vue";
import { fb, database } from "../../firebase.js";
import CartRemoveBtn from "./CartRemoveBtn.vue";
export default {
  data() {
    return {
      products: {},
      totalpoints: 0,
      discount: 0,
      discountcode: '',
      subtotal: 0,
      total_final: 0,
      cart: {},
      loading: true,
      viewTotalClicked: false,
      minusPoints: 0
    };
  },
  components: {
    Footer,
    CartRemoveBtn,
  },
  methods: {
    async retrieveCart() {
      let userid = fb.auth().currentUser.uid;
      const doc = await database.collection("cart").doc(userid).get()
      let productsObj =  {}
      if (doc.exists) {
        this.cart = doc.data();
        // once this.cart has been defined with the products in the cart, retrieve those products from database
        const snapshot = await database.collection("products").get()
        snapshot.docs.forEach( (doc) => {
            let data = doc.data();
            let pdtID = data.pdt_id;
            if (this.cart[pdtID] != null) {
              productsObj[pdtID] = {
                name: data.name,
                img: data.img_url,
                footprint: data.footprint,
                price: data.price,
                points: data.points,
                qty: this.cart[pdtID],
                id: pdtID,
              };
            }
        });
      }
      this.loading = false;
      return productsObj;
    },
    grand_total: function() {
      const amount = this.subtotal - this.discount;
      if (amount < 0) {
        this.total_final = 0;
      }
      else {
        this.total_final = amount;
      }
      return this.total_final.toFixed(2);
    },
    findTotal: async function() {
      this.subtotal = 0;
      this.totalpoints = 0;
      this.discount = 0;
      for (var key in this.products) {
        let entry = this.products[key]
        this.subtotal += entry.price * entry.qty;
        this.totalpoints += entry.points * entry.qty;
      }
      // checking for discounts
      if (this.discountcode !='') {
        let userid = fb.auth().currentUser.uid;
        const doc = await database.collection('users').doc(userid).get()
        const userPoints = doc.data().points
        if (this.discountcode == '10OFFALL' && userPoints >= 3000) {
          this.discount = this.subtotal*0.1
          this.discount = this.discount.toFixed(2)
          this.minusPoints = 3000
        }
        else if (this.discountcode == '5OFFALL' && userPoints >= 2500) {
          this.discount = this.subtotal*0.05
          this.minusPoints = 2500
        }
        else if (this.discountcode == '$10OFF' && userPoints >= 1500) {
          this.discount = 10
          this.minusPoints = 1500
        }
        else if (this.discountcode == '$15OFF' && userPoints >= 2000) {
          this.discount = 15
          this.minusPoints = 2000
        }
        else if (this.discountcode == '$20OFF' && userPoints >= 2500) {
          this.discount = 20
          this.minusPoints = 250
        }
        else {
          alert('Insufficient Points/Invalid Discount Code')
        }
      }
      this.subtotal = this.subtotal.toFixed(2)
      this.viewTotalClicked = true;
    },
    checkViewed: function() {
      if (!(this.viewTotalClicked)) {
        alert("Please view total before proceeding.");
      }
      else {
        this.$router.push({ name: 'cartshipping', params: {products: this.products, total: this.total_final, totalpoints: this.totalpoints, minusPoints: this.minusPoints }})
      }
    },
    pushBrowse() {
      this.$router.push({path: '/user/products'})
    }
  },
  created() {
    this.retrieveCart().then((productsObj) => {this.products = productsObj})
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
  border:3px solid black;
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
  background: #91ccc6;
  border-radius: 50%;
  text-align: center;
  line-height: 70px;
  vertical-align: middle;
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
  background-color: whitesmoke;
  border-radius: 25px;
}
#headings {
  display: flex;
  list-style-type: none;
  border-bottom: 1px solid black;
  padding: 2%;
  margin-bottom: 0px;
  font-weight: bold;
}
#itemrow {
  display: flex;
  list-style-type: none;
  padding: 10px;
}
ul {
  list-style-type: none;
  padding: 30px;
}
li {
  flex: 1.5;
  text-align: center;
}
#productheader {
  flex: 6;
  text-align: center;
}
#itemname {
  flex: 6;
  text-align: center;
  display: flex;
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
  width: 80px;
  height: 80px;
}
#item_span {
  flex-basis: 200px;
  text-align: left;
}
#view_total {
  font-family: "Garamond";
  font-size: 15px;
  background-color: #688a75;
  border-color: #688a75;
  color: white;
  border-radius: 5px;
  padding: 5px;
}
#checkout {
  font-family: "Garamond";
  font-size: 15px;
  background-color: #688a75;
  border-color: #688a75;
  color: white;
  border-radius: 5px;
  padding: 7px;
}
#browse {
  font-family: "Garamond";
  font-size: 15px;
  background-color: #688a75;
  border-color: #688a75;
  color: white;
  border-radius: 5px;
  padding: 7px;
  margin: 20px 20px 40px;
}
/* the following are for an empty cart */
#empty-text {
  align-content: center;
  font-family: "Garamond";
  font-size: 25px;
  font-weight: bold;
  color: #000000;
  text-align: center;
}
#browseBtn {
  font-family: "Garamond";
  font-size: 22px;
  color: white;
  background: #006d77;
  text-decoration: none;
  border-radius: 5px;
  padding: 8px;
}
</style>