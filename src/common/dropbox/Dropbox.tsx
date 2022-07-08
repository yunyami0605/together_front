import { FC, useState } from "react";
import "./Dropdown.scss";

interface IProps {
  data: { txt: string; value: any }[];
  onItemClick: (item: string) => void;
  selectedItem: string;
}
export default function Dropdown({ data, onItemClick, selectedItem }: IProps) {
  return (
    <div className="dropdown__container">
      <div className="center dropdown" tabIndex={1}>
        <span className="drop_selected">{selectedItem}</span>

        {/* <div className="sel-icon" /> */}
        <ul className="dropdown__list" tabIndex={1}>
          {data.map((val, i) => (
            <li onClick={() => onItemClick(val.value)} key={i}>
              {val.txt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
