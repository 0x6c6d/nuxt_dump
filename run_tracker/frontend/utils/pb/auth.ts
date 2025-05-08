// utils/auth.ts
import { useNuxtApp } from "#app";
import { ClientResponseError } from "pocketbase";

/**
 * Generates a random string for temporary passwords
 * @returns Random string to use as password
 */
function generateRandomString(length = 16) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = chars.length;

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

/**
 * Signs out the currently authenticated user.
 * Clears the authentication store and resets user-related data.
 */
export function signOut() {
  const { $pb } = useNuxtApp();
  $pb.authStore.clear();
  navigateTo("/");
}

/**
 * Handles OTP authentication flow - ensures user exists before requesting OTP
 * @param email User's email address
 * @returns Promise resolving to the auth data on successful authentication
 */
export async function requestSignInOTP(email: string) {
  const { $pb } = useNuxtApp();

  try {
    console.log("Starting OTP flow for email:", email);
    // Try to create the user first
    try {
      const password = generateRandomString();
      await $pb.collection("users").create({
        email: email,
        password: password,
        passwordConfirm: password,
        emailVisibility: true,
        role: "user",
      });
      console.log(`Created new user for ${email}`);

      // TODO: create subscription record for new user
    } catch (error) {
      // Check if error is a ClientResponseError and has the unique validation error
      if (error instanceof ClientResponseError) {
        if (
          error.status === 400 &&
          Object.keys(error.data.data).includes("email") &&
          error.data?.data?.email?.code === "validation_not_unique"
        ) {
          console.log(`User with email ${email} already exists`);
        } else {
          console.error("Unexpected ClientResponseError:", error);
          return {
            success: false,
            message: error.message || "Failed during user creation",
            data: null,
          };
        }
      } else {
        console.error("Unexpected error during user creation:", error);
        return {
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "Failed during user creation",
          data: null,
        };
      }
    }
    // Now we know the user exists (either it existed already or we just created it)
    // So we can request the OTP
    console.log("Requesting OTP for:", email);
    const otpResponse = await $pb.collection("users").requestOTP(email);
    return {
      success: true,
      message: "OTP has been sent to your email",
      data: otpResponse,
    };
  } catch (error) {
    console.error("Error in OTP request flow:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to send OTP",
      data: null,
    };
  }
}

/**
 * Verifies an OTP token and completes authentication
 * @param email User's email address
 * @param token The OTP token received via email
 * @returns Promise resolving to auth result
 */
export async function verifyOTP(email: string, token: string) {
  const { $pb } = useNuxtApp();

  try {
    const authData = await $pb.collection("users").authWithOTP(email, token);
    return {
      success: true,
      message: "Successfully authenticated",
      data: authData,
    };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to verify OTP",
      data: null,
    };
  }
}
