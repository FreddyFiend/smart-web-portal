<template>
  <q-select
    class="q-pa-sm"
    outlined
    v-model="departmentModel"
    use-input
    input-debounce="0"
    label="Select Department"
    :options="options"
    @filter="filterFn"
    style="width: 450px"
    @update:model-value="selectDepartmentEvent()"
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
  setup() {
    const mappedDepartments = ref(null);

    const options = ref(mappedDepartments);
    const departmentModel = ref(null);

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
    function selectDepartmentEvent() {
      this.$emit("selectDepartmentEvent", departmentModel.value.value);
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
      selectDepartmentEvent,
      filterFn,
      mappedDepartments,
      options,
      departmentModel,
    };
  },
});
</script>
