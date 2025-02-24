import { IUser } from "../pages/Register";
import supabase from "./supabase";

export async function getUserProfile(userId: string) {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select("*")
    // Filters
    .eq('user_id', userId).maybeSingle();

  if (error) throw new Error(error.message);
  return profiles;
}

export async function createUserProfile(userId: string, user: IUser) {

  const { error } = await supabase
    .from("profiles")
    .insert([
      {
        user_id: userId,
        first_name: user.firstName || "",
        last_name: user.lastName || "",
        address: user.address || "",
        phone_number: user.phone || ""
      },
    ])
    .select();
  if (error) throw new Error(error.message);
}
