import { MouseEvent } from "react";

interface Props {
  onClick: (e: MouseEvent) => void;
  icon: string; // Google material icons
  className: string;
}

function CButton(props: Props) {
  return (
    <button
      className={"floatButton material-symbols-outlined " + props.className}
      onClick={props.onClick}
    >
      <p>{props.icon}</p>
    </button>
  );
}

export default CButton;
