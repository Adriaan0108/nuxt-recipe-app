<script setup>
useHead({
  link: [
    {
      rel: "manifest",
      href: "/manifest.webmanifest",
    },
  ],
});
</script>

<template>
  <div class="font-Montserrat">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
