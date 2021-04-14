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

      <div>
        <p id="message">Payment Complete!</p>
        <span>
          <i class="fa fa-leaf fa-5x leaf-icon"></i>
          <span id="ecoPoints">
            Total Eco-points earned: {{ getPoints() }}
          </span>
        </span>
      </div>

      <!-- note: router-link to home page -->
      <router-link id="browseBtn" to="/user/home" exact>Continue Browsing</router-link>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from "../Footer.vue";
export default {
  data() {
    return {
    };
  },
  components: {
    Footer
  },
  methods: {
    getPoints: function() {
      return this.$route.params.points;    
    },
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
  width: 45%;
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
  background: #67a9a2;
  border-radius: 50%;
  text-align: center;
  line-height: 70px;
  vertical-align: middle;
  left: 71%;
  top: 14%;
}
#message {
  position: absolute;
  top: 28%;
  left: 40%;
  font-family: "Garamond";
  font-size: 40px;
  font-weight: bold;
  color: #000000;
  text-align: center;
  font-variant: small-caps;
}
.leaf-icon {
  position: absolute;
  font-size: 30px;
  top: 43%;
  left: 38%; 
  color: #006d77;
}
#ecoPoints {
  position: absolute;
  top: 43%;
  left: 40%;
  font-family: "Garamond";
  font-size: 25px;
  font-weight: bold;
  color: #000000;
  text-align: center;
}
#browseBtn {
  position: absolute;
  top: 52%;
  left: 43%;
  font-family: "Garamond";
  font-size: 22px;
  color: white;
  background: #688a75;
  border-color: #688a75;
  text-decoration: none;
  border-radius: 5px;
  padding: 8px;
}
</style>