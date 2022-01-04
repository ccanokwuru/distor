<script>
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { APISettings } from "../api";

export default defineComponent({
  setup() {
    const store = useStore();

    const user = computed(() => store.state.user);
    // store.state.user.commit("setUser", user.user);

    const router = useRouter();
    const documents = ref(null);
    // @ts-ignore
    const email = user.value.email;
    const getDocuments = async () => {
      const response = await fetch(
        `http://${APISettings.baseURL}/docs/user/?email=${email}`,
        {
          method: "GET",
          headers: APISettings.headers,
        }
      );

      if (response.status !== 200) return;

      // @ts-ignore
      documents.value = await response.json();
    };

    onMounted(() => {
      getDocuments();
    });

    return {
      documents,
      router,
    };
  },
});
</script>

<template>
  <div
    class="
      doc-list
      container
      w-lg
      flex flex-wrap
      gap-x-5 gap-y-2
      md:gap-x-10
      pt-10
      justify-around
      md:justify-center
    "
  >
    <div
      v-for="document in documents"
      :key="document?.id"
      class="
        !w-[150px]
        !h-[150px]
        !border-none
        !outline-none
        flex flex-col
        justify-center
        content-center
        text-center
        rounded-lg
        shadow-md
        bg-white
        overflow-hidden
      "
    >
      <sl-icon-button
        class="text-6xl font-bold self-center"
        name="file-earmark-richtext"
        @click="router.push(`/doc/${document?.slug}`)"
      />
      <h5 class="font-semibold text-lg mt-2">{{ document?.title }}</h5>
    </div>
  </div>
</template>
