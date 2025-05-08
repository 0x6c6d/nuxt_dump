<script setup lang="ts">
import type { Run } from "~/types/custom";

definePageMeta({
  layout: "app",
  middleware: ["auth"],
});

const { $pb } = useNuxtApp();

const runs = ref<Run[]>([]);
const isLoading = ref(true);
const isModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const isEditing = ref(false);
const currentRunId = ref("");
const formData = ref({
  date: new Date(),
  distance: 0,
  comment: "",
});

onMounted(async () => {
  runs.value = await loadRunsAsync();
  isLoading.value = false;
});

// Open the modal to add a new run
const openAddModal = () => {
  isEditing.value = false;
  formData.value = {
    date: new Date(),
    distance: 0,
    comment: "",
  };
  isModalOpen.value = true;
};

// Open the modal to edit an existing run
const openEditModal = (run: Run) => {
  isEditing.value = true;
  currentRunId.value = run.id;
  formData.value = {
    date: run.date,
    distance: run.distance,
    comment: run.comment || "",
  };
  isModalOpen.value = true;
};

// Close the modal
const closeModal = () => {
  isModalOpen.value = false;
};

// Save the run (create or update)
const saveRun = async () => {
  try {
    await addRunAsync({
      distance: formData.value.distance,
      date: formData.value.date,
      comment: formData.value.comment,
      userId: $pb.authStore.record!.id,
    });

    runs.value = await loadRunsAsync();
    closeModal();
  } catch (error) {
    console.error("Error saving run:", error);
  }
};

// Confirm delete modal
const confirmDelete = (id: string) => {
  currentRunId.value = id;
  isDeleteModalOpen.value = true;
};

// Delete a run
const deleteRun = async () => {
  await deleteRunAsync(currentRunId.value);
  runs.value = await loadRunsAsync();
  isDeleteModalOpen.value = false;
};
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">My Runs</h1>
      <button @click="openAddModal" class="btn btn-primary">
        <Icon name="uil:plus" style="color: white; height: 21px; width: 21px" />
        Add New Run
      </button>
    </div>

    <!-- Runs Table -->
    <div class="overflow-x-auto mb-6">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Date</th>
            <th>Distance (km)</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="6" class="text-center py-4">
              <span class="loading loading-spinner loading-md"></span>
            </td>
          </tr>
          <tr v-else-if="runs.length === 0">
            <td colspan="6" class="text-center py-4">
              No runs found. Add your first run!
            </td>
          </tr>
          <tr v-for="run in runs" :key="run.id" class="hover">
            <td>{{ run.date }}</td>
            <td>{{ run.distance }} km</td>
            <td>{{ run.comment }}</td>
            <td>
              <div class="flex gap-2">
                <button
                  @click="openEditModal(run)"
                  class="btn btn-sm btn-outline btn-info"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  @click="confirmDelete(run.id)"
                  class="btn btn-sm btn-outline btn-error"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Run Modal -->
    <div class="modal" :class="{ 'modal-open': isModalOpen }">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">
          {{ isEditing ? "Edit Run" : "Add New Run" }}
        </h3>
        <form @submit.prevent="saveRun">
          <div class="form-control mb-3">
            <label class="label" style="width: 100%">
              <span class="label-text">Date</span>
            </label>
            <input
              type="date"
              v-model="formData.date"
              class="input input-bordered"
              required
            />
          </div>

          <div class="form-control mb-3">
            <label class="label" style="width: 100%">
              <span class="label-text">Distance (km)</span>
            </label>
            <input
              type="number"
              step="0.01"
              v-model="formData.distance"
              class="input input-bordered"
              required
            />
          </div>

          <div class="form-control mb-3">
            <label class="label" style="width: 100%">
              <span class="label-text">Comment</span>
            </label>
            <textarea
              v-model="formData.comment"
              class="textarea textarea-bordered"
              rows="3"
            ></textarea>
          </div>

          <div class="modal-action">
            <button type="button" class="btn btn-ghost" @click="closeModal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
      <div class="modal-backdrop" @click="closeModal"></div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal" :class="{ 'modal-open': isDeleteModalOpen }">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">Confirm Delete</h3>
        <p>
          Are you sure you want to delete this run? This action cannot be
          undone.
        </p>
        <div class="modal-action">
          <button class="btn btn-ghost" @click="isDeleteModalOpen = false">
            Cancel
          </button>
          <button class="btn btn-error" @click="deleteRun">Delete</button>
        </div>
      </div>
      <div class="modal-backdrop" @click="isDeleteModalOpen = false"></div>
    </div>
  </div>
</template>
