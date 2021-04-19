<template>
  <div style="margin-bottom: 50px;">
    <h5>
      This section contains an overview of sales categorised by product.
    </h5>
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
  }
};
</script>

<style scoped>
h5 {
  padding:10px;
  margin-bottom: 40px;
}
</style>