<template>
  <div class="addToCart">
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#cartPopup" v-on:click="addToCart(addPdt)">
        Add To Cart
        </button>

        <!-- Modal -->
        <div class="modal fade" id="cartPopup" tabindex="-1" role="dialog" aria-labelledby="cardPopupTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" style="justify-content: center;">
            <div class="modal-content" style="background-color: #EDF6F9;">
            <div class="modal-header" style="margin:5px 0px;">
                <h5 class="modal-title" id="cartPopupTitle">Added successfully!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-footer" style="border-top: none;">
                <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="$router.push('cartitems')">View Cart</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="$router.push('products')">Continue Shopping</button>
            </div>
            </div>
        </div>
        </div>
  </div>
</template>

<script>
import {fb, database} from '../firebase'

export default {
  name: "AddToCart",
  props: {
    addPdt: Array //[item_id, qty]
  },
  methods:{
    addToCart: function(addPdt){
        let userid = fb.auth().currentUser.uid;
        database.collection("cart").doc(userid).get().then((doc) => {
            if (doc.exists) {
                let cart = doc.data();
                let pdt_id = addPdt[0]
                let pdt_amt = cart[pdt_id]
                if (pdt_amt != null) {
                    let newQty = addPdt[1] + pdt_amt
                    cart[pdt_id] = newQty
                } else {
                    cart[pdt_id] = addPdt[1]
                }
                database.collection("cart").doc(userid).set(cart)
            } else {
                let cart = {}
                let pdt_id = addPdt[0]
                cart[pdt_id] = addPdt[1]
                database.collection("cart").doc(userid).set(cart)
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
  }
};
</script>

<style scoped>
.btn-primary {
    background-color: #688A75;
    border-color: #688A75;
    font-family: 'EB Garamond';
    color: white;
}
.btn-primary:hover, .btn:hover {
    background-color: #516e5c;
    border-color: #516e5c;
}
.modal-content {
    align-items: center;
    width: 60%;
}
</style>
