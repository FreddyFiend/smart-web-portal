<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> {{ store.title }} </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered side="right">
      <q-list
        ><q-item-label header> Smart Web Portal </q-item-label>
        <q-item to="/" clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="home" />
          </q-item-section>

          <q-item-section>Home</q-item-section>
        </q-item>

        <div v-if="store.user">
          <q-item to="profile" clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="primary" name="person" />
            </q-item-section>

            <q-item-section>My Profile</q-item-section>
          </q-item>
          <q-item @click="logOut()" clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="red" name="logout" />
            </q-item-section>

            <q-item-section>Sign Out</q-item-section>
          </q-item>
          <q-item
            to="teacherpage"
            clickable
            v-ripple
            v-if="
              store.user.roles.includes('admin') ||
              store.user.roles.includes('teacher')
            "
          >
            <q-item-section avatar>
              <q-icon color="secondary" name="school" />
            </q-item-section>

            <q-item-section>Teacher's Portal</q-item-section>
          </q-item>
          <q-item
            to="adminpage"
            clickable
            v-ripple
            v-if="store.user.roles.includes('admin')"
          >
            <q-item-section avatar>
              <q-icon color="secondary" name="security" />
            </q-item-section>

            <q-item-section>Admin's Portal</q-item-section>
          </q-item>
        </div>
        <div v-if="!store.user">
          <q-item to="login" clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="primary" name="login" />
            </q-item-section>

            <q-item-section>Login</q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useSwpStore } from "src/stores/swp";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    const leftDrawerOpen = ref(false);
    const store = useSwpStore();

    return {
      leftDrawerOpen,
      store,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      logOut() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        store.setToken("");
        store.setUser("");
        this.$router.push("/");
      },
    };
  },
});
</script>
