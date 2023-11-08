import React from "react";
import { IoClose } from "react-icons/io5";
import BarButton from "../BarButton";

export default function BarClose(props) {
  return (
    <BarButton onClick={props.onClick} color="#FF605C" imgHoverColor="#85111c">
      <IoClose />
    </BarButton>
  );
}
