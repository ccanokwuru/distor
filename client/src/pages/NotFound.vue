<template>
  <div
    class="
      p-10
      md:p-20
      fixed
      z-50
      w-screen
      h-screen
      flex flex-col
      justify-center
      content-around
    "
  >
    <div
      class="
        container
        shadow-lg
        rounded-2xl
        flex flex-col
        justify-center
        content-around
        bg-white
        max-w-screen-sm
        py-10
        md:py-20
        text-center
      "
    >
      <h2
        class="text-blue-900 text-3xl md:text-5xl font-extrabold mb-1 md:mb-5"
      >
        Oop!
      </h2>
      <h4
        class="
          text-gray-600 text-lg
          md:text-xl
          font-bold
          mb-7
          md:mb-10
          capitalize
        "
      >
        seems nothing is here
      </h4>
      <div class="">
        <router-link to="/" class="btn bg-blue-900 text-white hover:bg-gray-800"
          >Way Home</router-link
        >
      </div>
    </div>
  </div>
</template>
