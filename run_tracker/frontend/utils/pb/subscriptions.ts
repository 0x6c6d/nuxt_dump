import type { SubscriptionRecord } from "../export";

export async function getUserSubcriptionType(userId: string) {
  const { $pb } = useNuxtApp();

  try {
    const record = (await $pb
      .collection("subscriptions")
      .getOne(userId)) as SubscriptionRecord;

    return record.subscriptionType;
  } catch (error) {
    console.error("Failed to fetch subscription data:", error);
    navigateTo("error");
  }
}
