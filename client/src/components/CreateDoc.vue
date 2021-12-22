<script>
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const name = ref("");
    const dialog = ref(null);
    const router = useRouter();

    const create = async() => {
      console.log(name.value);
      // @ts-ignore
      await dialog.value.hide();
      router.push(`/doc/${name.value}`);
    };

    const openDialog = () => {
      // @ts-ignore
      dialog.value.show();
    };

    return {
      create,
      name,
      openDialog,
      dialog,
    };
  },
});
</script>

<template>
  <div class="container mt-5 py-5 max-w-screen-lg">
    <sl-dialog label="Create A New Document" ref="dialog">
      <sl-form class="flex-grow mx-5 self-center" @sl-submit="create">
        <sl-input
          placeholder="Document Title"
          clearable
          :value="name"
          @keypress.enter="create"
          @input="name = $event.target.value"
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
