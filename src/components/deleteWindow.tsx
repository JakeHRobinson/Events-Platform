import { Button } from "react-bootstrap";
import "./deleteWindow.css";
import supabase from "../utils/supabase";

type DeleteWindowProps = {
  setDeleting: Function;
  eventId: number;
};

function DeleteWindow({ setDeleting, eventId }: DeleteWindowProps) {
  const deleteHandler = async () => {
    const { error } = await supabase.from("Events").delete().eq("id", eventId);

    if(error){
        console.log(error, '<----- error')
        alert("That didn't quite work, please try again in a few moments")
    } else {
        setDeleting(false)
    }
  };

  return (
    <div className="delete-card-container">
      <h4>Are you sure you want to delete this event?</h4>
      <p>This action cannot be undone</p>
      <div className="button-wrapper">
        <Button
          className="btn-primary"
          onClick={() => {
            setDeleting(false);
          }}
        >
          Cancel
        </Button>
        <Button
          className="btn-primary"
          onClick={() => {
            deleteHandler();
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default DeleteWindow;
