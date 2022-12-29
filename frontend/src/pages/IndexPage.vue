<template>
  <q-page class="flex flex-center">
    <router-link to="login">hjbjhbhj</router-link>

    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />
    <q-file outlined v-model="model">
      <template v-slot:prepend>
        <q-icon name="attach_file" />
      </template>
    </q-file>
    <q-btn @click="sendFile()">upload</q-btn>
  </q-page>
</template>

<script>
import { api } from "src/boot/axios";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "IndexPage",
  setup() {
    return {
      model: ref(null),
      sendFile() {
        const fd = new FormData();
        fd.append("file", this.model);
        api.post("/file", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      },
    };
  },
});
</script>
