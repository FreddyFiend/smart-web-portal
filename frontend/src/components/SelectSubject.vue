<template>
  <q-select
    class="q-pa-sm"
    outlined
    v-model="subjectModel"
    use-input
    input-debounce="0"
    label="Select Subject"
    :options="options"
    @filter="filterFn"
    style="width: 450px"
    @update:model-value="selectSubjectEvent()"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No results </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { defineComponent, ref } from "vue";
import { api } from "src/boot/axios";

export default defineComponent({
  name: "SelectDepartment",
  props: ["departmentModel"],
  setup() {
    const mappedSubjects = ref(null);
    const options = ref(mappedSubjects);
    const subjectModel = ref(null);

    function filterFn(val, update) {
      if (val === "") {
        update(() => {
          options.value = mappedSubjects.value;

          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        options.value = mappedSubjects.value.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    }
    return {
      subjectModel,
      filterFn,
      mappedSubjects,
      options,
    };
  },
  methods: {
    getSubjects() {
      api.get(`subject/${this.departmentModel._id}`).then((res) => {
        this.mappedSubjects = res.data.subjects.map((s) => {
          return {
            label: s.title,
            value: s,
          };
        });
        this.subjects = res.data.subjects;
      });
    },
    selectSubjectEvent() {
      this.$emit("selectSubjectEvent", this.subjectModel.value);
    },
  },
  created() {
    this.getSubjects();
  },
});
</script>
