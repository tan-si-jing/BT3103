<template>
	<div class="homepage">
		<div class="introduction">
			<h2 style="font-size:30px; font-weight: bold; font-family: 'EB Garamond';"> About us </h2> <br>
			<p class="intro-content">We are a group of NUS students who are passionate about reducing Singapore's 
			carbon footprint, a major component affecting climate change, as Singapore represents about 
			0.11 per cent of global emissions. Hence, we have created this centralised platform for environmentally friendly 
			businesses to promote their eco-friendly products and at the same time, raise awareness on the 
			importance of conserving our environment. Click the link below to find out more about the air pollution 
			levels in Singapore. <br><br>
			<a class= "link" href = "https://bt3103-project-environment.herokuapp.com/" target="_blank"> {{this.dashboard}} </a> 
			</p>
			<p>Happy Shopping!</p>
		</div>
		<div class="newspaper-content">
			<div class="section-title"> Browse Articles </div>
			<div id="articlesNav" class="carousel slide" data-ride="carousel">
			<ol class="carousel-indicators">
				<li data-target="#articlesNav" data-slide-to="0" class="active"></li>
				<li data-target="#articlesNav" data-slide-to="1"></li>
				<li data-target="#articlesNav" data-slide-to="2"></li>
			</ol>
			<div class="carousel-inner newspaper-feed">
				<div class="carousel-item" v-for="(article, idx) in newsfeed" v-bind:key=idx :class="{ active: idx==0 }">
					<a :href="article.link">
						<img :src="article.image" class="d-block news">
					</a>
					<div class="carousel-caption">
						<h5>{{article.name}}</h5>
					</div>
				</div>
			</div>
			<a class="carousel-control-prev" href="#articlesNav" role="button" data-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true" style="filter:invert(100%);"></span>
				<span class="sr-only">Previous</span>
			</a>
			<a class="carousel-control-next" href="#articlesNav" role="button" data-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true" style="filter:invert(100%);"></span>
				<span class="sr-only">Next</span>
			</a>
			</div>
		</div>
		<div class="section-title"> Our Partner Stores </div>
		<ul>
			<li v-for="shop in shopsList" v-bind:key="shop.name">
				<img v-bind:src="shop.img_url" :id="shop.name" v-on:click="route($event)">
				<h2 class="shopName" v-bind:id="shop.name" v-on:click="route($event)" > {{shop.name}} </h2>
			</li>
		</ul>
		<Footer/>
	</div> 
</template>

<script>
import {database} from "../firebase.js"
import Footer from './Footer.vue'

export default({
	data(){
		return{
			shopsList:[],
			newsfeed:[],
			index: 0,
			dashboard: "https://bt3103-project-environment.herokuapp.com/"
		}
	},

	components: {
		Footer
	},

	methods: {
		fetchItems: function(){
			database.collection("companies").get().then((querySnapShot) =>{
				let shop = {};
				querySnapShot.forEach(doc => {
					shop = doc.data();
					this.shopsList.push(shop);
				})
			})
		},
		fetchNews: function(){
			database.collection("newsfeed").get().then((querySnapShot) => {
				let news ={};
				querySnapShot.forEach(doc =>{
					news = doc.data();
					this.newsfeed.push(news);
				})
			}) 
		},
		route: function(event) {
			let shop_name = event.target.getAttribute("id");
			this.$router.push({ name: "isp", params: { id: shop_name } });
		}

	},

	created(){
		this.fetchItems(),
		this.fetchNews()
	}

})
</script>


<style scoped>
.introduction{
	background-color: rgba(65, 119, 110, 0.329);
	margin: 0px 0px 5px 0px;
	text-align: center;
	padding: 50px 200px;
}

p {
	font-size: 18px;
	color: black;
}

a:link {
	color:green;
	text-decoration: none;
}

a:hover{
	color:rgb(57, 66, 54)
}
.newspaper-feed {
	width: 60%;
	height: 480px;
	border: 6px solid rgba(104, 138, 117, 1);
	display: inline-block;
	margin-bottom: 20px;
}

.news {
	width: 100%;
	height: 480px;
}

.section-title {
	font-size: 35px;
	font-family: 'EB Garamond';
	padding-top: 40px;
	padding-bottom: 20px;
	font-weight:bold;
}

ul {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 50px;
  list-style-type: none;
  justify-content: center;
  padding-left: 0px;
  margin-bottom: 20px;
}

li {
  text-align: center;
	list-style-type: none;
}

h5 {
	background-color: darkslategrey;
	opacity: 0.8;
	border-radius: 10px;
	padding: 10px;
}

.carousel-control-prev-icon, .carousel-control-next-icon {
    width: 40px;
    height: 40px;
}

.carousel-control-prev, .carousel-control-next {
    width: 20%;
}

.carousel-indicators li {
	background-color: forestgreen;
}

.carousel-indicators {
	bottom: -20px;
}

img {
    width: 350px;
    height: 300px;
	cursor: pointer;
}

.shopName {
	font-family: 'EB Garamond';
	font-size: 20px;
	color: rgba(0, 86, 94, 1);
	padding:10px;
	cursor: pointer;
	text-decoration: underline;
}
</style>