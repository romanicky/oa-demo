"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { initLiff } from "../../lib/liff";
import type { LiffProfile } from "../../lib/liff";

export default function LiffProfile() {
  const [profile, setProfile] = useState<LiffProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initLiff()
      .then((p) => {
        if (p) setProfile(p);
      })
      .catch((err) => setError(String(err)));
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!profile) return <p>Loading LIFF...</p>;
  console.log(profile);

  return (
    <div className="flex flex-col items-center gap-2">
      {profile.pictureUrl && (
        <Image
          src={profile.pictureUrl}
          alt={profile.displayName}
          width={100}
          height={100}
          className="rounded-full"
        />
      )}
      <p className="font-medium">{profile.displayName}</p>
      <p className="text-sm text-zinc-600">{profile.userId}</p>
    </div>
  );
}
