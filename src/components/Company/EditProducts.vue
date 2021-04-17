<template>
  <div style="min-height: 100vh;">
  <div class="editDescription" style="margin: 100px;">    
    <div class="intro h-100">
      <div class="h-100 align-items-center">
        <h3 style="margin: 40px;">Edit Product Details</h3>
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
            <div class="form-group" style="text-align: right;">
              <input type="submit" v-on:click="updateDetails()" value="Save Changes" class="btn btn-primary">
            </div>
          </div>

        </div>
      </div> 

    </div>
    <Footer/>         
    </div>
</template>

<script>
import { database } from '../../firebase';
// import {fb, database} from '../firebase';
import Footer from '../Footer.vue';

export default {
  data(){
    return {
      name: '',
      price: 0,
      description: '',
      ingred_spec: '',
      pdt_spec: '',
      care: '',
      updateProduct: {}
    }
  },
  props: {
    doc_id: {
      type: String
    }
  },
  components: {
    Footer
  },
  methods: {
    updateDetails() {
      database.collection("products").doc(this.doc_id).get().then((doc) => {this.updateProduct = doc.data()})
      if (this.name) {
        this.updateProduct.name = this.name;
      }
      if (this.price) {
        this.updateProduct.price = this.price;
      }
      if (this.description) {
        this.updateProduct.description = this.description;
      }
      if (this.ingred_spec) {
        this.updateProduct.ingred_spec = this.ingred_spec;
      }
      if (this.pdt_spec) {
        this.updateProduct.pdt_spec = this.pdt_spec;
      }
      if (this.care) {
        this.updateProduct.care = this.care;
      }
      database.collection("products").doc(this.doc_id).set(this.updateProduct)
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


