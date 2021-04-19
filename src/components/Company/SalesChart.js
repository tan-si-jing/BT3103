import { Pie } from 'vue-chartjs'
import { fb, database } from "../../firebase.js";

export default {
    extends: Pie,
    data() {
        return {
            products: [], //store all details abt products offered by this company

            productNames: [],

            datacollection: {
                labels: [], //product names
                datasets: [{
                    label: "% of sales",
                    backgroundColor: ["LightCoral", "Orange", "Pink", "Teal", "Blue", "Purple", "Khaki", "Magenta"],
                    data: [], //product sales
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Overview of Sales ($)'
                },
                responsive: true,
                maintainAspectRatio: false
            }
        };
    },
    methods: {
        fetchProducts: async function () {
            let id = fb.auth().currentUser.uid;
            await database
                .collection("companies")
                .doc(id)
                .get()
                .then((doc) => {
                    this.name = doc.data().name;
                });
            await database
                .collection("products")
                .where("company_name", "==", this.name)
                .get()
                .then((snapshot) => {
                    snapshot.docs.forEach((doc) => {
                        this.products.push([doc.id, doc.data()]);
                    });
                });
        },
        fetchPurchased: async function () {
            for (let i = 0; i < this.products.length; i++) {
                this.productNames[i] = this.products[i][1].name;
                this.datacollection.datasets[0].data[i] = 0 //set all sales to 0 inititally 
            }

            this.datacollection.labels = this.productNames;

            await database
                .collection("purchased")
                .get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        for (let i = 0; i < this.datacollection.labels.length; i++) {
                            if (doc.data().name === this.datacollection.labels[i]) {
                                this.pdtName = doc.data().name;
                                this.pdtQty = doc.data().qty;
                                this.pdtPrice = 0;

                                this.products.forEach((item) => {
                                    if (item[1].name === this.pdtName) {
                                        this.pdtPrice = item[1].price; //get price of product
                                    }
                                });

                                var currSale = this.datacollection.datasets[0].data[i];
                                this.datacollection.datasets[0].data[i] = currSale + (this.pdtQty * this.pdtPrice);
                            }
                        }
                    });
                });
        },
        renderpie() {
            this.renderChart(this.datacollection, this.options)
        }

    },
    async created() {
        await this.fetchProducts();
        await this.fetchPurchased();
        this.renderpie();

    }
}