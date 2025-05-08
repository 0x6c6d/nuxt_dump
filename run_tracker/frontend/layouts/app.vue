<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  signOut();
  router.push("/");
};

const goToProfile = () => {
  router.push("/profile");
};
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navbar -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Left side: App name -->
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-gray-800">Run Tracker</h1>
            </div>
          </div>

          <!-- Right side: Logout and Profile buttons -->
          <div class="flex items-center">
            <button class="btn btn-square mr-2" @click="goToProfile">
              <Icon
                name="uil:user"
                style="color: black; width: 21px; height: 21px"
              />
            </button>
            <button class="btn btn-neutral btn-outline" @click="logout">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>
