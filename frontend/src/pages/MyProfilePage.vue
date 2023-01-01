<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md text-h6">{{ store?.user }}</div>
    <div class="q-pa-md text-subtitle">{{ store?.user }}</div>
  </q-page>
</template>

<script>
import { api } from "src/boot/axios";
import { useSwpStore } from "src/stores/swp";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MyProfilePage",
  setup() {
    const store = useSwpStore();
    return {
      store,
    };
  },
  created() {
    this.store.setTitle("My Profile");
  },
});
</script>
