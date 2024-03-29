<template>
  <v-card class="mb-7">
      <v-card-text class="pa-5 border-bottom">
        <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
          Usuarios {{typeUSer.name}}
        </h3>
        <h6 class="subtitle-2 font-weight-light">
          En este formulario se registran todos los usuarios {{typeUSer.name}}
        </h6>
      </v-card-text>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="name_rol"
              label="Rol del usuario"
              disabled
              filled
              background-color="transparent"
            ></v-text-field>
          </v-col>
        </v-row>   
        <v-form ref="form" v-model="valid" lazy-validation>     
          <v-row>
            <v-col cols="12" lg="6">
              <v-text-field
                v-model="form.name"
                label="Nombre del Usuario"
                filled
                required
                :rules="rules.nameRule"
                background-color="transparent"
                :error-messages="errorsBags.name"
              ></v-text-field>
            </v-col>
            <v-col cols="6" lg="6">
              <v-text-field
                type="email"
                v-model="form.email"
                label="Email del Usuario"
                required
                filled
                :rules="rules.emailRule"
                background-color="transparent"
                :error-messages="errorsBags.email"
              ></v-text-field>
            </v-col>
            <v-col cols="6" lg="6">
              <v-text-field
                type="password"
                v-model="form.password"
                label="Contraseña del Usuario (dejar en blanco para conservar)"
                filled
                background-color="transparent"
                autocomplete="new-password"
                :error-messages="errorsBags.password"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" v-if="type=='commerces'">
              <v-select
                :items="commerces"
                :loading="loadingCommerces"
                filled
                required
                v-model="form.commerce_id"
                label="Comercio"
                :rules="rules.entitiesRule"
                background-color="transparent"
              ></v-select>
            </v-col>
            <v-col cols="12" lg="6" v-if="type=='restaurants'">
              <v-select
                :loading="loadingRestaurant"
                label="Restaurante"
                :items="restaurantList"
                v-model="form.restaurant_id"
                filled
                required
                :rules="rules.entitiesRule"
                background-color="transparent"
                :error-messages="errorsBags.restaurant_id"
              ></v-select>
            </v-col>
          </v-row>
          <v-btn
            color="success"
            @click="save"
            :disabled="!valid"
            submit
            class="text-capitalize mr-2"
            >Guardar</v-btn
          >
          <v-btn color="black" class="text-capitalize" :to="'/security/user/'+type" dark
            >Cancelar</v-btn
          >
        </v-form>
      </v-card-text>
    <SnackBar
      :text="textSnackBar"
      ref="snackBarRef"
      :snackbar="true"
    ></SnackBar>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import SnackBar from "@/views/modules/components/SnackBar";
export default {
  name: "RegisterUser",
  props: {
    type: String,
    id: String,
  },
  components: {
    SnackBar,
  },

  data() {
    return {
      textSnackBar: "",
      valid: true,
      loadingRole: false,

      roleList: [],
      errorsBags: [],
      name_rol : '',
      role_id : '',
      form: {
        id: "",
        name: "",
        email: "",
        password: "",
        commerce_id: "",
        restaurant_id: "",
      },
      loadingCommerces: false,
      commerces : [],

      
      loadingRestaurant: false,
      restaurantList : [],
      rules: {
        nameRule: [(v) => !!v || "este campo es obligatorio"],
        emailRule: [(v) => !!v || "este campo es obligatorio"],
        entitiesRule: [(v) => !!v || "este campo es obligatorio"],
      },
    };
  },

  mounted() {
    this.setData();
  },

  methods: {
    ...mapActions({
      createUser: "user/createUser",
      getUserById: "user/getUserById",
      updateUser: "user/updateUser",

      getRolesData: "role/getRolesData",
      commerceData: "commerce/getCommercesData",
      getRestaurantsData: "restaurant/getRestaurantsData",
    }),
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const payload = this.form;
        if (this.id) {
          this.update(payload);
        } else {
          this.create(payload);
        }
      }
    },
    setData() {
      this.loadingRole = true;
      this.getRolesData().then((result) => {
        result.map((element) => {
          if(element.slug == this.typeUSer.slug){
            this.role_id = element.id;
            this.name_rol = element.name;           
          }
        });
        this.loadingRole = false;
      });
      if (this.id) {
        this.getUserById(this.id).then((result) => {
          this.form = Object.assign({}, result);
        });
      }
      if(this.type=='commerces'){
        this.loadCommerces();
      }
      if(this.type=='restaurants'){
        this.loadRestaurants();
      }
    },

    create(payload) {
      payload['role_id'] = this.role_id;
      this.createUser(payload)
        .then((result) => {
          if (result) {
            this.form = {};
            this.$refs.form.reset();
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Guardado existosamente!";
          }
        })
        .catch((err) => {
          if (err.response) {
            this.errorsBags = err.response.data.errors;
            setTimeout(() => {
              this.errorsBags = [];
            }, 4000);
          }
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = "Disculpe, ha ocurrido un error";
        });
    },

    update(payload) {
      this.updateUser(payload)
        .then((result) => {
          if (result) {
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Actualizado existosamente!";
          }
        })
        .catch((err) => {
          if (err.response) {
            this.errorsBags = err.response.data.errors;
            setTimeout(() => {
              this.errorsBags = [];
            }, 4000);
          }
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = "Disculpe, ha ocurrido un error";
        });
    },

    

    loadCommerces() {
      const rows = [];
      this.loadingCommerces = true;
      this.commerceData()
        .then((result) => {
          if (result) {
            result.map((element) => {
              if (element.commerce_type !== "Restaurantes") {
                rows.push({
                  value: element.id,
                  text: element.name,
                });
              }
              this.commerces = rows;
            });
          }
          this.loadingCommerces = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingCommerces = false;
        });
    },
    loadRestaurants() {

      this.loadingRestaurant = true;
      const restaurants = [];
      this.getRestaurantsData().then((result) => {
        result.map((element) => {
          restaurants.push({
            value: element.id,
            text: element.name,
          });
          this.restaurantList = restaurants;
        });
        this.loadingRestaurant = false;
      });
    },
  },
  computed: {
    typeUSer(){

        var type = this.type;
        var data = null;        
        switch(type) {
            case 'admin':
              data = {
                name: 'Administradores',
                slug: 'ROLE_ROOT'
              };
            break;
            case 'commerces':
              data = {
                name: 'Comercios',
                slug: 'ROLE_COMMERCE'
              };
            break;
            case 'restaurants':
              data = {
                name: 'Restaurantes',
                slug: 'ROLE_RESTAURANT'
              };
            break;
            case 'drivers':
              data = {
                name: 'Conductores',
                slug: 'ROLE_DRIVER'
              };
            break;
            case 'clients':
              data = {
                name: 'Clientes',
                slug: 'ROLE_CLIENT'
              };
            break;
            default:
              data = {
                name: 'Clientes',
                slug: 'ROLE_CLIENT'
              };
            break;
        }
        return data;
    }
  },
};
</script>
