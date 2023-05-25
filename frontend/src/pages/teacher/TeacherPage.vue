<template>
  <q-page class="flex flex-center">
    <div class="row justify-center">
      <div
        class="q-pa-md q-ma-md bg-secondary shadow-3 rounded-borders cursor-pointer"
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
          <div class="text-h6 text-white col-12 text-center">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useSwpStore } from "src/stores/swp";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "TeacherPage",
  setup() {
    const store = useSwpStore();
    const items = [
      {
        title: "Write Assignment",
        icon: "assignment",
        link: "/uploadassignment",
      },

      {
        title: "Share Lecture",
        icon: "slideshow",
        link: "/uploadlecture",
      },

      {
        title: "Upload Slides/PDFs",
        icon: "view_cozy",
        link: "/uploadslide",
      },
      {
        title: "Post Notes",
        icon: "description",
        link: "/uploadnote",
      },
      {
        title: "Post Outlines",
        icon: "format_list_bulleted",
        link: "/uploadoutline",
      },
    ];
    return {
      store,
      items,
    };
  },
  created() {
    this.store.setTitle("Teacher Portal");
  },
});
</script>
