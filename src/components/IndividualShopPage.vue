<template>
  <div>
    
    <div id="content">
      <p id="picture">
        <img id="shopImage" v-bind:src="shopInfo[0].img_url" />
      </p>
      <p id="shopTitle">{{ shopInfo[0].name }}</p>

      <div>
        <ul id="shopInfo">
          <li style="text-decoration: underline; text-align: left">Objective:</li>
          <li style="text-align: left">{{ shopInfo[0].description }}</li>
          <li style="text-decoration: underline; text-align: left">Production Materials:</li>
          <li style="text-align: left">{{ shopInfo[0].production_materials }}</li>
          <li style="text-decoration: underline; text-align: left">Contact us:</li>
          <li
            style="text-align: left"
          >Contact us at {{ shopInfo[0].contact }} or {{ shopInfo[0].email }}</li>
        </ul>
      </div>

      <span id="productHeader">Products:</span>

      <ul id="productList">
        <li id="pdt" v-for="product in products" :key="product[0]">
          <img 
            v-bind:id="product[0]"
            width="250px"
            height="250px"
            v-bind:src="product[1].img_url"
            v-on:click="route($event)" />
          <br />
          <span id="productName">
            {{ product[1].name }}
            <likeBtn v-bind:id="product[0]"></likeBtn>
          </span>

          
          <span id="productPrice">${{ product[1].price }}</span>         
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
          <span id="productPoints">
            <span id="leafIcon">
              <i class="fa fa-leaf"></i>
            </span>
            {{ product[1].points }} points
          </span>    
        </li>
      </ul>
    </div>
    <Footer/>
  </div>
</template>

<script>
import { fb, database } from "../firebase";
import LikeButton from "./LikeButton.vue";
import Footer from "./Footer.vue";
export default {
  data() {
    return {
      shopInfo: [],
      products: [],
      likedProducts: [],
      userid: fb.auth().currentUser.uid, 
      company_name: this.id, //took from userHome
    };
  },
  props: {
    id: {
      type: String,
    }   
  },
  components: {
    likeBtn: LikeButton,
    Footer,
  },
  methods: {
    fetchItems: function() {
      database
        .collection("companies")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            if (this.company_name === doc.data().name) {
              this.shopInfo.push(doc.data()); 
            }
          });
        });
      database
        .collection("products")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            if (this.company_name === doc.data().company_name) {
              this.products.push([doc.id, doc.data()]);
            }
          });
        });
    },
    route: function(event) {
      let product_id = event.target.getAttribute("id");
      this.$router.push({ name: "ipp", params: { id: product_id } });
    }
  },
  created() {
    this.fetchItems();
  }
};
</script>

<style scoped>
#content {
  position: relative;
  background: #d8e2dc;
  width: 100%;
  height: 1500px;
  left: 0px;
}
#picture {
  width: 55%;
  height: 35%;
  left: 5%;
  top: 3%;
  border: 5px solid #688a75;
  box-sizing: border-box;
  position: absolute;
}
#shopImage {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 5%;
  top: 10%;
}
#shopTitle {
  position: absolute;
  left: 65%;
  top: 2%;
  font-family: EB Garamond;
  font-style: normal;
  font-weight: 500;
  font-size: 48px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #00565e;
}
#shopInfo {
  position: absolute;
  left: 65%;
  top: 8%;
  font-family: EB Garamond;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 39px;
  display: flex;
  align-items: center;
  text-align: justify;
  color: #26413c;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  align-items: center;
}
#productHeader {
  position: absolute;
  left: 4%;
  top: 45%;
  font-family: EB Garamond;
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  line-height: 52px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #00565e;
}
#pdt {
  max-width: 28%;
  min-width: 25%;
  padding-top: 5%;
  justify-content: space-evenly;
}
#productName {
  font-family: EB Garamond;
  font-style: normal;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: space-evenly;
  color: #00565e;
}
#productPrice {
  position: absolute;
  justify-content: space-evenly;
  font-family: EB Garamond;
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  color: #00565e;
}
#productList {
  position: absolute;
  top: 50%;
  margin-left: 0%;
  display: flex;
  flex-wrap: wrap; 
  list-style-type: none; 
  align-items: center;
}
li {
  padding: 10px;
}
#productPoints {
  background-color: #8ec693;
  border-radius: 20px;
  line-height: 42px;
  padding: 6px;
  color: #006d77;
  font-family: EB Garamond;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  margin-left: 50%;
}
#leafIcon {
  width: 3%;
  height: 3%;
  border: none;
}
</style>