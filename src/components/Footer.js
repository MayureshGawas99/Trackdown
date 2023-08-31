import React, { useContext } from "react";
import { MapContext } from "../App";

export default function Footer() {
  const { time } = useContext(MapContext);

  return (
    <div className="fixed-bottom">
      <p className="text-center">Page Updates in {time} Seconds</p>
    </div>
  );
}
