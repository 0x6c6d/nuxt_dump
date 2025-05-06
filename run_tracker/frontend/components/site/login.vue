<template>
  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Login now!</h1>
        <p class="py-6">
          Only an email is required. We will send you an OTP to your mail
          address.
        </p>
      </div>
      <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div class="card-body">
          <fieldset v-if="!showOtp" class="fieldset">
            <label class="label">Email</label>
            <input
              type="email"
              class="input"
              placeholder="Email"
              v-model="email"
            />
            <button
              class="btn btn-neutral mt-4"
              @click="sendOtp"
              :disabled="isLoading"
            >
              {{ isLoading ? "Sending..." : "Send OTP" }}
            </button>
            <p v-if="emailError" class="text-sm text-red-500">
              {{ emailError }}
            </p>
          </fieldset>
          <fieldset v-if="showOtp" class="fieldset">
            <label class="label">OTP</label>
            <input
              type="text"
              class="input"
              placeholder="123456"
              v-model="otp"
            />
            <div
              v-if="showOtp"
              class="flex justify-between mt-4"
              style="width: clamp(3rem, 20rem, 100%)"
            >
              <button
                @click="resetForm"
                class="btn btn-outline"
                @disabled="isLoading"
              >
                Back
              </button>
              <button
                @click="login"
                class="btn btn-neutral"
                @disabled="isLoading"
              >
                {{ isLoading ? "Verifying..." : "Login" }}
              </button>
            </div>
            <p v-if="otpError" class="text-sm text-red-500">{{ otpError }}</p>
          </fieldset>
          <p
            v-if="msg"
            :class="
              msg.toLowerCase().includes('error') ||
              msg.toLowerCase().includes('fail')
                ? 'text-red-500 text-sm'
                : 'text-green-600 text-sm'
            "
          >
            {{ msg }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OTPResponse } from "pocketbase";
import { ZodError } from "zod";

let email = ref("");
let otp = ref("");
let msg = ref("");
let emailError = ref("");
let otpError = ref("");
let otpResponse = ref<OTPResponse | null>(null);
let showOtp = ref(false);
let isLoading = ref(false);

const pb = await useNuxtApp().$pb;
console.log(pb.authStore);

async function sendOtp() {
  msg.value = "";
  emailError.value = "";
  isLoading.value = true;

  try {
    const validateEmail = emailSchema.parse({ email: email.value });
    const result = await requestSignInOTP(validateEmail.email);

    if (!result.success || !result.data) {
      msg.value = result.message ?? "Error during request of the OTP";
      isLoading.value = false;
      return;
    }

    otpResponse.value = result.data;
    showOtp.value = true;
    msg.value = "OTP send to your email. Please check your inbox";
  } catch (error) {
    if (error instanceof ZodError) {
      error.errors.forEach((err) => {
        if (err.path.includes("email")) {
          emailError.value = err.message;
        }
      });
    } else {
      msg.value = "An unexpected error occurred. Please try again.";
      console.error(error);
    }
  } finally {
    isLoading.value = false;
  }
}

async function login() {
  msg.value = "";
  otpError.value = "";
  isLoading.value = true;

  try {
    const validatedOtp = otpSchema.parse({ otp: otp.value });
    const result = await pb
      .collection("users")
      .authWithOTP(otpResponse.value!.otpId, validatedOtp.otp);

    if (!result) {
      msg.value = "OTP verification failed. Please try again.";
      isLoading.value = false;
      return;
    }

    console.log("Verifying OTP success:", JSON.stringify(result));
    navigateTo("/dashboard");
  } catch (error) {
    if (error instanceof ZodError) {
      error.errors.forEach((err) => {
        console.log(err.message);
        otpError.value += `${err.message} `;
      });
    } else {
      msg.value = "OTP verification failed. Please try again.";
      console.error("Verifying OTP failed:", error);
    }
  } finally {
    isLoading.value = false;
  }
}

function resetForm() {
  showOtp.value = false;
  email.value = "";
  otp.value = "";
  msg.value = "";
  emailError.value = "";
  otpError.value = "";
}
</script>
