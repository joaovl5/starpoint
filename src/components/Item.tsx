import { useState, MouseEvent } from "react";
import { ItemType } from "../ItemType";
import CButton from "./CButton";
import { Alert } from "@mui/material";

interface Props {
  item: ItemType;
  showLabel: boolean;
  setShowLabel: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  editMode: boolean;
  showEdit: () => void;
}

function solveSiteIcon(url: string) {
  return (
    "https://besticon-demo.herokuapp.com/icon?url=" +
    encodeURI(url) +
    "&size=32..60..300"
  );
}

function Item({
  item,
  showLabel,
  setShowLabel,
  className,
  editMode,
  showEdit,
}: Props) {
  let url = item.url;
  let actualUrl = editMode ? "javascript: void(0)" : item.url;
  let actualTarget = editMode ? "_self" : "_blank";
  let iconUrl = item.iconUrl;
  let name = item.name;

  let handleMouseEnter = (event: MouseEvent) => {
    let tt = event.currentTarget.querySelector(".tooltip");
    setIsChosen(true);

    tt?.animate(
      [
        { opacity: "0", visibility: "hidden" },
        { opacity: "1", visibility: "visible" },
      ],
      {
        duration: 200,
        iterations: 1,
        fill: "forwards",
      }
    );
  };

  let handleMouseLeave = (event: MouseEvent) => {
    let tt = event.currentTarget.querySelector(".tooltip");
    setIsChosen(false);

    tt?.animate(
      [
        { opacity: "1", visibility: "visible" },
        { opacity: "0", visibility: "hidden" },
      ],
      {
        duration: 200,
        iterations: 1,
        fill: "forwards",
      }
    );
  };

  let [isChosen, setIsChosen] = useState(false);

  let handleMouseDown = (event: MouseEvent) => {
    setShowLabel(false || true);
  };

  let handleMouseUp = (event: MouseEvent) => {
    setShowLabel(true);
  };

  let imgFinal = iconUrl ? iconUrl : solveSiteIcon(url);

  return (
    <>
      <a
        className="itemWrap"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        href={actualUrl}
        target={actualTarget}
      >
        {editMode && (
          <CButton
            icon="edit"
            onClick={() => showEdit()}
            className="itemButton"
          ></CButton>
        )}
        <div className={"item " + (editMode ? "editMode " : "") + className}>
          <a className="iconAnchor">
            <img src={imgFinal} alt={name} />
          </a>
        </div>
        {showLabel && <span className="tooltip tooltip-item">{name}</span>}
      </a>
    </>
  );
}

export default Item;
