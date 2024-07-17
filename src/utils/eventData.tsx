import supabase from "./supabase";

async function getData() {
  const { data, error } = await supabase
    .from("Events")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    console.log(error);
  }

  const futureEvents = data?.filter(event => new Date(event.date) >= new Date()) || [];
  
  return futureEvents;
}

export default getData;
