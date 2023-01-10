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
        label="Note Title"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        class="q-pa-md"
        v-model="textModel"
        outlined
        label="Note Text"
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
  name: "UploadNotePage",
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
          semester: subjectModel.value.semester,
          subject: subjectModel.value._id,
          title: titleModel.value,
          department: departmentModel.value._id,
          text: textModel.value,
          noteType: "note",
        })
        .then((res) => {
          $q.notify({
            message: "Successfully posted note!",
            color: "green",
            icon: "done",
          });
          titleModel.value = "";
          textModel.value = "";
        })
        .catch((err) => {
          console.log(err);
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
      titleModel,
      textModel,
      departmentSelected,
      subjectSelected,
      departmentModel,
      subjectModel,
      onSubmit,
    };
  },
  components: {
    SelectDepartmentVue,
    SelectSubjectVue,
  },
  methods: {},
  created() {
    this.store.setTitle("Upload Note");
  },
});
</script>
