import type { RunViewModel, Run } from "~/types/custom";

export async function addRunAsync(run: RunViewModel) {
  const { $pb } = useNuxtApp();
  const record = await $pb.collection("runs").create(run);
  // TODO: 400, 403 error handling
  return record.id;
}

export async function loadRunsAsync(): Promise<Run[]> {
  const { $pb } = useNuxtApp();
  const records = await $pb.collection("runs").getFullList({
    sort: "-date",
  });

  return records.map((record) => ({
    id: record.id,
    userId: record.userId,
    date: new Date(record.date),
    distance: record.distance,
    comment: record.comment,
  }));
}

export async function deleteRunAsync(id: string) {
  const { $pb } = useNuxtApp();
  return await $pb.collection("runs").delete(id);
}
