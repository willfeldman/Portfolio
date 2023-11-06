import React from "react";
import { RiExpandUpDownFill } from "react-icons/ri";
import BarButton from "../BarButton";

export default function BarClose(props) {
  return (
    <BarButton onClick={props.onClick} color="#00CA4E" imgHoverColor="#005927">
      <RiExpandUpDownFill />
    </BarButton>
  );
}
