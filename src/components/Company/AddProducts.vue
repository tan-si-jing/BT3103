<template>
  <div style="min-height: 100vh;">
  <div class="editDescription" style="margin: 100px;">    
    <div class="intro h-100">
      <div class="h-100 align-items-center">
        <h3 style="margin: 40px;">Add Product Details</h3>
      </div>
    </div>

    <div>
      <div class="container">

          <div>
            <div class="form-group"> 
              <label>Product Name</label>
              <input type="text"  v-model="product.name" placeholder="Name" class="form-control">             
            </div>
          </div>

          <div>
            <div class="form-group">
              <label>Price</label>
              <input type="text" v-model="product.price" placeholder="Eg. 5.60" class="form-control">
            </div>
          </div>

          <div>
            <div class="form-group">
              <label>Image URL</label>
              <input type="text" v-model="product.img_url" placeholder="Insert image URL" class="form-control">
            </div>
          </div>

          <div>
            <div class="form-group">
              <label>Description</label>
              <textarea type="text"  v-model="product.description" placeholder="Describe your product" class="form-control"/>
            </div>
          </div>

          <div>
            <div class="form-group">
              <label>Ingredients Specifications</label>
              <textarea type="text" v-model="product.ingred_spec" placeholder="Let consumers know what it is made up of!" class="form-control"/>
            </div>
          </div>

          <div>
            <div class="form-group">
              <label>Product Specifications</label>
              <input type="text" v-model="product.pdt_spec" placeholder="Eg. 10cm x 8cm x 5cm" class="form-control">
            </div>
          </div>

          <div>
            <div class="form-group">
              <label>Caring For Me</label>
              <input type="text" v-model="product.care" placeholder="Eg. Store in cool places." class="form-control">
            </div>
          </div>

           <div>
            <div class="form-group">
              <label>Carbon footprint (in grams)</label>
              <input type="text" v-model="product.footprint" placeholder="Carbon footprint of the product" class="form-control">
            </div>
          </div>

          <div>
            <div class="form-group" style="text-align: right;">
              <input type="submit" v-on:click="addProduct()" value="Save Changes" class="btn btn-primary">
            </div>
          </div>
         
        </div>
      </div> 

    </div>
    <Footer/>         
    </div>
</template>

<script>
import {fb, database} from '../../firebase';
import Footer from '../Footer.vue';

export default {
  data(){
    return {
      product: {
        name: null,
        price: null,
        img_url: null,
        description: null,
        ingred_spec: null,
        pdt_spec: null,
        care: null,
        footprint: null,
        points: null,
        company_id: null,
        company_name: null
      }
    }
  },
  components: {
    Footer
  },
  methods: {
    addProduct() {
      let empty = []
      for (const field in Object.keys(this.product)) {
        if (field !== "company_name" || field !== "company_id") {
          if (this.product[field] === null) {
            empty.push(this.product[field])
          }
        }
      }
      
      if (empty.length != 0) {
        alert("Please fill in all fields!")
      } else {
        var id = fb.auth().currentUser.uid;
        database.collection("companies").doc(id).get()
        .then((doc)=>{
          this.product.company_id = doc.data().company_id
          this.product.company_name = doc.data().name
          this.product.points = parseInt(1/parseInt(this.product.footprint)*1000)
          database.collection("products").add(this.product)
          .then(() => {
            alert("Product added!")
            this.$router.push("/company/home").then(() => {location.reload()});
          })
          .catch((error)=> {
            alert(error)
          })
        })
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  padding-bottom: 15px;
}

.btn-primary {
  background-color: #688A75;
  border-color: #688A75;
  font-family: 'Work Sans';
  color: white;
}

.btn-primary:hover {
  background-color: #516e5c;
  border-color: #516e5c;
}

label {
  float: left;
}
</style>


