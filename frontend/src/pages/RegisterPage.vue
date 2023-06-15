<template>
  <q-page class="flex flex-center">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        outlined=""
        v-model="username"
        label="Your name"
        hint="Name and surname"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        outlined=""
        v-model="email"
        label="Your email"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        outlined=""
        type="password"
        v-model="password"
        label="Your password"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <div>
        <q-btn label="Register" type="submit" color="secondary" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { api } from "src/boot/axios";
import { useSwpStore } from "src/stores/swp";
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "RegisterPage",
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const store = useSwpStore();
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const onSubmit = () => {
      console.log(email);
      api
        .post("user/signup", {
          username: username.value,
          email: email.value,
          password: password.value,
        })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("token", res.data.token);
          store.setUser(res.data.user);
          store.setToken(res.data.token);
          api.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.token;
          console.log(res.data);
          router.push("/");
          $q.notify({
            message: res.data.msg,
            color: "green",
          });
        })
        .catch((err) => {
          console.error(err);
          $q.notify({
            message: err.response.data.msg,
            color: "red",
          });
        });
    };
    return {
      router,
      model: ref(null),
      username,
      email,
      password,
      onSubmit,
      store,
    };
  },
  created() {
    this.store.setTitle("Register");
  },
});
</script>
