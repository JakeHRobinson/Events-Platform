import supabase from "./supabase";

async function getAdminData() {
  const { data, error } = await supabase
    .from("Events")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    console.log(error);
  }

  return data;
}

export default getAdminData;
