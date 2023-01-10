<template>
  <q-page class="q-pa-md">
    <q-form
      class="q-pa-md"
      v-if="!store.department && !store.subject"
      @submit="applyDepartmentAndSemester()"
    >
      <div class="q-py-md text-h6">
        Please select your department and semester to continue
      </div>
      <q-select
        outlined
        v-model="departmentModel"
        use-input
        input-debounce="0"
        label="Select Department"
        :options="options"
        @filter="filterFn"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>
      <div v-if="departmentModel">
        <div class="text-h6 text-grey">
          Selected:
          <span class="text-black"> {{ departmentModel.value.title }}</span>
        </div>
        <q-input
          outlined
          v-model="semesterModel"
          label="Semester"
          lazy-rules
          type="number"
          :rules="[
            (val) =>
              (val > 0 && val <= departmentModel.value.semesters) ||
              `Please type 1 to ${departmentModel.value.semesters} semester`,
          ]"
        />
        <q-btn color="primary" type="submit">Apply</q-btn>
      </div>
    </q-form>

    <div class="row justify-center" v-if="store.department && store.semester">
      <div
        class="q-pa-md q-ma-md bg-primary shadow-3 rounded-borders cursor-pointer"
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
      <div
        class="q-pa-md q-ma-md bg-primary shadow-3 rounded-borders cursor-pointer"
        style="width: 200px; height: 200px"
        @click="resetDepartment()"
      >
        <div class="row justify-center">
          <q-icon
            class=""
            name="power_settings_new"
            color="white"
            size="120px"
          ></q-icon>
          <div class="text-h6 text-white col-12 text-center">
            Re-select Department & Semester
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { useSwpStore } from "src/stores/swp";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const $q = useQuasar();
    const store = useSwpStore();
    const departments = ref([]);
    const router = useRouter();
    const items = [
      {
        title: "Assignments",
        icon: "assignment",
        link: "/assignments",
      },

      {
        title: "Lectures",
        icon: "slideshow",
        link: "/lectures",
      },

      {
        title: "Slides",
        icon: "view_cozy",
        link: "/slides",
      },
      {
        title: "Notes",
        icon: "description",
        link: "/notes",
      },
      {
        title: "Outlines",
        icon: "format_list_bulleted",
        link: "/outlines",
      },
    ];

    const mappedDepartments = ref(null);

    const options = ref(mappedDepartments);
    const departmentModel = ref(null);
    const semesterModel = ref(null);

    function getDepartments() {
      api.get("department").then((res) => {
        mappedDepartments.value = res.data.departments.map((d) => {
          return {
            label: d.title,
            value: d,
          };
        });
      });
    }
    getDepartments();

    function resetDepartment() {
      store.setDepartment("");
      store.setSemester(0);
      localStorage.removeItem("department");
      localStorage.removeItem("semester");
    }
    function applyDepartmentAndSemester() {
      store.department = departmentModel.value.value._id;
      store.semester = semesterModel.value;
      localStorage.setItem("department", departmentModel.value.value._id);
      localStorage.setItem("semester", semesterModel.value);
    }

    function filterFn(val, update) {
      if (val === "") {
        update(() => {
          options.value = mappedDepartments.value;

          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        options.value = mappedDepartments.value.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    }
    return {
      router,
      $q,
      model: ref(null),
      store,
      departments,
      items,
      departmentModel,
      mappedDepartments,
      options,
      getDepartments,
      filterFn,
      applyDepartmentAndSemester,
      resetDepartment,
      semesterModel,
    };
  },
  created() {
    this.store.setTitle("Homepage");
    api.get("/department").then((res) => {
      this.departments = res.data.departments;
    });
  },
});
</script>
