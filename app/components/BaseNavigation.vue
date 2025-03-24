<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const randomPath = "/recipes/random";
const searchQuery = ref("");

const menuOpen = ref(false); // Track mobile menu state

const handleSearch = () => {
  if (!searchQuery.value) return;
  // Use navigateTo for programmatic navigation
  navigateTo(`/search/${encodeURIComponent(searchQuery.value)}`);
};

const handleRandomRecipeClick = () => {
  if (route.path === randomPath) {
    // If already on the random recipe page, force a full page reload using window.location.href
    // window.location.href = randomPath;
    window.location.reload();
  } else {
    // Otherwise, navigate to the random recipe page normally
    router.push(randomPath);
  }
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
</script>

<template>
  <header class="py-4 border-b bg-white shadow-md">
    <nav class="container flex items-center justify-between px-4 md:px-6">
      <NuxtLink to="/" class="flex gap-2 items-center">
        <NuxtImg
          width="56px"
          densities="x1"
          src="/logo.svg"
          format="webp"
          alt="NuxtRecipes Logo"
        />
        <!-- <span class="text-3xl font-bold">NuxtRecipes</span> -->
        <span class="text-2xl md:text-3xl font-bold">NuxtRecipes</span>
      </NuxtLink>

      <div class="hidden md:flex flex-1 justify-center gap-4">
        <!-- Programmatic navigation (needs navigateTo) -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search recipes..."
          class="px-4 py-2 border rounded-lg w-full max-w-md"
          @keyup.enter="handleSearch"
        />

        <BaseBtn @click="handleSearch" label="Search" />
      </div>

      <div class="md:hidden">
        <button @click="toggleMenu" class="text-2xl">☰</button>
      </div>

      <ul class="hidden md:flex gap-6 ml-auto text-lg font-semibold capitalize">
        <!-- <li v-if="route != randomPath">
          <NuxtLink :to="randomPath" class="hover:text-dodgeroll-gold-300"
            >Random Recipe</NuxtLink
          >
        </li> -->
        <!-- NuxtLink is designed for client-side navigation, which means it will not reload the page if you're already on the same route. -->
        <li>
          <a
            @click.prevent="handleRandomRecipeClick"
            class="hover:text-dodgeroll-gold-300 cursor-pointer text-xl font-bold capitalize"
          >
            Random Recipe
          </a>
        </li>
        <!-- <li>
          <NuxtLink to="/about">About</NuxtLink>
        </li> -->
      </ul>
    </nav>

    <div
      v-if="menuOpen"
      class="md:hidden flex flex-col items-center gap-4 p-4 bg-white shadow-md border-t"
    >
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search recipes..."
        class="px-4 py-2 border rounded-lg w-full"
        @keyup.enter="handleSearch"
      />
      <BaseBtn @click="handleSearch" label="Search" class="w-full" />
      <a
        @click.prevent="handleRandomRecipeClick"
        class="hover:text-dodgeroll-gold-300 cursor-pointer text-lg font-bold capitalize"
      >
        Random Recipe
      </a>
    </div>
  </header>
</template>

<style scoped>
@media (max-width: 768px) {
  .menu {
    display: none;
  }
}
</style>
