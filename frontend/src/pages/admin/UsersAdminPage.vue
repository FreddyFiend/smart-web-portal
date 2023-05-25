<template>
  <q-page class="q-pa-md">
    <q-list bordered>
      <q-item v-for="user in users" :key="user._id" class="row justify-between">
        <q-item-section>
          <q-item-label>{{ user.username }}</q-item-label>
          <q-item-label caption lines="2">{{
            user.email
          }}</q-item-label> </q-item-section
        ><q-item-section>
          <q-item-label>
            Roles:
            <q-badge
              class="q-mx-xs"
              v-for="role in user.roles"
              :key="role._id"
              >{{ role }}</q-badge
            >
          </q-item-label>
        </q-item-section>
        <q-item-section
          side
          class="cursor-pointer"
          @click="
            showEditUser = true;
            selectedUser = user;
          "
        >
          <q-icon name="edit" color="primary" />
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="showEditUser">
      <q-card>
        <q-toolbar>
          <q-avatar icon="edit" color="primary" text-color="white" />

          <q-toolbar-title
            ><span class="text-weight-bold"
              >Edit User Roles</span
            ></q-toolbar-title
          >
        </q-toolbar>
        <q-card-section>
          <div class="q-ma-md text-subtitle2 text-weight-regular">
            Selected user:
            <span class="text-weight-bold"> {{ selectedUser.username }}</span>
          </div>
          <div class="q-ma-md text-subtitle2 text-weight-regular">
            Email:
            <span class="text-weight-bold"> {{ selectedUser.email }}</span>
          </div>
          <q-select
            outlined
            v-model="selectedRoles"
            multiple
            :options="['user', 'teacher', 'admin']"
            use-chips
            stack-label
            style="min-width: 300px"
            label="Select roles"
        /></q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Apply"
            @click="submitUser()"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { useSwpStore } from "src/stores/swp";
import { defineComponent, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "UsersAdminPage",
  setup() {
    const $q = useQuasar();
    const store = useSwpStore();
    const router = useRouter();
    const route = useRoute();

    const users = ref([]);
    const selectedUser = ref(null);
    const showEditUser = ref(null);
    const selectedRoles = ref(null);
    function getUsers() {
      api.get("user").then((res) => {
        users.value = res.data.users.filter(
          (user) => user.email !== "admin@king.com"
        );
      });
      console.log("hello");
    }
    function editUser() {}
    function submitUser() {
      api
        .put(`/user/${selectedUser.value._id}`, { roles: selectedRoles.value })
        .then((res) => {
          $q.notify({
            message: res.data.msg,
            color: "green",
            icon: "done",
          });
          getUsers();
        });
    }

    return {
      router,
      route,
      $q,
      store,
      users,
      selectedUser,
      showEditUser,
      getUsers,
      editUser,
      submitUser,
      selectedRoles,
    };
  },
  created() {
    this.store.setTitle("Users");
    this.getUsers();
  },
});
</script>
