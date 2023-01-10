<template>
  <q-page>
    <SelectDepartmentVue
      class="q-pa-md"
      @selectDepartmentEvent="departmentSelected"
    />
    <SelectSubjectVue
      class="q-pa-md"
      @selectSubjectEvent="subjectSelected"
      v-if="departmentModel"
      :departmentModel="departmentModel"
    />
    <q-form @submit="onSubmit" v-if="subjectModel">
      <q-input
        class="q-pa-md"
        outlined
        v-model="titleModel"
        label="Lecture Title"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        class="q-pa-md"
        outlined
        v-model="linkModel"
        label="Lecture Youtube link"
        @update:model-value="getId()"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      >
        <template v-slot:prepend> <q-icon name="link" /> </template>
      </q-input>
      <div class="q-pa-md text-h6" v-if="videoUrl === 'error'">
        Link Error! paste link in the following form
        https://www.youtube.com/watch?v=16QXuxxxx
      </div>

      <iframe
        class="q-pa-md"
        v-if="linkModel && videoUrl !== 'error'"
        width="560"
        height="315"
        :src="videoUrl"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <q-btn
        class="q-ma-md"
        type="submit"
        v-if="linkModel && videoUrl !== 'error'"
        >Submit</q-btn
      >
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
  name: "UploadLecturePage",
  setup() {
    const $q = useQuasar();
    const store = useSwpStore();
    const router = useRouter();
    const route = useRoute();
    const titleModel = ref(null);
    const departmentModel = ref(null);
    const subjectModel = ref(null);
    const linkModel = ref(null);
    const videoUrl = ref(null);
    function departmentSelected(value) {
      departmentModel.value = value;
    }

    function subjectSelected(value) {
      subjectModel.value = value;
    }
    function getId() {
      let regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      let match = linkModel.value.match(regExp);

      if (match && match[2].length == 11) {
        videoUrl.value = `https://www.youtube.com/embed/${match[2]}`;
      } else {
        videoUrl.value = "error";
      }
    }
    function onSubmit() {
      api
        .post(`/note`, {
          noteType: "lecture",
          subject: subjectModel.value._id,
          department: departmentModel.value._id,
          semester: subjectModel.value.semester,

          title: titleModel.value,
          text: videoUrl.value,
        })
        .then((res) => {
          $q.notify({
            message: "Successfully uploaded lecture!",
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
    }
    return {
      router,
      linkModel,
      titleModel,
      api,
      getId,
      videoUrl,
      route,
      $q,
      store,
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
    this.store.setTitle("Upload Lecture");
  },
});
</script>
