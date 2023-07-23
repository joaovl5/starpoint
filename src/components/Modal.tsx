import { MouseEvent, ReactNode, useState } from "react";

interface Props {
  //children: any;
  content: (closeHook: () => void) => ReactNode;
  style: any;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal(props: Props) {
  let [thisDOM, setThisDOM] = useState({});

  let closeModal = () => {
    //if (event.currentTarget.className != "modal") return;
    //alert(event.currentTarget.classList);

    let time = 100;
    let tt: any = thisDOM;
    tt.animate(
      [
        { opacity: "1", display: "block" },
        { opacity: "0", display: "none" },
      ],
      {
        duration: time,
        iterations: 1,
        fill: "forwards",
      }
    );

    setTimeout(() => {
      props.setModalOpen(false);
    }, time);
  };

  return (
    <div
      className="modal"
      onClick={() => {
        closeModal();
      }}
      onMouseMove={(event: MouseEvent) => {
        if (event.currentTarget.className != "modal") return;
        setThisDOM(event.currentTarget);
      }}
    >
      <div
        className="modalContent"
        onClick={(e: MouseEvent) => {
          e.stopPropagation();
        }}
      >
        {props.content(closeModal)}
      </div>
    </div>
  );
}

export default Modal;
