<template>
  <section ref="editor" class="min-w-[80vh] h-full"></section>
</template>
<script script lang="ts">
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

// import * as Y from "yjs";
// import { WebsocketProvider } from "y-websocket";
// import { QuillBinding } from "y-quill";

import { defineComponent, onMounted, ref } from "vue";
import Quill, { QuillOptionsStatic } from "quill";
// import Quill from "quill";
import QuillCursors from "quill-cursors";

Quill.register("modules/cursors", QuillCursors);

const toolbarOpts = [
  [
    "bold",
    "italic",
    "underline",
    "strike",
    { script: "super" },
    { script: "sub" },
  ],
  [{ font: [] }, { size: [] }, { color: [] }, { background: [] }],
  [
    { header: [1, 2, 3, 4, 5, 6, false] },
    { align: [] },
    { list: "ordered" },
    { list: "bullet" },
    { indent: "-1" },
    { indent: "+1" },
    { direction: "rtl" },
  ],
  ["image", "video", "link", "code-block", "blockquote", "clean"],
];

const options = {
  theme: "snow",
  // boundary: document.body,
  modules: {
    // syntax: true,
    cursors: true,
    toolbar: toolbarOpts,
  },
  readOnly: false,
};

export default defineComponent({
  setup() {
    const editor = ref(null);

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
