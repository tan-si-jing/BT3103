<template>
  <div style="min-height: 100vh;">
  <div class="editDescription" style="margin: 50px 100px;">    
    <div class="intro h-100">
      <div class="h-100 align-items-center">
        <h3 style="margin: 40px;">Edit Shop Page</h3>
      </div>
    </div>

    <div>
      <div class="container">          
          <div>
            <div class="form-group">
              <label>Profile Picture</label>
              <input type="text" v-model="account.img_url" placeholder="URL for profile picture" class="form-control">
            </div>
          </div>
          
          <div>
            <div class="form-group"> 
              <label>Description</label>
              <textarea type="text"  v-model="account.description" placeholder="We aim to..." class="form-control" style="height: 100px;"/>             
            </div>
          </div>

          <div>
            <div class="form-group">
              <label>Production Materials</label>
              <textarea type="text"  v-model="account.production_materials" placeholder="List the main production materials" class="form-control" style="height: 100px;"/>
            </div>
          </div>

          <div>
            <div class="form-group">
              <label>Contact Number</label>
              <input type="text" v-model="account.contact" placeholder="Contact Number" class="form-control">
            </div>
          </div>

          <div>
            <div class="form-group">
              <label>Email Address</label>
              <input type="text" v-model="account.email" placeholder="Email Address" class="form-control">
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
import {fb, database} from '../../firebase';
import Footer from '../Footer.vue';

export default {
  data(){
    return {
      account: {
        img_url: null,
        description: null,
        production_materials: null,
        contact: null,
        email: null
      }
    }
  },
  components: {
    Footer
  },
  methods: {
    updateDescription() {
      let id = fb.auth().currentUser.uid;
      let arr = {};
      for (const key of Object.keys(this.account)) {
        console.log(this.account[key])
        if (this.account[key]) {
          arr[key] = this.account[key]
        }
      }
      database.collection("companies").doc(id).update(arr)
        .then(() => {
          alert("Updated!")
          this.$router.push("/company/home").then(() => {location.reload()});
        })
        .catch((error) => {
          alert(error);
        })
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


