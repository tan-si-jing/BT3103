<template>
  <div class="liked">
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" style="background-color:rgba(237, 246, 249, 1); border-color: rgba(237, 246, 249, 1); margin:2px;" data-toggle="modal" data-target="#likedProducts">
        <b-icon icon="suit-heart" style="color:#688A75;"></b-icon>
        </button>

        <!-- Modal -->
        <div class="modal fade" id="likedProducts" tabindex="-1" role="dialog" aria-labelledby="likedTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="likedTitle">Liked Products</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" style="padding: 0px 10px">
                <div v-if="this.liked.length === 0" style="padding: 15px;">No products liked yet.</div>
                <ul v-else v-for="(item,index) in this.liked" :key="index">
                <li>
                    <img :src="item.img_url" width="90" height="90">
                    <div id="pdtCell" style="display: grid; margin: 2px 10px; align-content: start; text-align: left;">
                        <h5 style="font-size: 17px; padding:0px;">{{item.name}}</h5>
                        <span style="justify-self: self-start;">
                            <img src="../../public/footprints.svg" width="25" height="20"> {{item.footprint}}g
                        </span>
                    </div>
                    <div style="flex: auto; text-align: right; margin: 2px 0px;">
                    <h5 style="font-size: 17px; padding:0px 15px;">${{parseFloat(item.price).toFixed(2)}}</h5>
                    </div>
                </li>
                </ul>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Continue Shopping</button>
            </div>
            </div>
        </div>
        </div>
  </div>
</template>

<script>
import {fb, database} from '../firebase'
export default {
  name: "LikedProducts",
  data(){
      return {
          userid: null,
          liked: []
      }
  },
  methods:{
      fetchLikedProducts: function(){
          this.userid = fb.auth().currentUser.uid;
          database.collection("users").doc(this.userid).get().then(doc => {
            let pdtList = doc.data().liked;
            for (const pdt_id of pdtList) {
                database.collection("products").doc(pdt_id).get().then(snapshot => {
                    let pdt = snapshot.data();
                    let pdtObject = {
                        img: pdt.img_url,
                        footprint: pdt.footprint,
                        price: pdt.price,
                        name: pdt.name
                    };
                    this.liked.push(pdtObject);
                })
            }
          });
      }
  },
  created() {
      this.fetchLikedProducts();
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
.modal-content{
    background-color: #C1D9CA;
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
ul {
    list-style-type: none;
    padding-left: 0px;
}
li {
    border-radius: 10px;
    background-color: #EDF6F9;
    display: flex;
    padding: 15px;
    margin:10px;
}
</style>
