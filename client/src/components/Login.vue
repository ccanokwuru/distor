<script>
import { defineComponent, ref } from "vue";
import { APISettings } from "../api";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const msg = ref(null);
    const router = useRouter();
    const store = useStore();

    // @ts-ignore
    const login = async (e) => {
      // @ts-ignore
      const dataArr = e.detail.formControls;
      let data = {};
      // @ts-ignore
      dataArr.forEach((item) => {
        // @ts-ignore
        if (item.name) data[item.name] = item.value;
      });

      const result = await fetch(`http://${APISettings.baseURL}/user/login`, {
        method: "POST",
        headers: APISettings.headers,
        body: JSON.stringify(data),
      });

      if (result.status !== 200) {
        const json = await result.json();
        const serverMsg = json.msg;
        // @ts-ignore
        return (msg.value = serverMsg);
      }
      // @ts-ignore
      msg.value = "successful";
      const user = await result.json();

      localStorage.setItem("user", JSON.stringify(user.user));

      store.dispatch("getUser");

      router.push("/");
    };

    return {
      login,
      msg,
    };
  },
});
</script>

<template>
  <div>
    <sl-alert :open="msg" class="my-3" closable>
      <sl-icon
        slot="icon"
        :name="msg === 'successful' ? 'check2-circle' : 'exclamation-octagon'"
      />
      <strong>
        {{ msg }}
      </strong>
    </sl-alert>
    <sl-form class="flex-grow self-center" @sl-submit="login">
      <sl-input
        placeholder="example@domain.com"
        label="Email"
        class="mb-5"
        name="email"
        type="email"
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
