<template>
  <section ref="editor" class="min-h-20"></section>
</template>
<script script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";

import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { QuillBinding } from "y-quill";

// Quill for doc;
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import { useRoute } from "vue-router";
import { IndexeddbPersistence } from "y-indexeddb";

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

    const ydoc = new Y.Doc();
    const localSave = new IndexeddbPersistence(docId, ydoc);
    const provider = new WebsocketProvider(
      "ws://127.0.0.1:5000/docs/share",
      docId,
      ydoc
    );

    const saveDoc = async (val) => {
      if (editor.value) {
        // await fetch()
      }
    };

    const insertContet = () => {
      if (quill.value) {
        const content = quill.value.setText();
      }
    };

    const init = () => {
      if (editor.value) {
        const wrapper = document.createElement("div");

        editor.value.appendChild(wrapper);
        const quill = new Quill(wrapper, {
          ...options,
          scrollingContainer: "#editor-scroll",
        });
        return quill;
      }
    };

    const getColor = () => {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    };

    const getUser = () => {
      const users = ["Tim", "John", "Chisom", "Christian"];
      const randomUser = Math.floor(Math.random() * users.length);
      return users[randomUser];
    };

    const userInfo = {
      name: getUser(),
      color: getColor(),
    };

    onMounted(() => {
      const ytext = ydoc.getText("quill");
      const quill = init();

      const binding = new QuillBinding(ytext, quill, provider.awareness);

      provider.connect();

      provider.awareness.setLocalStateField("user", userInfo);
      setInterval(() => {
        if (quill) saveDoc(quill.getText);
      }, 2500);
    });

    onUnmounted(() => {
      provider.disconnect();
    });
    return { editor };
  },
});
</script>
