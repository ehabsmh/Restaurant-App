import supabase from "./supabase";

export interface IUserInfo {
  firstName?: string;
  lastName?: string;
  address?: string;
  phoneNumber?: string;
}

export async function getUserProfile(userId: string) {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select("first_name, last_name, address, phone_number")
    // Filters
    .eq('user_id', userId).maybeSingle();

  if (error) throw new Error(error.message);
  return profiles;
}

export async function createUserProfile(userId: string, user: IUserInfo) {

  const { error } = await supabase
    .from("profiles")
    .insert([
      {
        user_id: userId,
        first_name: user.firstName || "",
        last_name: user.lastName || "",
        address: user.address || "",
        phone_number: user.phoneNumber || ""
      },
    ])
    .select();
  if (error) throw new Error(error.message);
}

export async function updateUserProfile(userId: string, userInfo: IUserInfo) {
  const { error } = await supabase
    .from('profiles')
    .update({
      first_name: userInfo.firstName,
      last_name: userInfo.lastName,
      address: userInfo.address,
      phone_number: userInfo.phoneNumber
    })
    .eq('user_id', userId)

  if (error) throw new Error(error.message);
}
