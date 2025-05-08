<template>
  <SiteLogin />
</template>

<script setup lang="ts">
const { $pb } = useNuxtApp();

onMounted(() => {
  if ($pb.authStore.isValid) {
    navigateTo("/dashboard");
  }
});
</script>
