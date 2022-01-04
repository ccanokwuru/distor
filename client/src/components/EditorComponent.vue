<template>
  <section ref="editor" class="min-h-20"></section>
</template>
<script script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";

// Quill for doc;
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import Quill from "quill";
import { useRoute } from "vue-router";
import { APISettings } from "../api";

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
    const content = ref(null);

    const getData = async () => {
      const result = await fetch(
        `http://${APISettings.baseURL}/docs/s/${docId}`,
        {
          method: "GET",
          headers: APISettings.headers,
        }
      );

      if (result.status !== 200) return;

      const json = await result.json();

      content.value = json.content;
    };

    const wsConn = () => {
      const ws = new WebSocket(
        `ws://${APISettings.baseURL}/docs/share/${docId}`
      );

      ws.onopen = () => {
        console.log("connected to server you can collaborate");
      };

      ws.onclose = () => {
        console.log("you are offline!! reconnecting to server");
        setTimeout(() => {
          wsConn();
        }, 1000);
      };

      return ws;
    };

    const saveDoc = () => {
      const result = fetch(
        `http://${APISettings.baseURL}/docs/update/${docId}`,
        {
          method: "POST",
          headers: APISettings.headers,
          body: JSON.stringify({ content: content.value }),
        }
      );
    };

    const init = () => {
      if (editor.value) {
        const wrapper = document.createElement("div");

        // @ts-ignore
        editor.value.appendChild(wrapper);
        const quill = new Quill(wrapper, {
          ...options,
          scrollingContainer: "#editor-scroll",
        });

        if (content.value) quill.setContents(JSON.parse(content.value));

        return quill;
      }
    };

    onMounted(async () => {
      await getData();
      const quill = init();
      const ws = wsConn();

      quill?.on("text-change", (n, o, s) => {
        content.value = JSON.stringify(quill?.getContents());
        if (s !== "user") return;
        ws.send(JSON.stringify({ type: "update", data: JSON.stringify(n) }));
      });

      // ws.onmessage = async (e) => {
      //   const { data } = e;
      //   const raw = JSON.parse(data);
      //   quill?.updateContents(raw);
      // };

      setInterval(() => {
        saveDoc();
      }, 20000);
    });

    onBeforeUnmount(() => {
      saveDoc();
    });

    return { editor };
  },
});
</script>
