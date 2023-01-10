<template>
  <q-page class="q-pa-md">
    <SelectDepartmentVue @selectDepartmentEvent="departmentSelected" />
    <SelectSubjectVue
      @selectSubjectEvent="subjectSelected"
      v-if="departmentModel"
      :departmentModel="departmentModel"
    />

    <q-form @submit="sendFile()" v-if="subjectModel">
      <q-file outlined v-model="model" accept=".ppt, .pptx, .pdf">
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>
      <q-btn type="submit">upload</q-btn>
    </q-form>
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
      model: ref(null),
      sendFile() {
        const fd = new FormData();
        fd.append("file", this.model);
        fd.append("subject", subjectModel.value._id);
        fd.append("semester", subjectModel.value.semester);
        fd.append("department", departmentModel.value._id);
        api
          .post("/note/file", fd, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            $q.notify({
              message: "Successfully uploaded files!",
              color: "green",
            });
            router.push("teacherpage");
          })
          .catch((err) => {
            $q.notify({
              message: "Some unexpected error occurred!",
              color: "red",
            });
          });
      },
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
