<template>
  <div class="container">
    <h2 class="text-left">Add Products</h2>
    <div class="d-flex mb-4">
      <vue-bootstrap-typeahead
        v-model="fruitSelected"
        :data="fruitsList"
        :serializer="(f) => f.name"
        ref="fruitAutocomplete"
      >
      </vue-bootstrap-typeahead>
      <button class="btn btn-primary ms-2" v-on:click="addFruit">Add</button>
    </div>

    <div
      class="card mb-3"
      v-for="(fruit, index) in cartItems"
      v-bind:key="fruit.id"
      v-bind:index="index"
      v-show="fruit.qty > 0"
    >
      <div class="row d-flex align-content-center p-2">
        <div class="col-8">{{ fruit.name }}</div>
        <div class="col-4">
          <button class="btn btn-default me-2" v-on:click="decrement(fruit)">
            -
          </button>
          <input type="hidden" v-model="fruit.qty" />
          <span>{{ fruit.qty }}</span>
          <button class="btn btn-default ms-2" v-on:click="increment(fruit)">
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  data() {
    return {
      item: 0,
      fruits: [],
      fruitSelected: "",
      cart: [],
    };
  },
  mounted() {
    this.getFruits();
  },
  methods: {
    getFruits() {
      axios.get("https://fruityvice.com/api/fruit/all").then((response) => {
        console.log(response.data);
        this.fruits = response.data;
      });
    },
    addFruit() {
      var index = this.fruits
        .map(function (e) {
          return e.name;
        })
        .indexOf(this.fruitSelected);

      var obj = this.fruits[index];

      if (obj) {
        obj.qty = 1;
        this.cart.push(obj);
      } else {
        alert("No fruit selected");
      }

      this.$refs.fruitAutocomplete.inputValue = "";
    },
    decrement(data) {
      this.cart = this.cart.map((fruit) => {
        if (fruit.id === data.id) {
          var fruit_qty = fruit.qty - 1;

          if (fruit_qty <= 0) {
            var index = this.cart
              .map(function (e) {
                return e.id;
              })
              .indexOf(fruit.id);

            return this.cart.splice(index, 0);
          } else {
            return {
              ...fruit,
              qty: fruit_qty,
            };
          }
        }
        return fruit;
      });
    },
    increment(data) {
      this.cart = this.cart.map((fruit) => {
        if (fruit.id === data.id) {
          return {
            ...fruit,
            qty: fruit.qty + 1,
          };
        }
        return fruit;
      });
    },
  },
  computed: {
    cartItems() {
      var items = [];

      this.cart.forEach(function (value) {
        items.push(value);
      });

      return items;
    },
    // Remove fruits that already exist in the cart
    fruitsList() {
      if (this.cart.length > 0) {
        var cartList = this.cart;

        var list = this.fruits.filter(function (fruit) {
          return !cartList.find(function (cart) {
            return fruit.id === cart.id;
          });
        });

        return list;
      }

      return this.fruits;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
