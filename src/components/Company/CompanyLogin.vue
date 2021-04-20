<template>
    <div>
    <Header/>
    <div class="login">                                    
        <h5 class="text-center">Login</h5>
        <div class="form-group">
            <label for="inputEmail">Enter company's email address</label>
            <b-input-group>
            <b-input-group-prepend is-text><b-icon icon="envelope"></b-icon></b-input-group-prepend>
            <b-form-input type="email" v-model="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Email"></b-form-input>
            </b-input-group>
        </div>
        <div class="form-group">
            <label for="inputPassword">Enter password</label>
            <b-input-group>
            <b-input-group-prepend is-text><b-icon icon="lock"></b-icon></b-input-group-prepend>
            <b-form-input type="password" v-model="password" class="form-control" id="inputPassword" placeholder="Password"></b-form-input>
            </b-input-group>
        </div>
        <br>
        <div class="form-group" style="text-align:center;">
            <button class="btn btn-primary" v-on:click="login">Log In</button>
        </div>
    </div>
    <Footer/>
    </div>
</template>

<script>
import Header from '../Header.vue'
import Footer from '../Footer.vue'
import {fb , database} from '../../firebase'
export default {
  name: "Login",
  data(){
      return {
          name:null,
          email:null,
          password:null
      }
  },
  components: {
      Header,
      Footer
  },
  methods:{
      login(){
          if (this.email == null || this.password == null) {
            alert("Please fill in all fields!")
          } else {
            fb.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    database.collection("companies").doc(fb.auth().currentUser.uid).get()
                    .then((docSnapshot) => {
                        if (docSnapshot.exists) {
                            this.$router.replace('company/home').then(() => location.reload());  
                        } else {
                            this.$router.replace('user/home').then(() => location.reload());
                        }
                    });
                })
                .catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        alert('Wrong password.');
                    } else {
                        alert(errorMessage);
                    }
                    console.log(error);
                });
          }
      }
  }
};
</script>
<style scoped>
.btn-primary {
    background-color: #688A75;
    border-color: #688A75;
    font-family: 'Work Sans';
    color: white;
}
a {
    color: black;
}
h5 {
    padding: 10px;
    font-size: 25px;
    font-weight: bold;
}
label, small {
    padding-left: 5px;
}
label {
    font-size: 15px;
}
.btn-primary:hover {
    background-color: #516e5c;
    border-color: #516e5c;
}
.login {
    width: 50%;
    height: 600px;
    margin-left: auto;
    margin-right: auto;
    padding: 130px;
    text-align: left;
}
</style>