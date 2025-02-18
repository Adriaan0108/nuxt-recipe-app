<script setup lang="ts">
defineProps({
  label: String,
  to: String,
});
</script>

<template>
  <NuxtLink
    :to="to"
    class="px-4 py-2 text-white self-start bg-dodgeroll-gold-400 rounded-md text-base lg:text-lg cursor-pointer text-center"
  >
    <slot> {{ label }} </slot>
    <!-- can pass in slot to override label value -->
  </NuxtLink>
</template>
