<template>
  <div>
    <Header/>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div id="pagebody">
      <div id="filters">
        <p id="filters-title">Filters:</p>
          <a class="nav-link dropdown-toggle active filters" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Price range
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <p style="margin-bottom: 3px;"> Minimum price </p>
          <input type="number" v-model.lazy="price.minimum" required/>
          <p style="margin-bottom: 3px;"> Maximum price </p>
          <input type="number" v-model.lazy="price.maximum" required/>
          <br/>
          <button class="filter-button" v-on:click="filterPrice"> Filter </button>
          <button class="filter-button" v-on:click="clearProducts"> Clear </button>
        </div>
        <div>
          <a class="nav-link dropdown-toggle active filters" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Shop
          </a>
          <div class="dropdown-menu" type="button" aria-labelledby="dropdownMenuButton">
            <ul id="shopList">
              <button id="shop-button" class="dropdown-item" v-on:click="clearProducts">All</button>
              <li id="shop" v-for="shop in shops" v-bind:key="shop.name">
                <button id="shop-button" class="dropdown-item" v-on:click="filterShop(shop.name)">{{shop.name}}</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="products.length > 0">
        <ul id="pdtlist">
          <li class="pdt" v-for="product in products" v-bind:key="product[0]" v-bind:id="product[0]" v-on:click="route($event)">
            <img
              v-bind:id="product[0]"
              width="250px"
              height="250px"
              :src="product[1].img_url"
              v-on:click="notLoggedIn"
              style="cursor: pointer;"
            />
            <br />
            <span class="name" style="cursor: pointer;">
              {{ product[1].name }}
            </span><br>
            <span id="cost">${{ product[1].price }}</span>
            <span id="productPoints">
              <span id="leafIcon">
                <i class="fa fa-leaf"></i>
              </span>
              {{ product[1].points }} points
            </span>
            <br />
            <br />
          </li>
        </ul>
      </div>
      <div v-else-if="show == false">
        <div id="noPdt">No products found.</div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import { database } from "../firebase";
export default {
  data() {
    return {
      products: [], //products is an array, where each element is an array -> [doc.id, doc.data()]
      originalProducts: [],
      shops: [],
      optionsAPP: ["PRICE RANGE", "SHOP"],
      //user: fb.auth().currentUser,
      //user_id: user.uid
      show: true,
      price:{
        minimum: 0,
        maximum: 0,
      },
    };
  },
  components: {
    Header,
    Footer
  },
  methods: {
    fetchProducts: function() {
      const keyword = this.$route.query.searchTerm;
      database
        .collection("products")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            if (keyword === "" || keyword == null) {
              this.products.push([doc.id, doc.data()]);
            } else {
              let pdtName = doc.data().name;
              var listOfWords = keyword.split(" ")
              for (let i = 0; i < listOfWords.length; i++) {
                var word = listOfWords[i];
                if (pdtName.toLowerCase().includes(word.toLowerCase())) {
                  this.show = true;
                } else {
                  this.show = false;
                }
              }
              if (this.show == true) {
                this.products.push([doc.id, doc.data()]);
              }
            }
          });
          this.originalProducts = this.products;
        });
    },
    fetchCompanies: function(){
      database.collection("companies").get().then((querySnapShot) => {
        querySnapShot.docs.forEach( doc => {
          let shop = doc.data();
          this.shops.push(shop)
        })
      })
    },

    route: function(event) {
      let product_id = event.target.getAttribute("id");
      this.$router.push({ name: "product", params: { id: product_id } }).then(()=>{location.reload()});
    },

    filterPrice: function(){
      this.products = this.originalProducts;
      var priceFilteredProducts = this.products.filter((product) => parseInt(product[1].price * 100)/100 >= this.price.minimum && parseInt(product[1].price * 100)/100 <= this.price.maximum);
      this.products = priceFilteredProducts;
    },

    filterShop: function(name){
      this.products = this.originalProducts;
      var shopFilteredProducts = this.products.filter((product) => product[1].company_name == name)
      this.products = shopFilteredProducts;
      console.log(this.products)
    },

    clearProducts: function(){
      this.products = this.originalProducts;
    }
  },
  created() {
    this.fetchProducts();
    this.fetchCompanies();
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

#filters {
  background-color: #81af93;
  width: 100%;
  height: 40px;
  margin-top:0px;
}

#filters-title{
 font-family:  EB Garamond;
 float: left;
 padding-left: 20px;
 font-size: 25px;
 color: white;
}

.filters{  
  color:white;
  font-family:EB Garamond;
  font-size: 17px;
  float:left;
  padding-top: 7px;
  padding-left: 25px; 
}

p{
  padding-left: 20px;
  font-family:EB Garamond;
}

input{
  margin: 5px 20px 10px;
}

.filter-button{
  margin-top: 20px;
  margin-left: 25px;
  background-color: #688A75;
  border-color: #688A75;
  font-family: 'Work Sans';
  color: white;
  border-radius: 10px;
  font-size: 15px;
  width: 80px;
  padding: 3px;
}

#shopList {
  list-style-type: none;
  font-family: EB Garamond;
  float:left;
  text-align: left;
  padding-left:0px;
  font-size: 16px;
  margin-bottom: 0px;
}

#shop{
  padding-top: 7px;
}

#shop-button:active{
  background-color: #81af93;
}

#pdtlist {
  width: 100%;
  margin: 0px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 20px 150px;
}

.pdt {
  margin-top: 30px;
  text-align: center;
  font-size: 20px;
  flex-basis: 300px;
  font-family: "EB Garamond";
  font-size: 24px;
  font-weight: bold;
  color: #00565e;
  padding: 0px 50px;
}

#cost {
  margin-left: 20%;
  font-size: 25px;
  margin-top: 0px;
  font-weight: normal;
}
#productPoints {
  background-color: #8ec693;
  border-radius: 20px;
  padding: 6px;
  color: #006d77;
  font-family: EB Garamond;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  margin-left:8%;
}

.leaf-icon {
  font-size: 20px;
  color: #006d77;
}

/* noPdt: style of page when no prdts found */
#noPdt {
  font-family: "EB Garamond";
  font-size: 32px;
  font-weight: bold;
  color: #00565e;
  text-align: center;
  padding: 5%;
}

.dropdown-menu {
  padding:20px 10px;
}
</style>
