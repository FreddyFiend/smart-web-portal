<template>
  <q-page class="q-pa-md">
    <SelectDepartmentVue @selectDepartmentEvent="departmentSelected" />
    <SelectSubjectVue
      @selectSubjectEvent="subjectSelected"
      v-if="departmentModel"
      :departmentModel="departmentModel"
    />
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { useSwpStore } from "src/stores/swp";
import { defineComponent, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import SelectDepartmentVue from "src/components/SelectDepartment.vue";
import SelectSubjectVue from "src/components/SelectSubject.vue";
export default defineComponent({
  name: "UploadSlidePage",
  setup() {
    const $q = useQuasar();
    const store = useSwpStore();
    const router = useRouter();
    const route = useRoute();
    const departmentModel = ref(null);
    const subjectModel = ref(null);
    function departmentSelected(value) {
      departmentModel.value = value;
    }

    function subjectSelected(value) {
      subjectModel.value = value;
    }
    return {
      router,
      route,
      $q,
      store,
      departmentSelected,
      subjectSelected,
      departmentModel,
      subjectModel,
    };
  },
  components: {
    SelectDepartmentVue,
    SelectSubjectVue,
  },
  methods: {},
  created() {
    this.store.setTitle("Upload Slide");
  },
});
</script>
