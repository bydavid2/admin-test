<template >
  <div>
    <v-icon small @click="edit(item)" class="mr-2">mdi-pencil</v-icon>
    <v-icon v-if="!item.is_lock" small @click="remove(item)">mdi-delete</v-icon>
  </div>
</template>

<script>
export default {
  name: "ButtonCrudTable",
  props: {
    item: Object,
  },

  methods: {
    edit(item) {
      this.$emit("handler-edit", item);
    },
    remove(item) {
      this.$emit("handler-remove", item);
    },
  },
};
</script>