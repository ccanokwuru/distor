<template>
  <main class="">
    <!-- header -->
    <header
      v-if="!notFound"
      :class="'bg-white fixed top-0 z-50 w-full' + (editor ? '' : ' shadow-md')"
    >
      <nav
        class="
          mx-auto
          px-5
          max-w-screen-lg
          flex
          py-3
          content-center
          justify-between
          gap-5
          md:gap-10
        "
      >
        <!-- logo -->
        <h1 class="col text-lg font-bold self-center hover:text-sky-600">
          <router-link to="/" exact>DISTOR</router-link>
        </h1>

        <!-- search -->
        <div class="flex flex-grow sm:flex-shrink-0">
          <sl-form class="flex-grow self-center" @sl-submit="search">
            <sl-input
              placeholder="Search"
              name="search"
              clearable
              :value="searchText"
              @input="searchText = $event.target.value"
              @keypress.enter="search"
            >
              <sl-icon-button
                slot="suffix"
                class="text-xl self-center"
                name="search"
                @click="search"
              >
              </sl-icon-button>
            </sl-input>
          </sl-form>
        </div>
        <!-- account -->
        <div class="col self-center">
          <!-- <sl-avatar></sl-avatar> -->
          <sl-dropdown>
            <sl-icon-button
              slot="trigger"
              name="person-circle"
              class="text-3xl"
            ></sl-icon-button>
            <!-- <sl-button  caret>AC</sl-button> -->
            <sl-menu>
              <sl-menu-item
                @click="router.push({ name: 'auth' })"
                v-if="!user?.email"
              >
                Login
              </sl-menu-item>
              <sl-menu-item @click="logout()" v-else> Logout </sl-menu-item>
            </sl-menu>
          </sl-dropdown>
        </div>
      </nav>
    </header>

    <!-- router-view -->
    <router-view
      v-slot="{ Component }"
      :class="!notFound && !editor ? 'pt-[65px]' : ''"
    >
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { APISettings } from "../api";

export default defineComponent({
  setup() {
    const searchText = ref("");
    const msg = ref(null);
    const router = useRouter();
    const store = useStore();
    const notFound = computed(
      () => router.currentRoute.value.name === "NotFound"
    );
    const editor = computed(() => router.currentRoute.value.name === "doc");

    const user = computed(() => store.dispatch("getUser"));

    const logout = async () => {
      const response = await fetch(
        `http://${APISettings.baseURL}/user/logout`,
        {
          method: "POST",
          headers: APISettings.headers,
          body: JSON.stringify(user.value),
        }
      );
      const json = await response.json();

      msg.value = json.msg;
      if (response.status !== 200) return;

      // @ts-ignore
      store.commit("setUser", { email: null, name: null });
      localStorage.removeItem("user");

      router.push("/");
    };

    const search = () => {
      console.log(searchText.value);
    };

    return {
      notFound,
      editor,
      router,
      searchText,
      logout,
      search,
      user,
    };
  },
});
</script>
