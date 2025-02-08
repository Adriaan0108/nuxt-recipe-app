<script setup lang="ts">
const route = useRoute().path;
const randomPath = "/recipes/random";
const searchQuery = ref("");

const handleSearch = () => {
  if (!searchQuery.value) return;
  // Use navigateTo for programmatic navigation
  navigateTo(`/search/${encodeURIComponent(searchQuery.value)}`);
};
</script>

<template>
  <header class="py-4 border-b">
    <nav class="flex container items-center">
      <NuxtLink to="/" class="flex gap-1 items-center">
        <NuxtImg
          width="56px"
          densities="x1"
          src="/icon-green.png"
          format="webp"
          alt=""
        />
        <span class="text-3xl font-bold">Nuxtcipes</span>
      </NuxtLink>

      <div class="flex-1 flex justify-center gap-4">
        <!-- Programmatic navigation (needs navigateTo) -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search recipes..."
          class="px-4 py-2 border rounded-lg w-96"
          @keyup.enter="handleSearch"
        />
        <!-- <BaseBtn :to="`/search/${searchQuery}`" label="Search" /> -->
        <BaseBtn @click="handleSearch" label="Search" />
      </div>
      <ul class="flex gap-6 ml-auto text-xl font-bold capitalize">
        <!-- <li>
          <NuxtLink to="/">Home</NuxtLink>
        </li> -->
        <li v-if="route != randomPath">
          <NuxtLink :to="randomPath">Random Recipe</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about">About</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped></style>
