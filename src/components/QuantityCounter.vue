<template>
  <div>
    <button v-on:click= "decrement()">-</button>
    <span id="quantity">{{qty}}</span>
    <button v-on:click= "increment()">+</button>
  </div>
</template>

<script>
export default {
    data(){
       return {
           qty: 1
       } 
    },
    methods: {
        decrement: function() {
            if (this.qty!=1) {
                this.qty = this.qty-1;
                this.$emit('counter', this.qty)
            }    
        },
        increment: function() {
            this.qty++;
            this.$emit('counter', this.qty)
        }
    }
}
</script>

<style scoped>
button{
    background-color: #B3CDBD;
    border-color: #688A75;
    font-family: 'EB Garamond';
    text-align: center; 
    width: 40px;
    margin: 20px;
    border-radius: 10px;
    height: 40px;
}

#quantity {
}
</style>