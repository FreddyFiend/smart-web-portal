<template>
  <q-page class="q-pa-md">
    <SelectDepartmentVue @selectDepartmentEvent="departmentSelected" />
    <SelectSubjectVue
      @selectSubjectEvent="subjectSelected"
      v-if="departmentModel"
      :departmentModel="departmentModel"
    />

    <q-form @submit="onSubmit">
      <q-input class="q-pa-md" outlined v-model="text" label="Lecture Title" />
      <q-input
        class="q-pa-md"
        outlined
        v-model="linkModel"
        label="Lecture youtube link"
      >
        <template v-slot:prepend> <q-icon name="link" /> </template>
      </q-input>
      <q-btn @click="getId()">Show</q-btn>
    </q-form>

    <div class="text-h6" v-if="videoUrl === 'error'">
      Link Error! paste link in the following form
      https://www.youtube.com/watch?v=16QXuxxxx
    </div>
    <iframe
      v-if="linkModel && videoUrl !== 'error'"
      width="560"
      height="315"
      :src="videoUrl"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
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
    return {
      router,
      linkModel,
      getId,
      videoUrl,
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
    this.store.setTitle("Upload Lecture");
  },
});
</script>
