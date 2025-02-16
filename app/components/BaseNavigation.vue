<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const randomPath = "/recipes/random";
const searchQuery = ref("");

const handleSearch = () => {
  if (!searchQuery.value) return;
  // Use navigateTo for programmatic navigation
  navigateTo(`/search/${encodeURIComponent(searchQuery.value)}`);
};

// Handle Random Recipe link click
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
        <!-- <li v-if="route != randomPath">
          <NuxtLink :to="randomPath" class="hover:text-dodgeroll-gold-300"
            >Random Recipe</NuxtLink
          >
        </li> -->
        <!-- NuxtLink is designed for client-side navigation, which means it will not reload the page if you're already on the same route. -->
        <li>
          <a
            @click.prevent="handleRandomRecipeClick"
            class="hover:text-dodgeroll-gold-300 cursor-pointer"
          >
            Random Recipe
          </a>
        </li>
        <!-- <li>
          <NuxtLink to="/about">About</NuxtLink>
        </li> -->
      </ul>
    </nav>
  </header>
</template>

<style scoped></style>
