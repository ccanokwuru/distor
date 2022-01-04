<script>
import { defineComponent, ref } from "vue";
import { APISettings } from "../api";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const msg = ref(null);
    const store = useStore();
    // @ts-ignore
    const register = async (e) => {
      // @ts-ignore
      const dataArr = e.detail.formControls;

      const router = useRouter();
      let data = {};
      // @ts-ignore
      dataArr.forEach((item) => {
        // @ts-ignore
        if (item.name) data[item.name] = item.value;
      });
      const result = await fetch(
        `http://${APISettings.baseURL}/user/register`,
        {
          method: "POST",
          headers: APISettings.headers,
          body: JSON.stringify(data),
        }
      );

      if (result.status !== 201) {
        const json = await result.json();
        const serverMsg = json.msg;
        // @ts-ignore
        return (msg.value = serverMsg);
      }

      // @ts-ignore
      msg.value = "successful";
      const user = await result.json();
      store.commit("setUser", user.user);

      router.push("/");
    };
    return {
      register,
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

    <sl-form class="flex-grow self-center" @sl-submit="register">
      <sl-input
        placeholder="John Doe"
        label="Name"
        class="mb-5"
        name="name"
        required
      ></sl-input>
      <sl-input
        placeholder="example@domain.com"
        label="Email"
        class="mb-5"
        name="email"
        type="email"
        required
      ></sl-input>
      <sl-input
        placeholder="*****"
        label="Password"
        type="password"
        toggle-password
        class="mb-5"
        name="password"
        required
      ></sl-input>
      <sl-input
        placeholder="*****"
        label="Confirm Password"
        type="password"
        toggle-password
        class="mb-5"
        name="confirm"
        required
      ></sl-input>
      <sl-button submit> Register </sl-button>
    </sl-form>
  </div>
</template>
