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
              <input type="text"  v-model="name" placeholder="Name" class="form-control">             
            </div>
          </div>

          <div>
            <div class="form-group">
              <label>Price</label>
              <input type="text" v-model="price" placeholder="Eg. 5.60" class="form-control">
            </div>
          </div>

          <div>
            <div class="form-group">
              <label>Image URL</label>
              <input type="text" v-model="img_url" placeholder="Insert image URL" class="form-control">
            </div>
          </div>

          <div>
            <div class="form-group">
              <label>Description</label>
              <textarea type="text"  v-model="description" placeholder="Describe your product" class="form-control"/>
            </div>
          </div>

          <div>
            <div class="form-group">
              <label>Ingredients Specifications</label>
              <textarea type="text" v-model="ingred_spec" placeholder="Let consumers know what it is made up of!" class="form-control"/>
            </div>
          </div>

          <div>
            <div class="form-group">
              <label>Product Specifications</label>
              <input type="text" v-model="pdt_spec" placeholder="Eg. 10cm x 8cm x 5cm" class="form-control">
            </div>
          </div>

          <div>
            <div class="form-group">
              <label>Caring For Me</label>
              <input type="text" v-model="care" placeholder="Eg. Store in cool places." class="form-control">
            </div>
          </div>

           <div>
            <div class="form-group">
              <label>Carbon footprint (in grams)</label>
              <input type="text" v-model="footprint" placeholder="Carbon footprint of the product" class="form-control">
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
import {database} from '../../firebase';
import Footer from '../Footer.vue';

export default {
  data(){
    return {
      name: '',
      price: 0,
      img_url: '',
      description: '',
      ingred_spec: '',
      pdt_spec: '',
      care: '',
      footprint: 0
    }
  },
  components: {
    Footer
  },
  methods: {
    addProduct() {
      // need to change company id, assumed to be 1 for now
      // var company_id = fb.auth().currentUser;


      let product = {}
      product.name = this.name
      product.price = this.price
      product.img_url = this.img_url
      product.description = this.description
      product.ingred_spec = this.ingred_spec
      product.pdt_spec = this.pdt_spec
      product.care = this.care
      product.footprint = this.footprint

      // to calculate eco-points of product
      var points = 1/(this.footprint) * 1000
      product.points = points
        
      //product.pdt_id = pdt.id
      //product.company_id = 
      //product.company_name = 

      // adding this product to products collection
      database.collection("products").doc().set(product)




      this.$router.push({ name: "companyHome"});
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


