import type { RecordModel } from "pocketbase";

export interface SubscriptionRecord extends RecordModel {
  collectionId: string;
  collectionName: string;
  id: string;
  userId: string;
  subscriptionType: "free" | "basic" | "premium";
  subscriptionStatus: "active" | "expired" | "canceled" | "trial";
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  lastPaymentDate: string;
  autoRenew: boolean;
  created: string;
  updated: string;
}
