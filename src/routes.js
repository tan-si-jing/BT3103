import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import UserHeader from "./components/UserHeader.vue";
import UserHome from "./components/UserHome.vue";
import Profile from "./components/Profile.vue";
import Products from "./components/Products.vue";
import IPP from "./components/IndividualProductPage.vue";
import APP from "./components/AllProductsPage.vue";
import EditProfile from "./components/EditProfile.vue";
import CartItems from "./components/Cart/CartItems.vue";
import CartPayment from "./components/Cart/CartPayment.vue";
import CartShipping from "./components/Cart/CartShipping.vue";
import CartConfirm from './components/Cart/CartConfirm.vue';
import ISP from "./components/IndividualShopPage.vue";
import Shop from "./components/Shop.vue";
import EcoPoints from "./components/ProfileDashboards/EcoPoints.vue";
import CompanyHeader from "./components/Company/CompanyHeader.vue";
import CompanyHome from "./components/Company/CompanyHome.vue";
import CompanyLogin from "./components/Company/CompanyLogin.vue";
import EditDescription from "./components/Company/EditDescription.vue";
import EditProducts from "./components/Company/EditProducts.vue";
import AddProducts from "./components/Company/AddProducts.vue";
import CompanyEditProfile from "./components/Company/EditProfile.vue";

import { fb, database } from "./firebase.js";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      //for the non-logged-in users
      path: "/products",
      component: Products,
    },
    {
      path: "/shop/:id",
      component: Shop,
      name: "shop",
      props: true,
    },
    {
      path: "/companylogin",
      component: CompanyLogin,
    },
    {
      path: "/user",
      meta: { requiresAuth: true, isCompany:false },
      component: UserHeader,
      children: [
        {
          path: "home",
          component: UserHome,
        },
        {
          path: "products",
          component: APP,
        },
        {
          path: "profile",
          component: Profile,
        },
        {
          path: "ipp/:id",
          component: IPP,
          name: "ipp",
          props: true,
        },
        {
          path:"isp/:id",
          component: ISP,
          name: "isp",
          props:true
        },
        {
          path: "editprofile",
          component: EditProfile,
        },
        {
          path: "cartitems",
          component: CartItems,
          name: "cartitems",
          props: true,
        },
        { 
          path: 'cartpayment',
          component: CartPayment,
          name: 'cartpayment',
          props: true
        },
        {
          path: "cartshipping",
          component: CartShipping,
          name: 'cartshipping',
          props: true
        },
        {
          path: 'cartconfirm',
          name: 'cartconfirm',
          component: CartConfirm,
          props: true
        },
        {
          path: "ecopoints",
          component: EcoPoints
        },
      ],
    },
    {
      path: "/company",
      meta: { requiresAuth: true, isCompany: true },
      component: CompanyHeader,
      children: [
        {
          path: "home",
          component: CompanyHome,
        },
        {
          path: "editdescription",
          component: EditDescription,
        },
        {
          path: "editproducts",
          component: EditProducts,
          name: "editProducts",
          props: true,
        },
        {
          path: "addproducts",
          component: AddProducts,
        },
        {
          path: "editprofile",
          component: CompanyEditProfile,
        },
        /*
        {
          path: "dashboard",
          component: CompanyDashboard,
        },
        */
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const isCompany = to.matched.some((x) => x.meta.isCompany);
  const currentUser = fb.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next("/");
  } else if (isCompany && requiresAuth && currentUser) {
    database.collection("companies").doc(currentUser.uid).get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          next();
        } else {
          next("/")
        }
      })
  } else if (requiresAuth && currentUser) {
    database.collection("companies").doc(currentUser.uid).get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          next("/company/home");
        } else {
          next()
        }
      })
  } else {
    next();
  }
});


export default router;