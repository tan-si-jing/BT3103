<template>
    <div class="login">
        <button type="button" class="btn btn-primary" style="background-color:rgba(237, 246, 249, 1); border-color: rgba(237, 246, 249, 1);" data-toggle="modal" data-target="#login"><b-icon icon="person-circle" style="color:#688A75;"></b-icon>
        </button>
        <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="loginTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <ul class="nav nav-fill nav-pills mb-3" id="pills-tab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false">Signup</a>
                        </li>
                    </ul>
                    <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" style="text-align:left;" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
                            
                        <h5 class="text-center">Login</h5>
                        <div class="form-group">
                            <label for="inputEmail">Enter email address</label>
                            <b-input-group>
                                <b-input-group-prepend is-text><b-icon icon="envelope"></b-icon></b-input-group-prepend>
                                <b-form-input type="email" v-model="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Email"></b-form-input>
                            </b-input-group>
                            <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label for="inputPassword">Enter password</label>
                            <b-input-group>
                            <b-input-group-prepend is-text><b-icon icon="lock"></b-icon></b-input-group-prepend>
                                <b-form-input type="password" v-model="password" class="form-control" id="inputPassword" placeholder="Password"></b-form-input>
                            </b-input-group>
                        </div>
                        <a href="/companylogin">Click here to log in with business account</a>
                        <br><br>
                        <div class="form-group" style="text-align:center;">
                            <button class="btn btn-primary" v-on:click="login">Let's go!</button>
                        </div>
                    </div>
                    <div class="tab-pane fade" style="text-align:left;" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
                            
                        <h5 class="text-center">Create New Account</h5>
                        <div class="form-group">
                            <label for="name">Your name</label>
                            <input type="text" v-model="name" class="form-control" id="name" placeholder="Name">
                        </div>
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email"  v-model="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" v-model="password" class="form-control" id="password" placeholder="Password">
                        </div>
                        <div class="form-group">
                            <label for="confirmPassword">Confirm Password</label>
                            <input type="password" v-model="confirmPassword" class="form-control" id="confirmPassword" placeholder="Confirm Password">
                        </div>
                        <br>
                        <div class="form-group" style="text-align:center;">
                            <button class="btn btn-primary" v-on:click="register">Sign me up!</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import {fb, database} from '../firebase'
export default {
  name: "Login",
  data(){
      return {
          name:null,
          email:null,
          password:null,
          confirmPassword:null
      }
  },
  methods:{
      login(){
          if (this.email == null || this.password == null) {
            alert("Please fill in all fields!")
          } else {
            fb.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    const modalsBackdrops = document.getElementsByClassName('modal-backdrop');
                        for (let i=0; i < modalsBackdrops.length; i++) {
                            document.body.removeChild(modalsBackdrops[i]);
                        }
                    this.$router.push('/user/home').then(() => location.reload());  
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
      },
      register(){
            if (this.password !== this.confirmPassword) {
                alert("Passwords do not match!")
            } else if (this.name == null || this.email == null || this.password == null || this.confirmPassword == null) {
                alert("Please fill in all fields!")
            } else {
                fb.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then((user) => {
                        const modalsBackdrops = document.getElementsByClassName('modal-backdrop');
                        for (let i=0; i < modalsBackdrops.length; i++) {
                            document.body.removeChild(modalsBackdrops[i]);
                        }
                        database.collection("users").doc(user.user.uid).set({
                            name: this.name,
                            email: this.email,
                            points: 0,
                            liked: []
                        })
                        .catch(function(error) {
                            console.error("Error writing document: ", error);
                        });
                        this.$router.push('/user/home').then(() => {location.reload()});
                    })
                    .catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode == 'auth/weak-password') {
                        alert('The password needs at least 6 characters.');
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
.nav-pills .nav-link.active {
    background-color: #688A75;
    font-family: 'Work Sans';
    color: white;
}
a {
    color: black;
}
.modal-body{
    background-color: #C1D9CA;
    opacity: 0.9;
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
</style>