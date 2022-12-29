<template>
  <q-page class="flex flex-center">\ </q-page>
</template>

<script>
import { api } from "src/boot/axios";
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "SubjectPage",
  setup() {
    const router = useRoute();

    function getSubjects() {
      api.get(`subject/${router.params.id}`);
    }

    return {
      model: ref(null),
    };
  },
});
</script>
