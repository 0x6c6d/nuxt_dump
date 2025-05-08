import { getUserSubcriptionType } from "~/utils/pb/subscriptions";

interface RouteMetaWithRole {
  requiredSub?: string | string[];
}

export default defineNuxtRouteMiddleware(async (to) => {
  const { $pb } = useNuxtApp();
  const meta = to.meta as RouteMetaWithRole;
  const requiredSub = meta.requiredSub;

  if (requiredSub) {
    const user = $pb.authStore.record;
    if (!user) {
      return navigateTo("/unauthorized");
    }

    const subType = await getUserSubcriptionType(user.id);

    if (Array.isArray(requiredSub)) {
      if (!requiredSub.includes(subType ?? "free")) {
        return navigateTo("/unauthorized");
      }
    } else {
      if (subType !== requiredSub) {
        return navigateTo("/unauthorized");
      }
    }
  }
});
