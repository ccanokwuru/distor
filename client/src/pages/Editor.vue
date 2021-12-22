<template>
  <section class="editor-wrapper">
    <editor-component />
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import EditorComponent from "../components/EditorComponent.vue";

export default defineComponent({
  components: { EditorComponent },
  setup(props) {
    return {};
  },
});
</script>
