<template>
  <div>
    <div id="content">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <p id="picture">
        <img id="shopImage" v-bind:src="shopInfo.img_url" />
      </p>
      <p id="shopTitle">{{ shopInfo.name }}</p>

      <div>
        <ul id="shopInfo">
          <li style="text-decoration: underline; text-align: left">Objective:</li>
          <li style="text-align: left">{{ shopInfo.description }}</li>
          <li style="text-decoration: underline; text-align: left">Production Materials:</li>
          <li style="text-align: left">{{ shopInfo.production_materials }}</li>
          <li style="text-decoration: underline; text-align: left">Contact us:</li>
          <li style="text-align: left">Contact us at {{ shopInfo.contact }} or {{ shopInfo.email }}</li>
          <li>
            <button id="editShop" v-on:click="routeEditDesc()">Edit Description</button>
          </li>
        </ul>
      </div>

      <div id="productHeader">
        <div class="inner">Products:</div>
        <div class="inner">
          <button id="addPdt" v-on:click="routeAddPdt()">Add Products</button>
        </div>
      </div>

      <ul id="productList">
        <li id="pdt" v-for="product in products" v-bind:key="product[0]">
          <img
            v-bind:id="product[0]"
            width="250px"
            height="250px"
            :src="product[1].img_url"
            style="cursor: pointer;"
          />
          <br />
          <span id="name">{{ product[1].name }}</span>
          <br />
          <span id="cost">${{ product[1].price }}</span>
          <span id="productPoints">
            <span id="leafIcon">
              <i class="fa fa-leaf"></i>
            </span>
            {{ product[1].points }} points
          </span>
          <br />
          <br />
          <div id="outer">
            <div class="inner" style="padding-right: 5%">
              <button class="edit" v-on:click="routeEditPdt($event)" v-bind:id="product[0]">Edit</button>
            </div>
            <div class="inner">
              <remove-btn v-bind:id="product[0]" />
            </div>
          </div>
        </li>
      </ul>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "../Footer.vue";
import { fb, database } from "../../firebase";
import RemoveBtn from "./RemoveBtn.vue";

export default {
  data() {
    return {
      shopInfo: [],
      products: []
    };
  },
  components: {
    Footer,
    RemoveBtn
  },
  methods: {
    fetchItems: function() {
      database
        .collection("companies")
        .doc(fb.auth().currentUser.uid)
        .get()
        .then(doc => {
          this.shopInfo = doc.data();
          database
            .collection("products")
            .get()
            .then(snapshot => {
              snapshot.docs.forEach(doc => {
                if (doc.data().company_id == this.shopInfo.company_id) {
                  this.products.push([doc.id, doc.data()]);
                }
              });
            });
        });
    },
    routeEditDesc: function() {
      this.$router.push("/company/editDescription");
    },
    routeEditPdt: function(event) {
      let doc_id = event.target.getAttribute("id");
      this.$router.push({ name: "editProducts", params: { doc_id: doc_id } });
    },
    routeAddPdt: function() {
      this.$router.push("/company/addProducts");
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
  height: 2000px;
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
  top: 10%;
  font-family: EB Garamond;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
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
  width: 100%;
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
  margin-left: 8%;
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

#editShop {
  border-radius: 10px;
  color: white;
  background-color: #688a75;
  border-color: #688a75;
}
#addPdt {
  border-radius: 10px;
  color: white;
  background-color: #688a75;
  border-color: #688a75;
  font-size: 24px;
  font-family: EB Garamond;
  margin-left: 5%;
  width: 160px;
  line-height: 35px;
  padding: 0%;
  text-align: center;
  vertical-align: middle;
}
.edit {
  color: white;
  background-color: #688a75;
  border-color: #688a75;
  border-radius: 10px;
}
#outer {
  width: 100%;
  text-align: center;
}
.inner {
  display: inline-block;
}
</style>
