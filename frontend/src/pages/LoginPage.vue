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
      <q-input
        filled
        type="password"
        v-model="password"
        label="Your password"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <div>
        <q-btn label="Login" type="submit" color="primary" />
      </div>
      <q-btn
        label="Login as Teacher"
        type="submit"
        color="primary"
        @click="setLoginValues('teacher@swp.com', 'password')"
      />

      <q-btn
        label="Login as admin"
        type="submit"
        color="primary"
        @click="setLoginValues('admin@swp.com', 'password')"
      />
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
  name: "LoginPage",
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const store = useSwpStore();
    const email = ref("");
    const password = ref("");
    const onSubmit = () => {
      console.log(email);
      api
        .post("user/login", {
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
          router.push("/");
        })
        .catch((err) => {
          console.log(err.response.data);
          $q.notify({
            message: err.response.data.msg,
            color: "red",
          });
        });
    };
    return {
      router,
      model: ref(null),
      email,
      password,
      onSubmit,
      store,
      setLoginValues(email, password) {
        this.email = email;
        this.password = password;
      },
    };
  },
  created() {
    this.store.setTitle("Login");
  },
});
</script>
