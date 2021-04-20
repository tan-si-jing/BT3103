<template>
  <div>
    <Header/>
    <div id="content">
      <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
      <p id="picture">
        <img id="shopImage" v-bind:src="shopInfo[0].img_url"/>
      </p>
      <p id="shopTitle">{{ shopInfo[0].name }}</p>

      <div>
        <ul id="shopInfo">
          <li style="text-decoration: underline; text-align: left">Objective:</li>
          <li style="text-align: left">{{ shopInfo[0].description }}</li>
          <li style="text-decoration: underline; text-align: left">Production Materials:</li>
          <li style="text-align: left">{{ shopInfo[0].production_materials }}</li>
          <li style="text-decoration: underline; text-align: left">Contact us:</li> <br>
          <li style="text-align: left">Contact us at {{ shopInfo[0].contact }} or {{ shopInfo[0].email }}</li>
        </ul>
      </div>

      <span id="productHeader">Products:</span>

      <ul id="productList">
        <li id="pdt" v-for="product in products" v-bind:key="product[0]">
          <img
            v-bind:id="product[0]"
            width="250px"
            height="250px"
            :src="product[1].img_url"
            v-on:click="route($event)"
            style="cursor: pointer;"
          />
          <br />
          <span class="name" v-on:click="route($event)" v-bind:id="product[0]" style="cursor: pointer;">
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
    <Footer/>
  </div>
</template>

<script>
import { database } from "../firebase";
import Header from "./Header.vue"
import Footer from "./Footer.vue";
export default {
  data() {
    return {
      shopInfo: [],
      products: [],
      company_name: this.id, //took from Home
    };
  },
  components: {
    Footer,
    Header,
  },
  props: {
    id: {
      type: String,
    }   
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
      this.$router.push({ name: "product", params: { id: product_id } });
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
  width: 50%;
  height: 35%;
  left: 5%;
  top: 5%;
  border: 5px solid #688a75;
  box-sizing: border-box;
  position: absolute;
}
#shopImage {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 3%;
  top: 5%;
}
#shopTitle {
  position: absolute;
  left: 65%;
  top: 4%;
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
  left: 60%;
  right:4%;
  top: 10%;
  font-family: EB Garamond;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 39px;
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
  margin-top: 40px;
  text-align: center;
  font-size: 20px;
  flex-basis: 300px;
  min-width: 33.3%;
  max-width: 33.3%;
  font-family: "EB Garamond";
  font-size: 24px;
  font-weight: bold;
  color: #00565e;
}
#cost {
  margin-left: 28%;
  font-size: 25px;
  margin-top: 0px;
  font-weight: normal;
  font-family: EB Garamond;
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
#leafIcon {
  width: 3%;
  height: 3%;
  border: none;
}
#name {
  text-align: center;
  align-items: center;
  font-family: EB Garamond;
  font-size: 20px;
}
#productList {
  position: absolute;
  top: 50%;
  margin-left: 0%;
  display: flex;
  flex-wrap: wrap; 
  list-style-type: none; 
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 50px;
}
li {
  padding: 10px;
}
</style>