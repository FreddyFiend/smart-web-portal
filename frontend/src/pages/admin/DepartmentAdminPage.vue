<template>
  <q-page class="q-pa-md">
    <q-list bordered padding style="max-width: 800px" v-if="showList">
      <q-item-label header>Departments</q-item-label>
      <q-item
        class="q-pa-md"
        v-for="department in departments"
        :key="department._id"
      >
        <q-item-section>
          <q-item-label>{{ department.title }}</q-item-label>
          <q-item-label caption lines="2"
            >{{ department.type }} Semesters: {{ department.semesters }}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon
            name="delete"
            color="red"
            class="cursor-pointer"
            @click="deleteDialog(department)"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <q-dialog v-model="showDeleteDialog">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="red" text-color="white" />
          <span class="q-ml-sm"
            >Do you wish to delete
            {{ selectedDepartment.title }} department?</span
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

    <!-- 2nd Segment -->

    <q-btn
      class="q-mt-md"
      standout
      v-if="!showAddDepartment"
      @click="
        showAddDepartment = true;
        showList = false;
      "
      icon="add"
      color="green"
    >
      Add New Department
    </q-btn>
    <q-btn
      standout
      v-if="showAddDepartment"
      @click="
        showAddDepartment = false;
        showList = true;
      "
      icon="close"
      color="red"
    >
      Department
    </q-btn>

    <q-form
      @submit="onSubmit"
      class="q-pa-md q-gutter-md"
      v-if="showAddDepartment"
    >
      <q-input
        outlined
        v-model="departmentTitleModel"
        label="Department title"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        outlined
        v-model="typeModel"
        label="Type, eg BS, MS"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        outlined
        v-model="semestersModel"
        type="number"
        label="Total Semesters"
        lazy-rules
        :rules="[(val) => (val && val > 0 && val < 10) || 'Only 1-10']"
      />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { useSwpStore } from "src/stores/swp";
import { defineComponent, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "DepartmentAdminPage",
  setup() {
    const $q = useQuasar();
    const store = useSwpStore();
    const router = useRouter();
    const route = useRoute();

    const showAddDepartment = ref(false);
    const departmentTitleModel = ref(null);
    const typeModel = ref(null);
    const semestersModel = ref(null);
    const departments = ref([]);

    function getDepartments() {
      api.get("department").then((res) => {
        departments.value = res.data.departments;
      });
    }

    function deleteDialog(department) {
      this.selectedDepartment = department;
      this.showDeleteDialog = true;
      console.log(department);
    }

    function confirmDelete() {
      api.delete(`/department/${this.selectedDepartment._id}`).then((res) => {
        $q.notify({
          message: "Successfully Deleted",
          color: "green",
          icon: "done",
        });
        this.getDepartments();
      });
    }

    function onSubmit() {
      console.log("ok");
      api
        .post("/department", {
          title: departmentTitleModel.value,
          type: typeModel.value,
          semesters: semestersModel.value,
        })
        .then((res) => {
          typeModel.value = "";
          semestersModel.value = "";
          departmentTitleModel.value = "";
          $q.notify({
            message: res.data.msg,
            color: "green",
            icon: "done",
          });
          getDepartments();
          showAddDepartment.value = false;
        })
        .catch((err) => {
          console.log(err.response);
          $q.notify({
            message: err.response.data.msg,
            color: "red",
            icon: "success",
          });
        });
    }

    return {
      router,
      route,
      $q,
      store,
      showAddDepartment,
      departmentTitleModel,
      typeModel,
      semestersModel,
      departments,
      showDeleteDialog: ref(false),
      selectedDepartment: ref(null),
      showList: ref(true),
      getDepartments,
      onSubmit,
      confirmDelete,
      deleteDialog,
    };
  },
  created() {
    this.store.setTitle("Departments Admin");
    this.getDepartments();
  },
});
</script>
