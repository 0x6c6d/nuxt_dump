export default defineNuxtRouteMiddleware((to) => {
  const { $pb } = useNuxtApp();

  if (!$pb.authStore.isValid) {
    // Store the original destination to redirect back after login
    if (to.path !== "/login") {
      return navigateTo({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    }
    return navigateTo("/login");
  }
});
