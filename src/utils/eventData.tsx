import supabase from './supabase'

async function getData() {
    const { data, error } = await supabase.from("Events").select("*");

    if (error) {
      console.log(error);
    }
    return data || [];
  }

  export default getData;