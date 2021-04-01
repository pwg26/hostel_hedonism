import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

import AddBoxIcon from "@material-ui/icons/AddBox";
import UpdateIcon from "@material-ui/icons/Update";

import { makeStyles } from "@material-ui/core/styles";
import StoreTable from "../components/StoreTable";
import StoreButtons from "../components/StoreButtons";
import API from "../utils/API";

import AddItem from "../components/AddItem";

export default function Store() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadItems = () => {
      API.findItems().then((res) => {
        console.log(res);
        setItems(
          res.data.map((item) => {
            return item;
          })
        );
      });
    };
    loadItems();
  }, []);

  const addItemRecord = (newItem) => setItems([...items, newItem]);

  return (
    <>
      {" "}
      <StoreTable rows={items} />
      <StoreButtons /> <AddItem addItemRecord={addItemRecord} />
    </>
  );
}
