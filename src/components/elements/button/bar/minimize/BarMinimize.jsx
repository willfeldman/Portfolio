import React from "react";
import { FaMinus } from "react-icons/fa6";
import BarButton from "../BarButton";

export default function BarMinimize(props) {
  return (
    <BarButton className="barButton-small-img" onClick={props.onClick} color="#FFBD44" imgHoverColor="#996926">
      <FaMinus />
    </BarButton>
  );
}
