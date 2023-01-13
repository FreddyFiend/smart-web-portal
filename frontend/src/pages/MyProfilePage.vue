<template>
  <q-page class="q-pa-md bg-grey-4">
    <div class="my-data q-ma-md q-pa-md bg-white shadow-4">
      <div class="q-pa-md text-h6 bg-white">{{ store?.user.username }}</div>
      <div class="q-pa-md text-subtitle">{{ store?.user.email }}</div>
      <q-chip v-for="role in store.user.roles" :key="role">
        {{ role }}
      </q-chip>
    </div>
    <div v-if="notes" class="q-pa-md text-h6">My Posts:</div>
    <div v-if="notes" class="q-pa-md row q-col-gutter-md">
      <div class="q-pa-md" v-for="note in notes" :key="note._id">
        <div class="q-pa-md row justify-between items-center bg-white shadow-4">
          <div class="left q-pa-md">
            <div class="text-subtitle1">{{ note.title }}</div>
            <div class="text-subtitle2 text-primary">{{ note.noteType }}</div>
            <div class="text-p">{{ note.time }}</div>
          </div>
          <div class="q-pa-md right">
            <q-btn icon="delete" color="red" @click="deleteNote(note)"> </q-btn>
          </div>
        </div>
      </div>
      <q-dialog v-model="showDeleteDialog">
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="delete" color="red" text-color="white" />
            <span class="q-ml-sm"
              >Do you wish to delete {{ selectedNote.title }}
              {{ selectedNote.noteType }}?</span
            >
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn
              flat
              label="Delete"
              color="red"
              v-close-popup
              @click="confirmDelete()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { api } from "src/boot/axios";
import { useSwpStore } from "src/stores/swp";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MyProfilePage",
  setup() {
    const store = useSwpStore();
    const notes = ref(null);
    const selectedNote = ref(null);

    return {
      store,
      showDeleteDialog: ref(null),
      notes,
      selectedNote,
      getNotes() {
        api.get(`/note/${this.store.user._id}`).then((res) => {
          this.notes = res.data.notes.map((note) => {
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
      confirmDelete() {
        api.delete(`/note/${selectedNote.value._id}`).then((res) => {
          this.getNotes();
        });
      },
      deleteNote(note) {
        selectedNote.value = note;
        this.showDeleteDialog = true;
      },
    };
  },
  created() {
    this.store.setTitle("My Profile");
    this.getNotes();
  },
});
</script>
