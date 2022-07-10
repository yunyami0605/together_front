import { FC, useState } from "react";
import "./Dropbox.scss";
import { Dropdown, Menu, Space } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";

interface IProps {
  data: { label: string; key: any }[];
  setItem: (item: string) => void;
  selectedItem: string;
}
export default function Dropbox({ data, setItem, selectedItem }: IProps) {
  const dropdownMenu = (
    <Menu
      onClick={(item) => {
        console.log(item);
        setItem(item.key);
      }}
      items={data}
    />
  );

  return (
    <div className="dropbox">
      <Dropdown overlay={dropdownMenu} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Space className="center" align="center">
            <p>-- 선택 --</p>
            {/* <DownOutlined /> */}
            <CaretDownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}
