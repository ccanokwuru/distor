<script>
import { defineComponent } from "vue";
import CreateDoc from "../components/CreateDoc.vue";
import ListDoc from "../components/ListDoc.vue";

export default defineComponent({
  components: {
    CreateDoc,
    ListDoc,
  },
});
</script>

<template>
  <div>
    <create-doc />
    <section class="bg-white">
      <list-doc />
    </section>
  </div>
</template>
