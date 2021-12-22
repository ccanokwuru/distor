<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    // @ts-ignore
    const login = (e) => {
      // @ts-ignore
      const dataArr = e.detail.formControls;
      let data = {};
      dataArr.forEach((item) => {
        // @ts-ignore
        if (item.name) data[item.name] = item.value;
      });
      console.log(data);
    };

    return {
      login,
    };
  },
});
</script>

<template>
  <div>
    <sl-form class="flex-grow self-center" @sl-submit="login">
      <sl-input
        placeholder="example@domain.com"
        label="Email"
        class="mb-5"
        name="email"
      ></sl-input>
      <sl-input
        placeholder="*****"
        label="Password"
        type="password"
        toggle-password
        class="mb-5"
        name="password"
      ></sl-input>
      <sl-button submit> Login </sl-button>
    </sl-form>
  </div>
</template>
