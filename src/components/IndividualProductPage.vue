<template>
<div>
    <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
    <div> 
        <div id="left-side">
            <ul>
                <li><img id="productimg" :src= "this.pdt.data.img_url"></li><br>
                <li>Price: ${{this.pdt.data.price}}</li><br>
                <li><span id="co2footprint"></span>
                Carbon Footprint: {{this.pdt.data.footprint}}g</li><br>
                <li><i class="fa fa-leaf leaf-icon"></i>
                <b> ECO Points: {{this.pdt.data.points}}</b></li>
                <li><qtyCounter v-on:counter="onCounter"></qtyCounter></li>
                <li><AddToCart v-bind:addPdt="add_product"></AddToCart></li> 
            </ul>
        </div>
        <div id="right-side">
            <ul>
                <li id="name"><b>{{this.pdt.data.name}}</b>
                <likebutton v-bind:id="id" v-bind:liked="liked"></likebutton></li>
                <li id="company_name" v-on:click="route()" style="cursor: pointer; text-decoration: underline;"> From: {{this.company_name}}</li><br><br>
                <li id="green"><u>Description</u></li>
                <li id="black">{{this.pdt.data.description}}</li><br>
                <li id="green"><u>Ingredient Specifications</u></li>
                <li id="black">{{this.pdt.data.ingred_spec}}</li><br>
                <li id="green"><u>Product Specifications</u></li>
                <li id="black">{{this.pdt.data.product_spec}}</li><br>
                <li id="green"><u>Caring For Me</u></li>
                <li id="black">{{this.pdt.data.care}}</li>
            </ul>
        </div>
    </div>
    <Footer/>
</div>
</template>

<script>
import Footer from "./Footer.vue";
import {fb, database} from "../firebase.js";
import LikeButton from './LikeButton.vue';
import AddToCart from './AddToCart.vue';
import QuantityCounter from './QuantityCounter.vue';

export default {
    data() {
        return {
            pdt: {
                pdtID: this.id,
                data: []
            },
            company_id: 0,
            company_name: '',
            add_product: [this.id, 1],
            liked: []
        }
    },
    props: {
        id: String
    },
    components: {
        Footer,
        likebutton: LikeButton,
        AddToCart,
        qtyCounter: QuantityCounter
    },
    methods: {
        fetchItems: function() {
            database
            .collection("products")
            .get()
            .then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    if (doc.id == this.id) {
                        this.pdt.data = doc.data();
                        this.company_id = this.pdt.data.company_id
                    }
                });
            });
        },
        fetchCompany: function() {
            database
            .collection("companies")
            .get()
            .then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    if (doc.data().company_id == this.company_id) {
                        this.company_name = doc.data().name;
                    }
                });
            });
        },
        fetchLikedProducts: function() {
            let user_id = fb.auth().currentUser.uid
            database.collection("users").doc(user_id).get().then((doc)=> {
                this.liked = doc.data().liked
            })
        },
        onCounter: function(quantity) {
            this.add_product[1] = quantity;
        },
        route: function() {
			this.$router.push({ name: "isp", params: { id: this.company_name } });
		}
    },
    created() {
        this.fetchItems(),
        this.fetchCompany(),
        this.fetchLikedProducts()
    },
}
</script>



<style scoped>

#left-side {
    background-color: #D8E2DC;
    width: 40%;
    min-height: 850px; 
    font-family: 'EB Garamond';
    font-size: 22px;
    float: left;
    padding-left: 7%;
}

#productimg {
    width: 350px;
    height: 350px;
    border: 8px solid #B3CDBD;
    margin-top: 70px;
}

ul {
    list-style-type: none;
}

#qtyinput {
    text-align: center;
    width: 70px;
    height: 25px;
    font-family: 'EB Garamond';
    background: #C1D9CA;
    border-radius: 6px;
}

img {
    width: 30px ;
    height: 30px; 
    vertical-align: middle;
}

#co2footprint {
    content: url('https://api.iconify.design/iwwa:co2.svg?height=30');
    vertical-align: -0.45em;
}

.leaf-icon {
  font-size: 20px;
  color: #006d77;
}

#addtocart {
    background: #006D77;
    color: #FFFFFF;
    font-size: 22px;
    border-radius: 6px;
    padding: 8px;
    border: 0px;
    font-family: 'EB Garamond';
}

#right-side {
    background-color: #D8E2DC;
    width: 60%;
    margin-left: 40%;
    min-height: 850px; 
    font-family: 'EB Garamond';
    font-size: 22px;
    padding-right: 5%;
}

#name {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-left: 55px;
    padding-top: 10%;
    color: #00565E;
    font-size: 48px;
}

#company_name {
    color: #006D77;
    font-size: 26px;
}

#green {
    text-align: left;
    color: #006D77;
    margin-left: 15%;
    font-variant-caps: small-caps;
}

#black {
    font-size: 20px;
    text-align: left;
    width: 65%;
    margin-left: 15%;
}

 </style>