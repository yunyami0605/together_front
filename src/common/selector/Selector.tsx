import { Select } from "antd";
import { useMemo } from "react";
import "./Selector.scss";

interface IProps {
  data: { label: string; key: any }[];
  setItem: (item: number) => void;
  selectedItem: number;
  className?: string;
  selectorStyle?: React.CSSProperties;
}
export default function Selector({
  data,
  setItem,
  selectedItem,
  className,
  selectorStyle,
}: IProps) {
  const handleChange = (value: number) => {
    setItem(value);
  };

  return (
    <div className={"custom_selector_box" + ` ${className}`}>
      <Select
        value={selectedItem}
        className="center custom_selector"
        onChange={handleChange}
        style={{ width: 140, height: 42, ...selectorStyle }}
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
