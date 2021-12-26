<template>
  <section ref="editor" class="min-h-20"></section>
</template>
<script script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";

// import * as Y from "yjs";
// import { WebsocketProvider } from "y-websocket";
// import { QuillBinding } from "y-quill";

// Quill for doc;
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import { useRoute } from "vue-router";
// import { IndexeddbPersistence } from "y-indexeddb";

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

    // const ydoc = new Y.Doc();
    // // const localSave = new IndexeddbPersistence(docId, ydoc);
    // const provider = new WebsocketProvider(
    //   // "ws://192.168.43.62:5000/docs/share",
    //   "ws://127.0.0.1:5000/docs/share",
    //   docId,
    //   ydoc
    // );

    const saveDoc = async (val) => {
      if (editor.value) {
        const content = quill.value.getText();
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
      // const ytext = ydoc.getText("quill");
      const quill = init();

      // const binding = new QuillBinding(ytext, quill, provider.awareness);

      // provider.connect();

      // provider.awareness.setLocalStateField("user", userInfo);

      quill?.on("text-change", (delta, oldDelta, source) => {
        if (source === "user") {
          broadcastUpdate(delta);
        }
      });

      quill?.on("text-change", (delta, oldDelta, source) => {
        if (source === "user") {
        }
      });

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

<style scoped>
.editor-wrapper {
  @apply pt-[150px] md:pt-[120px] lg:pt-[100px] fixed h-screen overflow-y-auto w-full pb-5;
}

.ql-container {
  @apply !border-none w-screen mb-5 pb-4;
  /* min-height: calc(100vh - 120px) !important; */
}

.ql-editor {
  @apply md:!max-w-[210mm] w-full mx-auto mt-5 bg-white !shadow-lg !rounded-sm !p-10 md:!p-20 !min-h-[80vh];
}

.ql-toolbar {
  @apply !fixed !w-full bg-white z-50 !border-none shadow-md justify-center flex top-[62px];
}
</style>
