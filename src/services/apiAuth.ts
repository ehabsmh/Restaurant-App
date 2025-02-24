import supabase from "./supabase";

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}


export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function googleOAuthLogin() {
  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  console.log(data);
  // const { data: { user } } = await supabase.auth.getUser();
  // if (data && user) {
  //   await createUserProfile(user?.id, user.user_metadata);
  // }
}
