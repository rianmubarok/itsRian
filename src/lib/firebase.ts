import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  getAdditionalUserInfo,
  updateProfile,
  type User,
  type UserCredential,
  type OAuthCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
// Ensure we can read basic profile including username
githubProvider.addScope("read:user");

export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function signInWithGithub(): Promise<User> {
  const result = await signInWithPopup(auth, githubProvider);

  try {
    // Prefer username from additionalUserInfo when available
    const info = getAdditionalUserInfo(result as UserCredential);
    let preferredName: string | null = null;
    const maybeUsername =
      (info && (info as unknown as { username?: string }).username) ||
      undefined;
    if (
      maybeUsername &&
      typeof maybeUsername === "string" &&
      maybeUsername.trim().length > 0
    ) {
      preferredName = maybeUsername;
    }

    // If username not present, try GitHub API via access token
    if (!preferredName) {
      const credential = GithubAuthProvider.credentialFromResult(
        result
      ) as OAuthCredential | null;
      const token = credential?.accessToken;
      if (token) {
        try {
          const resp = await fetch("https://api.github.com/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (resp.ok) {
            const data = (await resp.json()) as {
              name?: string;
              login?: string;
            };
            preferredName = data.name || data.login || null;
          }
        } catch (e) {}
      }
    }

    // If we found a better name and current displayName is empty or looks like email, update profile
    if (preferredName) {
      const currentDisplayName = result.user.displayName;
      const looksLikeEmail =
        !!currentDisplayName && /@/.test(currentDisplayName);
      if (!currentDisplayName || looksLikeEmail) {
        await updateProfile(result.user, { displayName: preferredName });
      }
    }
  } catch {
    // Non-fatal, continue with the user as-is
  }

  return result.user;
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

export type FirebaseUser = User;
