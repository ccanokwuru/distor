<script>
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { APISettings } from "../api";

export default defineComponent({
  setup() {
    const title = ref("");
    const dialog = ref(null);
    const msg = ref(null);
    const router = useRouter();
    const store = useStore();

    const create = async () => {
      const user = computed(() => store.state.user);

      // @ts-ignore
      const { email } = user.value;

      const result = await fetch(`http://${APISettings.baseURL}/docs/create`, {
        method: "POST",
        headers: APISettings.headers,
        body: JSON.stringify({ title: title.value, email: email }),
      });

      if (result.status !== 201)
        // @ts-ignore
        return (msg.value = "error creating this file");

      const json = await result.json();
      // @ts-ignore
      await dialog.value.hide();
      router.push(`/doc/${json.slug}`);
    };

    const openDialog = () => {
      // @ts-ignore
      dialog.value.show();
    };

    return {
      create,
      title,
      openDialog,
      dialog,
      msg,
    };
  },
});
</script>

<template>
  <div class="container mt-5 py-5 max-w-screen-lg">
    <sl-dialog label="Create A New Document" ref="dialog">
      <sl-alert :open="msg" class="my-3" closable>
        <sl-icon
          slot="icon"
          :name="msg === 'successful' ? 'check2-circle' : 'exclamation-octagon'"
        />
        <strong>
          {{ msg }}
        </strong>
      </sl-alert>
      <sl-form class="flex-grow mx-5 self-center" @sl-submit="create">
        <sl-input
          placeholder="Document Title"
          clearable
          :value="title"
          @keypress.enter="create"
          @input="title = $event.target.value"
        >
          <sl-icon-button
            class="text-xl"
            slot="suffix"
            name="check"
            @click="create"
          >
          </sl-icon-button>
        </sl-input>
      </sl-form>
    </sl-dialog>

    <h2 class="text-xl mt-0 mb-3 font-bold">Create A New Document</h2>
    <sl-icon-button
      class="text-6xl font-bold rounded-lg shadow-md bg-white"
      name="plus"
      @click="openDialog"
    />
  </div>
</template>
