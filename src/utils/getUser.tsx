import supabase from '../utils/supabase'

async function getUser(id: string) {
    const { data, error } = await supabase
      .from("Users")
      .select("*")
      .eq("uuid", id);

    if(data && data.length > 0){
        return data[0]
    } else if (error) {
        console.log(error)
    }

    return null
  }

  export default getUser;