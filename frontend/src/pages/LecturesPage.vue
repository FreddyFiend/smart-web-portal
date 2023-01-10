<template>
  <q-page class="q-pa-md bg-grey-3">
    <q-select
      filled
      class="q-ma-md shadow-4"
      bg-color="white"
      v-model="subjectsSelected"
      multiple
      :options="subjects"
      use-chips
      stack-label
      label="Selected Subjects"
    />

    <div
      v-for="lecture in filteredLectures"
      :key="lecture._id"
      class="q-pa-md q-ma-md shadow-4 bg-white"
    >
      <div class="q-pt-sm q-px-md text-h6">{{ lecture.title }}</div>
      <div class="q-px-md text-subtitle2">{{ lecture.user.username }}</div>
      <div class="q-px-md text-subtitle2 text-primary">
        {{ lecture.subject.title }}
      </div>
      <iframe
        class="q-pa-md"
        width="560"
        height="315"
        :src="lecture.text"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div class="q-px-md text-subtitle1 text-grey">{{ lecture.time }}</div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { useSwpStore } from "src/stores/swp";
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LecturesPage",
  setup() {
    const $q = useQuasar();
    const store = useSwpStore();
    const router = useRouter();
    const lectures = ref([]);
    const subjects = ref([]);
    const subjectsSelected = ref([]);

    const filteredLectures = computed(() => {
      return lectures.value.filter((l) =>
        subjectsSelected.value.includes(l.subject.title)
      );
    });

    function add(item) {
      if (subjects.value.indexOf(item) === -1) {
        subjects.value.push(item);
        subjectsSelected.value.push(item);
      }
    }

    return {
      add,
      subjects,
      filteredLectures,
      subjectsSelected,
      router,
      $q,
      lectures,
      model: ref(null),
      store,
    };
  },
  created() {
    this.store.setTitle("Lectures");
    api
      .get(
        `/note?type=lecture&department=${this.store.department}&semester=${this.store.semester}`
      )
      .then((res) => {
        this.lectures = res.data.notes.map((note) => {
          this.add(note.subject.title);
          const newDate = new Date(note.createdAt).toLocaleString(undefined, {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          return { ...note, time: newDate };
        });
      });
  },
});
</script>
