import { useState } from "react";
import { Button, FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./editWindow.css";
import supabase from "../utils/supabase";

type createWindowProps = {
  setCreating: Function;
};

function CreateWindow({ setCreating }: createWindowProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showCustomAmount, setShowCustomAmount] = useState<boolean>(false);

  const [editTitle, setEditTitle] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");
  const [editPrice, setEditPrice] = useState<string>("");
  const [editTimeStart, setEditTimeStart] = useState<string>("");
  const [editDate, setEditDate] = useState<Date>();
  const [editTimeEnd, setEditTimeEnd] = useState<string>("");
  const [editImgURL, setEditImgURL] = useState<string>("");

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
      setEditPrice("Pay as You Wish");
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
    const { error } = await supabase.from("Events").insert([
      {
        title: editTitle,
        description: editDescription,
        price: finalPrice,
        time_start: editTimeStart,
        time_end: editTimeEnd,
        date: editDate,
        image_url: editImgURL,
      },
    ]);

    if (error) {
      console.log(error);
      alert("That didn't work, please wait a few moments before trying again");
    } else {
      setCreating(false);
    }
  };

  return (
    <>
      <div className="popup-card-container">
        <div>
          <FloatingLabel controlId="editTitle" label="Title" className="mb-3">
            <Form.Control
              type="text"
              defaultValue={""}
              onChange={(event) => {
                setEditTitle(event.target.value);
              }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="editDescription" label="Description">
            <Form.Control
              as="textarea"
              defaultValue={""}
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
              <option value="payAsYouWish">Pay as you wish</option>
              <option value="setAmount">Set Amount</option>
            </Form.Select>
          </FloatingLabel>
          {showCustomAmount && (
            <FloatingLabel controlId="customAmount" label="Price (£)">
              <Form.Control
                type="number"
                defaultValue={""}
                onChange={(event) => {
                  setEditPrice(event.target.value.toString());
                }}
              />
            </FloatingLabel>
          )}
          <FloatingLabel controlId="customDate" label="Date" className="mb-3">
            <Form.Control
              type="date"
              defaultValue={""}
              onChange={(event) => {
                setEditDate(new Date(event.target.value));
              }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="customTimeStart" label="Start Time">
            <Form.Control
              type="time"
              defaultValue={""}
              onChange={(event) => {
                setEditTimeStart(event.target.value);
              }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="customTimeEnd" label="End Time">
            <Form.Control
              type="time"
              defaultValue={""}
              onChange={(event) => {
                setEditTimeEnd(event.target.value);
              }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="customImageURL" label="Image URL">
            <Form.Control
              type="text"
              defaultValue={""}
              onChange={(event) => {
                setEditImgURL(event.target.value);
              }}
            />
          </FloatingLabel>
          <div className="button-wrapper">
            <Button
              className="secondary-btn"
              onClick={() => {
                setCreating(false);
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

export default CreateWindow;
