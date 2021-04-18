import { Bar } from "vue-chartjs";
import { fb, database } from "../../../firebase.js";

export default {
  extends: Bar,
  data: () => ({
    gotData: false,
    datacollection: {
      labels: [],
      datasets: [
        {
          label: "Footprint of Products Purchased",
          backgroundColor: [
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850",
            "#2c3e50",
          ],
          data: [],
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Footprint of Products Purchased",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              min: 0,
            },
          },
        ],
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  methods: {
    fetchItems: function() {
      var user_id = "";
      user_id = fb.auth().currentUser.uid;
      //var prods = [];

      database
        .collection("purchased")
        .where("user_id", "==", user_id)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            var pName = doc.data().name;
            var pFootprint = doc.data().footprint;
            if (!this.datacollection.labels.includes(pName)) {
              this.datacollection.labels.push(pName);
              this.datacollection.datasets[0].data.push(pFootprint);
            } else {
              //do nothing
            }
          });
        });
    },
  },
  created() {
    this.fetchItems();
  },
  mounted() {
    this.renderChart(this.datacollection, this.options);
  },
};
