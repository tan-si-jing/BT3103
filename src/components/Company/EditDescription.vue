<template>
  <div style="min-height: 100vh;">
  <div class="editDescription" style="margin: 100px;">    
    <div class="intro h-100">
      <div class="h-100 align-items-center">
        <h3 style="margin: 40px;">Edit Shop Page Description</h3>
      </div>
    </div>

    <div>
      <div class="container">

        <div>
            <div class="form-group">
              <label>Company Name</label>
              <input type="text" v-model="name" placeholder="Company Name" class="form-control">
            </div>
          </div>
          
          <div>
            <div class="form-group">
              <label>Profile Picture</label>
              <input type="text" v-model="img_url" placeholder="URL for profile picture" class="form-control">
            </div>
          </div>
          
          <div>
            <div class="form-group"> 
              <label>Objective</label>
              <textarea type="text"  v-model="objective" placeholder="We aim to..." class="form-control" style="height: 100px;"/>             
            </div>
          </div>

          <div>
            <div class="form-group">
              <label>Production Materials</label>
              <textarea type="text"  v-model="materials" placeholder="List the main production materials" class="form-control" style="height: 100px;"/>
            </div>
          </div>

          <div>
            <div class="form-group">
              <label>Contact Number</label>
              <input type="text" v-model="contact" placeholder="Contact Number" class="form-control">
            </div>
          </div>

          <div>
            <div class="form-group">
              <label>Email Address</label>
              <input type="text" v-model="email" placeholder="Email Address" class="form-control">
            </div>
          </div>

          <div>
            <div class="form-group" style="text-align: right;">
              <input type="submit" v-on:click="updateDescription()" value="Save Changes" class="btn btn-primary">
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
      // account: {
      //   name: null,
      //   email: null
      // },
      name: '', 
      img_url: '',
      objective:'',
      materials:'',
      contact:'',
      email:''
    }
  },
  components: {
    Footer
  },
  methods: {
    updateDescription() {
      // need to change docid to companyid

      // check every field, no need to update if empty
      if (this.name) {
        database.collection("companies").doc('1').update({name: this.name})
      }
      if (this.img_url) {
        database.collection("companies").doc('1').update({img_url: this.img_url})
      }
      if (this.objective) {
        database.collection("companies").doc('1').update({description: this.objective})
      }
      if (this.materials) {
        database.collection("companies").doc('1').update({production_materials: this.materials})
      }
      if (this.contact) {
        database.collection("companies").doc('1').update({contact: this.contact})
      }
      if (this.email) {
        database.collection("companies").doc('1').update({email: this.email})
      }
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


