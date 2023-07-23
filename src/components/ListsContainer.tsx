import ListItem from "./ListItem";
import { ItemType } from "../ItemType";
import { useState } from "react";

function ListContainer() {
  let test1: ItemType = {
    url: "https://google.com",
    iconUrl: "./vite.svg",
    name: "Buga",
  };

  let test2: ItemType = {
    url: "https://google.com",
    iconUrl: "",
    name: "baga",
  };

  let items_: ItemType[] = Array(5).fill(test1);
  let [items, setItems] = useState([test1, test2, test1, test2]);

  return (
    <div className="listContainer">
      <ListItem items={items} setItems={setItems} name="bug"></ListItem>
    </div>
  );
}

export default ListContainer;
