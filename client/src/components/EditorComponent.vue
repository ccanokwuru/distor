<template>
  <section ref="editor" class="min-h-20"></section>
</template>
<script script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";

// Quill for doc;
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import Quill, { QuillOptionsStatic } from "quill";
import QuillCursors from "quill-cursors";
import { useRoute } from "vue-router";

Quill.register("modules/cursors", QuillCursors);

const toolbarOpts = [
  [
    "bold",
    "italic",
    "underline",
    "strike",
    { script: "super" },
    { script: "sub" },
    { font: [] },
    { size: [] },
    { color: [] },
    { background: [] },
  ],
  [
    { header: [1, 2, 3, 4, 5, 6, false] },
    { align: [] },
    { list: "ordered" },
    { list: "bullet" },
    { indent: "-1" },
    { indent: "+1" },
    { direction: "rtl" },
    "image",
    "video",
    "link",
    "code-block",
    "blockquote",
    "clean",
  ],
];

const options = {
  theme: "snow",
  // boundary: document.body,
  modules: {
    // syntax: true,
    cursors: true,
    toolbar: toolbarOpts,
    history: {
      // Local undo shouldn't undo changes
      // from remote users
      userOnly: true,
    },
  },
  readOnly: false,
};

export default defineComponent({
  setup() {
    const editor = ref(null);

    const router = useRoute();

    const docId = router.params.id;

    const init = () => {
      if (editor.value) {
        const wrapper = document.createElement("div");

        editor.value.appendChild(wrapper);
        const quill = new Quill(wrapper, options);
        return quill;
      }
    };

    onMounted(() => {
      const editor = init();

      const ws = new window.WebSocket("ws://localhost:5000");
      editor.on("text-change", (n, o) => {
        console.log({ new: n, old: o });
      });
      editor.on("selection-change", (n, o) => {
        console.log({ new: n, old: o });
      });
    });
    return { editor };
  },
});
</script>

<style scoped>
/* .editor-wrapper {
  @apply mt-[60px] fixed w-[100vw];
  height: calc(100vh - 100px);
}

.ql-container {
  @apply !border-none !object-fill !overflow-y-auto;
}

.ql-editor {
  @apply !max-w-[210mm] mx-auto my-5 bg-white !shadow-lg !rounded-sm !p-20;
}

.ql-toolbar {
  @apply !sticky !w-full bg-white z-50 !border-none shadow-md justify-center flex;
} */
</style>
