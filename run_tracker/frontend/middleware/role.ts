interface RouteMetaWithRole {
  requiredRole?: string;
}

export default defineNuxtRouteMiddleware((to) => {
  const { $pb } = useNuxtApp();
  const meta = to.meta as RouteMetaWithRole;
  const requiredRole = meta.requiredRole;

  if (requiredRole) {
    const user = $pb.authStore.record;
    const userRole = user?.role;

    if (!userRole || userRole !== requiredRole) {
      return navigateTo("/unauthorized");
    }
  }
});
