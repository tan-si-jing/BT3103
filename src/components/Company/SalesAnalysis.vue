<template>
  <div>
    <div id="heading">
      This section contains an overview of sales. We have calculated the sales
      earned from each type of product.
    </div>
    <div class="chart">
      <sales-chart></sales-chart>
    </div>
  </div>
</template>

<script>
import SalesChart from "./SalesChart.js";

export default {
  components: {
    SalesChart,
  },
  props: {
    datacollection: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style scoped>
#heading {
  font-family: "EB Garamond";
  font-size: 25px;
}
</style>