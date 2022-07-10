import { Select } from "antd";
import { FC, useState } from "react";
import "./Selector.scss";

interface IProps {
  data: { label: string; key: any }[];
  setItem: (item: number) => void;
  selectedItem: number;
}
export default function Selector({ data, setItem, selectedItem }: IProps) {
  const handleChange = (value: number) => {
    setItem(value);
  };

  return (
    <div className="selector__box">
      <Select
        defaultValue={selectedItem}
        className="center selector"
        onChange={handleChange}
      >
        {data.map((province, i) => (
          <Select.Option key={i} value={i}>
            {province.label}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}
