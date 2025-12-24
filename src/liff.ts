import liff from "@line/liff";

export type LiffProfile = {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
};

export const initLiff = async (): Promise<LiffProfile | void> => {
  await liff.init({
    liffId: process.env.NEXT_PUBLIC_LIFF_ID!,
  });

  if (!liff.isLoggedIn()) {
    liff.login();
    return;
  }

  const profile = await liff.getProfile();
  return profile as LiffProfile;
};
