<template>
  <q-page class="q-pa-md">
    <SelectDepartmentVue @selectDepartmentEvent="departmentSelected" />
    <SelectSubjectVue
      @selectSubjectEvent="subjectSelected"
      v-if="departmentModel"
      :departmentModel="departmentModel"
    />

    <q-form @submit="onSubmit" v-if="subjectModel">
      <q-input
        class="q-pa-md"
        outlined
        v-model="titleModel"
        label="Assignment Heading"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        class="q-pa-md"
        v-model="textModel"
        outlined
        label="Assignment Description"
        autogrow
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-btn class="q-ma-md" type="submit">Submit</q-btn>
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
  name: "UploadAssignmentPage",
  setup() {
    const $q = useQuasar();
    const store = useSwpStore();
    const router = useRouter();
    const route = useRoute();
    const departmentModel = ref(null);
    const subjectModel = ref(null);

    const titleModel = ref(null);
    const textModel = ref(null);

    function departmentSelected(value) {
      departmentModel.value = value;
    }

    function subjectSelected(value) {
      subjectModel.value = value;
    }

    function onSubmit() {
      api
        .post("/note", {
          subject: subjectModel.value._id,
          semester: subjectModel.value.semester,
          department: departmentModel.value._id,
          title: titleModel.value,
          text: textModel.value,
          noteType: "assignment",
        })
        .then((res) => {
          $q.notify({
            message: "Successfully posted assignment!",
            color: "green",
            icon: "done",
          });

          titleModel.value = "";
          textModel.value = "";
        })
        .catch((err) => {
          $q.notify({
            message: "Unexpected error occured!",
            color: "red",
          });
        });
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
      titleModel,
      textModel,
      onSubmit,
    };
  },
  components: {
    SelectDepartmentVue,
    SelectSubjectVue,
  },
  methods: {},
  created() {
    this.store.setTitle("Upload Assignment");
  },
});
</script>
