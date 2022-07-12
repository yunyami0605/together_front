import "./HeaderMenu.scss";
import { Dropdown, Menu, Space } from "antd";
import { deleteCookie } from "common/tool";

interface IProps {}
export default function HeaderMenu() {
  const onLogout = () => {
    // 로그아웃 로직
  };

  const menuOverlay = (
    <Menu
      onClick={(item) => {
        console.log(item);
        // setItem(item.key);
      }}
      items={[
        {
          label: <a href={"http://localhost:4000/user/info"}>내 정보</a>,
          key: "my_info",
        },
        { label: <button onClick={onLogout}>로그아웃</button>, key: "logout" },
      ]}
    />
  );

  return (
    <div className="header__menu">
      <Dropdown overlay={menuOverlay} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Space className="center" align="center">
            <div className="header__my__img"></div>
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}
