<template>
  <q-page class="flex flex-center">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        filled
        v-model="email"
        label="Your email"
        hint="Name and surname"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      {{ email }}
      <q-input
        filled
        type="password"
        v-model="password"
        label="Your password"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { api } from "src/boot/axios";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const email = ref(null);
    const password = ref(null);
    const onSubmit = () => {
      console.log(email);
      api
        .post("user/login", {
          email: email.value,
          password: password.value,
        })
        .then((res) => {
          console.log(res.data);
        });
    };
    return {
      model: ref(null),
      email,
      password,
      onSubmit,
    };
  },
});
</script>
