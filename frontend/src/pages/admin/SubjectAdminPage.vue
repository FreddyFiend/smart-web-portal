<template>
  <q-page class="q-pa-md">
    <q-select
      outlined
      v-model="departmentModel"
      use-input
      input-debounce="0"
      label="Select Department"
      :options="options"
      @filter="filterFn"
      style="width: 250px"
      @update:model-value="selectDepartmentEvent()"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template>
    </q-select>
    <div class="q-pa-md" v-if="departmentModel">
      <div class="text-subtitle2 text-grey">
        Selected:
        <span class="text-black">{{ departmentModel?.value?.title }}</span>
      </div>
      <div class="text-subtitle2 text-grey">
        Type:
        <span class="text-black">{{ departmentModel?.value?.type }}</span>
      </div>
      <div class="text-subtitle2 text-grey">
        Total Semesters:
        <span class="text-black">{{ departmentModel?.value?.semesters }}</span>
      </div>
    </div>
    <div class="q-pa-md" v-for="subject in subjects" :key="subject._id">
      <div class="text-h6">{{ subject.title }}</div>
      <div class="text-subtitle1">Semester: {{ subject.semester }}</div>
    </div>
    <div v-if="departmentModel">
      <q-btn
        standout
        v-if="!showAddSubject"
        @click="showAddSubject = true"
        icon="add"
        color="green"
      >
        Add New Subject
      </q-btn>
      <q-btn
        standout
        v-if="showAddSubject"
        @click="showAddSubject = false"
        icon="close"
        color="red"
      >
        Close
      </q-btn>
    </div>

    <q-form
      @submit="onSubmit"
      class="q-gutter-md q-pt-md"
      v-if="showAddSubject"
    >
      <q-input
        outlined
        v-model="subjectTitleModel"
        label="Subject title"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        outlined
        v-model="subjectCodeModel"
        label="Subject Code"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        outlined
        v-model="subjectSemesterModel"
        label="Semester"
        lazy-rules
        type="number"
        :rules="[
          (val) =>
            (val > 0 && val <= departmentModel.value.semesters) ||
            'Please type valid semester',
        ]"
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
  name: "SubjectAdminPage",
  setup() {
    const $q = useQuasar();
    const store = useSwpStore();
    const router = useRouter();
    const route = useRoute();
    const showAddSubject = ref(false);
    const mappedDepartments = ref(null);

    const options = ref(mappedDepartments);
    const departmentModel = ref(null);
    const subjectTitleModel = ref(null);
    const subjectCodeModel = ref(null);
    const subjectSemesterModel = ref(null);
    const subjects = ref(null);
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

    function onSubmit() {
      api
        .post("/subject", {
          department: departmentModel.value.value._id,
          title: subjectTitleModel.value,
          code: subjectCodeModel.value,
          semester: subjectSemesterModel.value,
        })
        .then((res) => {
          $q.notify({ message: res.data.msg, color: "green" });
          subjectCodeModel.value = "";
          subjectSemesterModel.value = "";
          subjectTitleModel.value = "";
          selectDepartmentEvent();
          showAddSubject.value = false;
        });
    }
    function selectDepartmentEvent() {
      api.get(`subject/${departmentModel.value.value._id}`).then((res) => {
        console.log(res.data);
        subjects.value = res.data.subjects;
      });
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
    getDepartments();
    return {
      router,
      route,
      $q,
      store,
      showAddSubject,
      mappedDepartments,
      subjects,
      departmentModel,
      options,
      subjectTitleModel,
      subjectCodeModel,
      subjectSemesterModel,
      selectDepartmentEvent,
      onSubmit,
      filterFn,
    };
  },
  created() {
    this.store.setTitle("Subjects Admin");
  },
});
</script>
