import { MouseEvent, useState, useRef } from "react";
import Item from "./Item";
import CButton from "./CButton";
import { ItemType } from "../ItemType";
import { ReactSortable } from "react-sortablejs";
import Modal from "./Modal";
import AddItemBox from "./AddItemBox";
import EditItemBox from "./EditItemBox";

interface Props {
  items: ItemType[];
  setItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
  name: string;
}

enum ModalType {
  AddBox,
  EditBox,
}

function ListItem(props: Props) {
  let [showLabel, setShowLabel] = useState(true);
  let [editMode, setEditMode] = useState(false);
  let [modalOpen, setModalOpen] = useState(false);
  let [currentModalType, setCurrentModalType] = useState(ModalType.AddBox);
  let currentEditingItem: ItemType = {
    url: "",
    name: "",
    iconUrl: "",
  };

  let handleMouseEnter = (event: MouseEvent) => {
    let tt = event.currentTarget.querySelectorAll(".sideButton");

    tt?.forEach((t) => {
      t.animate(
        [
          { opacity: "0", visibility: "hidden" },
          { opacity: "1", visibility: "visible" },
        ],
        {
          duration: 100,
          iterations: 1,
          fill: "forwards",
        }
      );
    });
  };

  let handleMouseLeave = (event: MouseEvent) => {
    let tt = event.currentTarget.querySelectorAll(".sideButton");
    tt?.forEach((t) => {
      t.animate(
        [
          { opacity: "1", visibility: "visible" },
          { opacity: "0", visibility: "hidden" },
        ],
        {
          duration: 100,
          iterations: 1,
          fill: "forwards",
        }
      );
    });
  };

  let k = 0;

  let modalContent: (closeHook: () => void) => React.ReactNode = (
    closeHook: () => void
  ) => <h1></h1>;

  let currentItem;

  if (currentModalType == ModalType.AddBox) {
    modalContent = (closeHook: () => void) => {
      return (
        <AddItemBox
          items={props.items}
          setItems={props.setItems}
          closeHook={closeHook}
        ></AddItemBox>
      );
    };
  } else if (currentModalType == ModalType.EditBox) {
    modalContent = (closeHook: () => void) => {
      return (
        <EditItemBox
          items={props.items}
          setItems={props.setItems}
          closeHook={closeHook}
        ></EditItemBox>
      );
    };
  }

  let editItemHook = (item: ItemType) => {
    setCurrentModalType(ModalType.EditBox);

    setModalOpen(true);
  };

  let showEdit = () => {};

  return (
    <>
      <div
        className="listGhost"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={() => setShowLabel(true)}
        onMouseDown={() => setShowLabel(false)}
        onMouseUp={() => setShowLabel(true)}
      >
        <div className="listWrap">
          <div className="floatPanel">
            <CButton
              icon="edit"
              onClick={() => {
                setEditMode(!editMode); // toggle edit
              }}
              className="sideButton"
            ></CButton>
            <CButton
              icon="add"
              onClick={() => {
                setModalOpen(true); // add item modal
              }}
              className="sideButton"
            ></CButton>
          </div>

          <ReactSortable
            swap
            list={props.items}
            setList={props.setItems}
            chosenClass="editHighlight"
            className="listItem"
            filter=".notSortable"
          >
            {props.items.map((item) => (
              <Item
                item={item}
                key={k++}
                showLabel={showLabel}
                setShowLabel={setShowLabel}
                editMode={editMode}
                showEdit={() => {
                  editItemHook(item);
                }}
              ></Item>
            ))}
          </ReactSortable>
        </div>
      </div>
      {modalOpen && (
        <Modal
          style={{}}
          setModalOpen={setModalOpen}
          content={modalContent}
        ></Modal>
      )}
    </>
  );
}

export default ListItem;
