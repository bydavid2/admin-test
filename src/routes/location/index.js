export default {
  routes: [
    // routes for country
    {
      name: "Country",
      path: "location/country",
      component: () => import("../../views/modules/location/country"),
    },
    {
      name: "Country Register",
      path: "location/country/register",
      component: () => import("../../views/modules/location/country/Register"),
    },
    {
      name: "Country Edit",
      path: "location/country/edit/:id",
      props: true,
      component: () => import("../../views/modules/location/country/Register"),
    },
    // // routes for Province
    // {
    //   name: "Province",
    //   path: "location/province",
    //   component: () => import("../../views/modules/location/province"),
    // },
    // {
    //   name: "Province Register",
    //   path: "location/province/register",
    //   component: () => import("../../views/modules/location/province/Register"),
    // },
    // {
    //   name: "Province Edit",
    //   path: "location/province/edit/:id",
    //   props: true,
    //   component: () => import("../../views/modules/location/province/Register"),
    // },
    // // routes for City
    // {
    //   name: "City",
    //   path: "location/city",
    //   component: () => import("../../views/modules/location/city"),
    // },
    // {
    //   name: "City Register",
    //   path: "location/city/register",
    //   component: () => import("../../views/modules/location/city/Register"),
    // },
    // {
    //   name: "City Edit",
    //   path: "location/city/edit/:id",
    //   props: true,
    //   component: () => import("../../views/modules/location/city/Register"),
    // },
    {
      name: "Department",
      path: "location/department",
      component: () => import("../../views/modules/location/department"),
    },
    {
      name: "Department Register",
      path: "location/department/register",
      component: () =>
        import("../../views/modules/location/department/register"),
    },
    {
      name: "Department Edit",
      path: "location/department/edit/:id",
      props: true,
      component: () =>
        import("../../views/modules/location/department/register"),
    },
    {
      name: "Municipality",
      path: "location/municipality",
      component: () => import("../../views/modules/location/municipality"),
    },
    {
      name: "Municipality Register",
      path: "location/municipality/register",
      component: () =>
        import("../../views/modules/location/municipality/register"),
    },
    {
      name: "Municipality Edit",
      path: "location/municipality/edit/:id",
      props: true,
      component: () =>
        import("../../views/modules/location/municipality/register"),
    },
  ],
  menu: {
    group: "/location",
    title: "Ubicaciones",
    icon: "mdi-google-maps",
    children: [
      {
        title: "País",
        icon: "mdi-comment-outline",
        to: "country",
      },
      // {
      //   title: "Provincia",
      //   icon: "mdi-comment-outline",
      //   to: "province",
      // },
      // {
      //   title: "Ciudad",
      //   icon: "mdi-comment-outline",
      //   to: "city",
      // },
      {
        title: "Departamentos",
        icon: "mdi-office-building-location-outline",
        to: "department",
      },
      {
        title: "Municipios",
        icon: "mdi-location-city",
        to: "municipality",
      },
    ],
  },
};
