import supabase from "./supabase";

async function getData() {
  const { data, error } = await supabase
    .from("Events")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.log(error);
  }
  return data || [];
}

export default getData;
