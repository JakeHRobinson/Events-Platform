import { useState } from "react";
import { Button, FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./editWindow.css";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface EventProps {
  setEditing: Function;
  singleEvent: {
    created_at: Date;
    date: Date;
    description: string;
    id: number;
    image_url: string;
    price: string;
    time_end: string;
    time_start: string;
    title: string;
  };
}

function EditWindow({ setEditing, singleEvent }: EventProps) {
  const supabase = useSupabaseClient();

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showCustomAmount, setShowCustomAmount] = useState<boolean>(false);

  const [editTitle, setEditTitle] = useState<string>(singleEvent.title);
  const [editDescription, setEditDescription] = useState<string>(
    singleEvent.description
  );
  const [editPrice, setEditPrice] = useState<string>(singleEvent.price);
  const [editTimeStart, setEditTimeStart] = useState<string>(
    singleEvent.time_start
  );
  const [editDate, setEditDate] = useState<Date>(singleEvent.date);
  const [editTimeEnd, setEditTimeEnd] = useState<string>(singleEvent.time_end);
  const [editImgURL, setEditImgURL] = useState<string>(singleEvent.image_url);

  const handleOptionChange = (event?: React.FormEvent<HTMLSelectElement>) => {
    if (!event) return;
    const target = event.target as HTMLInputElement;
    setSelectedOption(target.value);
    if (target.value === "setAmount") {
      setShowCustomAmount(true);
    } else if (target.value === "free") {
      setEditPrice("Free");
      setShowCustomAmount(false);
    } else if (target.value === "payAsYouWish") {
      setEditPrice("Optional Donation");
      setShowCustomAmount(false);
    } else {
      setShowCustomAmount(false);
    }
  };

  const submitHandler = async () => {
    let finalPrice = "";
    if (isNaN(Number(editPrice))) {
      finalPrice = editPrice;
    } else {
      finalPrice = "£" + editPrice;
    }
    const { error } = await supabase
      .from("Events")
      .update([
        {
          title: editTitle,
          description: editDescription,
          price: finalPrice,
          time_start: editTimeStart,
          time_end: editTimeEnd,
          date: editDate,
          image_url: editImgURL,
        },
      ])
      .eq("id", singleEvent.id);

    if (error) {
      console.log(error);
      alert("That didn't work, please wait a few moments before trying again");
    } else {
      setEditing(false);
    }
  };

  return (
    <>
      <div className="popup-card-container">
        <div>
          <FloatingLabel controlId="editTitle" label="Title" className="mb-3">
            <Form.Control
              type="text"
              defaultValue={singleEvent.title}
              onChange={(event) => {
                setEditTitle(event.target.value);
              }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="editDescription" label="Description">
            <Form.Control
              as="textarea"
              defaultValue={singleEvent.description}
              style={{ height: "100px" }}
              onChange={(event) => {
                setEditDescription(event.target.value);
              }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="editDate" label="Choose Payment Method">
            <Form.Select
              aria-label="Floating label select example"
              value={selectedOption}
              onChange={(event) => {
                handleOptionChange(event);
              }}
            >
              <option value="">Select Payment Method</option>
              <option value="free">Free</option>
              <option value="payAsYouWish">Optional Donation</option>
              <option value="setAmount">Set Amount</option>
            </Form.Select>
          </FloatingLabel>
          {showCustomAmount && (
            <FloatingLabel controlId="customAmount" label="Price (£)">
              <Form.Control
                type="number"
                defaultValue={isNaN(Number(singleEvent.price))? '' : Number(
                  singleEvent.price.slice(1, singleEvent.price.length)
                )}
                onChange={(event) => {
                  setEditPrice(event.target.value.toString());
                }}
              />
            </FloatingLabel>
          )}
          <FloatingLabel controlId="customDate" label="Date" className="mb-3">
            <Form.Control
              type="date"
              defaultValue={
                new Date(singleEvent.date).toISOString().split("T")[0]
              }
              onChange={(event) => {
                setEditDate(new Date(event.target.value));
              }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="customTimeStart" label="Start Time">
            <Form.Control
              type="time"
              defaultValue={singleEvent.time_start}
              onChange={(event) => {
                setEditTimeStart(event.target.value);
              }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="customTimeEnd" label="End Time">
            <Form.Control
              type="time"
              defaultValue={singleEvent.time_end}
              onChange={(event) => {
                setEditTimeEnd(event.target.value);
              }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="customImageURL" label="Image URL">
            <Form.Control
              type="text"
              defaultValue={singleEvent.image_url}
              onChange={(event) => {
                setEditImgURL(event.target.value);
              }}
            />
          </FloatingLabel>
          <div className="button-wrapper">
            <Button
              className="secondary-btn"
              onClick={() => {
                setEditing(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="primary-btn"
              onClick={() => {
                submitHandler();
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditWindow;
