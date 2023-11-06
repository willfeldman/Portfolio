import React from "react";
import { TbMinus } from "react-icons/tb";
import BarButton from "../BarButton";

export default function BarClose(props) {
  return (
    <BarButton onClick={props.onClick} color="#FFBD44" imgHoverColor="#996926">
      <TbMinus />
    </BarButton>
  );
}
