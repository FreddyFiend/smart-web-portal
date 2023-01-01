<template>
  <q-page class="">
    <div class="row justify-center">
      <div
        class="q-pa-md q-ma-md bg-primary shadow-3 rounded-borders cursor-pointer"
        style="width: 200px; height: 200px"
        v-for="(item, idx) in items"
        :key="idx"
        @click="$router.push(item.link)"
      >
        <div class="row justify-center">
          <q-icon
            class=""
            :name="item.icon"
            color="white"
            size="120px"
          ></q-icon>
          <div class="text-h6 text-white">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { useSwpStore } from "src/stores/swp";
import { defineComponent, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "UsersAdminPage",
  setup() {
    const $q = useQuasar();
    const store = useSwpStore();
    const router = useRouter();
    const route = useRoute();

    return {
      router,
      route,
      $q,
      store,
      items: ref([
        { title: "Departments", icon: "school", link: "admindepartment" },
        { title: "Subjects", icon: "subject", link: "adminsubject" },
        { title: "Users", icon: "group", link: "adminusers" },
      ]),
    };
  },
  created() {
    this.store.setTitle("Users");
  },
});
</script>
