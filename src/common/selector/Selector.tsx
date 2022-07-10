import { Select } from "antd";
import { FC, useState } from "react";
import "./Selector.scss";

interface IProps {
  data: { label: string; key: any }[];
  setItem: (value: { label: string; key: any }) => void;
  selectedItem: { key: string; label: string };
}
export default function Selector({ data, setItem, selectedItem }: IProps) {
  const handleChange = (value: number) => {
    setItem(data[value]);
  };

  return (
    <div className="selector__box">
      <Select
        defaultValue={0}
        className="center selector"
        onChange={handleChange}
      >
        {data.map((province, i) => (
          <Select.Option value={i}>{province.label}</Select.Option>
        ))}
      </Select>
    </div>
  );
}
