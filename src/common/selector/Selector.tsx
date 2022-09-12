import { Select } from "antd";
import "./Selector.scss";

interface IProps {
  data: { label: string; key: any }[];
  setItem: (item: number) => void;
  selectedItem: number;
  className?: string;
}
export default function Selector({
  data,
  setItem,
  selectedItem,
  className,
}: IProps) {
  const handleChange = (value: number) => {
    setItem(value);
  };

  return (
    <div className={"selector__box" + ` ${className}`}>
      <Select
        value={selectedItem}
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
