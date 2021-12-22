<script>
import { defineComponent } from "vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

export default defineComponent({
  components: { Login, Register },
});
</script>

<template>
  <div
    class="
      container
      max-w-screen-sm
      flex flex-col
      content-center
      justify-center
      h-[100vh]
    "
  >
    <sl-card class="!border-none !outline-none shadow-lg">
      <sl-tab-group>
        <sl-tab slot="nav" panel="login" active>Login</sl-tab>
        <sl-tab slot="nav" panel="register">Register</sl-tab>

        <sl-tab-panel name="login">
          <login />
        </sl-tab-panel>
        <sl-tab-panel name="register">
          <register />
        </sl-tab-panel>
      </sl-tab-group>
    </sl-card>
  </div>
</template>
