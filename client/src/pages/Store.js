import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

import StoreTable from "../components/StoreTable";
import StoreButtons from "../components/StoreButtons";
import API from "../utils/API";
import Heading from "../components/ Heading";

import StoreModal from "../components/StoreModal";

export default function Store() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [selected, setSelected] = useState({});
  const handleOpen = (type, selected = {}) => {
    setType(type);
    setSelected(selected);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const loadItems = () => {
      API.findItems().then((res) => {
        console.log(res);
        setItems(
          res.data.map((item) => {
            console.log(item);
            return {
              name: item.name,
              description: item.description,
              cost: item.cost,
              stock: item.stock,
              id: item._id,
            };
          })
        );
      });
    };
    loadItems();
  }, [open]);

  const addItemRecord = (newItem) => setItems([...items, newItem]);

  return (
    <>
      <Heading heading="Store" />
      <StoreTable rows={items} open={handleOpen} />
      <StoreButtons open={handleOpen} />
      <StoreModal
        open={open}
        type={type}
        selected={selected}
        close={handleClose}
      />
    </>
  );
}
