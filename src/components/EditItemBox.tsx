import { ItemType } from "../ItemType";
import { useRef, useState } from "react";

interface Props {
  items: ItemType[];
  setItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
  item: ItemType;
  closeHook: () => void;
}

function EditItemBox(props: Props) {
  let nameRef: any = useRef();
  let linkRef: any = useRef();
  let iconLinkRef: any = useRef();
  let [parent, setParent] = useState(null);

  let validate = (name: string, link: string) => {
    if (name.length + link.length <= 1) return false; // if either are empty

    return true;
  };

  let closeModal = props.closeHook;

  return (
    <>
      <h3
        className="centered"
        onLoad={(e: any) => {
          setParent(e.currentTarget);
        }}
      >
        Edit item
      </h3>
      <form
        className="modalForm"
        onSubmit={(d: React.FormEvent<HTMLFormElement>) => {
          let name = nameRef?.value;
          let link = linkRef?.value;
          let iconLink = iconLinkRef?.value;

          if (validate(name, link) == false) {
            alert("Invalid entry. Please review the text you've provided.");
          } else {
            let newItem: ItemType = {
              url: link,
              name: name,
              iconUrl: iconLink,
            };

            //props.setItems([...props.items, newItem]); //unpacks props and adds created item
            closeModal();
          }
        }}
        action="javascript:void(0)"
      >
        <input
          ref={(inp) => {
            nameRef = inp;
          }}
          type="text"
          name="name"
          id="name"
          placeholder="Link Name"
        />
        <input
          ref={(inp) => {
            linkRef = inp;
          }}
          type="text"
          name="link"
          id="link"
          placeholder="Link URL"
        />
        <input
          ref={(inp) => {
            iconLinkRef = inp;
          }}
          type="text"
          name="link"
          id="link"
          placeholder="Icon Link URL"
        />
        <input type="submit" value="Add" />
      </form>
    </>
  );
}

export default EditItemBox;
