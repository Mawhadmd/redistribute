"use client";

import { createClient } from "@supabase/supabase-js";

// Use Next.js environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

// User authentication
export async function userSignUp(
  email: string,
  password: string,
  displayName: string
) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;

  if (authData.user) {
    const { error: profileError } = await supabase.from("users").insert([
      {
        id: authData.user.id,
        email,
        display_name: displayName,
        role: "user",
        created_at: new Date().toISOString(),
      },
    ]);

    if (profileError) throw profileError;
  }

  return authData;
}

export async function userSignIn(email: string, password: string) {
  console.log(password, email);
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  if (data.user) {
    const { data: profileData, error: profileError } = await supabase
      .from("users")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profileError) throw profileError;

    return { ...data, userRole: profileData?.role || "user" };
  }

  return data;
}

export async function adminSignIn(masterPassword: string) {
  const adminMasterPassword =
    process.env.NEXT_PUBLIC_ADMIN_MASTER_PASSWORD || "";

  if (!adminMasterPassword) {
    throw new Error("Admin master password not configured");
  }

  if (masterPassword !== adminMasterPassword) {
    throw new Error("Invalid admin password");
  }

  return { authenticated: true, userRole: "admin" };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getSession();
  return data.session?.user || null;
}

export async function getCurrentUserRole() {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error) throw error;
  return data?.role;
}

export interface ShopItem {
  id?: number;
  created_at?: string;
  title: string;
  description: string;
  price: number;
  category: string;
  stars: number;
  num_reviews: number;
  reviews?: string;
  Image_path: string;
}

export async function getShopItems() {
  const { data, error } = await supabase
    .from("ShopItems")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function addShopItem(item: ShopItem) {
  const { data, error } = await supabase
    .from("ShopItems")
    .insert([item])
    .select();

  if (error) throw error;
  return data;
}

export async function updateShopItem(id: number, item: Partial<ShopItem>) {
  const { data, error } = await supabase
    .from("ShopItems")
    .update(item)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
}

export async function deleteShopItem(id: number) {
  const { error } = await supabase.from("ShopItems").delete().eq("id", id);

  if (error) throw error;
}

export async function uploadImage(file: File, bucket: string = "shop-images") {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return data.publicUrl;
}

export async function deleteImage(
  imagePath: string,
  bucket: string = "shop-images"
) {
  const fileName = imagePath.split("/").pop();
  if (!fileName) return;

  const { error } = await supabase.storage.from(bucket).remove([fileName]);

  if (error) throw error;
}
