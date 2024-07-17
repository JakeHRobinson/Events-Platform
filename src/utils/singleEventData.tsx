import supabase from "./supabase"

const singleEventData = async(id: string) => {
    const {data, error} = await supabase.from("Events").select('*').eq('id', id)

    if(error){
        console.log(error, '<------ error')
    } 

    return data;
}

export default singleEventData;