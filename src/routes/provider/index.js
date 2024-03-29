export default {
    routes: [
        {
            name: 'Provider',
            path: "provider/provider",
            component: () => import("../../views/modules/provider/provider")
        },
        {
            name: 'Provider Register',
            path: "provider/provider/register",
            component: () => import("../../views/modules/provider/provider/register")
        },
        {
            name: 'Provider Edit',
            path: "provider/provider/edit/:id",
            props:true,
            component: () => import("../../views/modules/provider/provider/register")
        },

    ],



    menu: {
        group: '/provider',
        title: 'Proveedor',
        icon: 'mdi-account-group',
        children: [
            {
                title: "Proveedor",
                icon: "mdi-account-group",
                to: "provider",
            },


        ]
    }

}