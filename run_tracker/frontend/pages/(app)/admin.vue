<template>
  <div>
    <h1>Admin Dashboard</h1>
    <!-- Admin content here -->
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth", "role"],
  requiredRole: "admin",
});
</script>
