"use client";

import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type {
  AuthProviderInfo,
  RecordModel as PbRecord,
  RecordModel,
} from "pocketbase";
import { usePbAuth } from "../_components/PBAuthContext";
import { pb } from "@/lib/pocketbase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaGoogle, FaGithub, FaDiscord } from "react-icons/fa";

const SignIn: NextPage = () => {
  const { googleSignIn, githubSignIn, setUserData, discordSignIn, user } =
    usePbAuth();

  const router = useRouter();

  const storeUserAndRedirect = (user: PbRecord) => {
    setUserData(user);
    router.replace("/");
  };

  if (user) {
    router.replace("/");
  }

  useEffect(() => {
    const localAuthProvider: AuthProviderInfo = JSON.parse(
      localStorage.getItem("provider") as string
    );
    const params = new URL(location.href).searchParams;
    const redirectUrl = `${location.origin}/signin`;
    const code = params.get("code");

    // cancel signin logic if not a redirect
    if (
      !localAuthProvider ||
      !code ||
      localAuthProvider.state !== params.get("state")
    )
      return;

    pb.collection("users")
      .authWithOAuth2Code(
        localAuthProvider.name,
        code,
        localAuthProvider.codeVerifier,
        redirectUrl
      )
      .then(async (response) => {
        const user = await pb.collection("users").getOne(response.record.id);

        // skip profile updation if user already exists or user data from OAuth providers haven't changed
        if (
          user.name &&
          user.avatar &&
          user.name === response.meta?.name &&
          user.avatar === response.meta?.avatar
        ) {
          storeUserAndRedirect(user as RecordModel);
        } else
          pb.collection("users")
            .update(response.record.id, {
              name: response.meta?.name,
              avatarUrl: response.meta?.avatarUrl,
            })
            .then((res) => {
              storeUserAndRedirect(res as RecordModel);
            })
            .catch((err) => {
              console.error(err);
            });
      })
      .catch((err) => {
        console.error(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign In</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full" onClick={googleSignIn}>
            <FaGoogle className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button>
          <Button variant="outline" className="w-full" onClick={githubSignIn}>
            <FaGithub className="mr-2 h-4 w-4" />
            Sign in with GitHub
          </Button>
          <Button variant="outline" className="w-full" onClick={discordSignIn}>
            <FaDiscord className="mr-2 h-4 w-4" />
            Sign in with Discord
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
