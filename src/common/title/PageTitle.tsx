import { FC, useState } from "react";

interface IProps {
  title: string;
}
export default function PageTitle({ title }: IProps) {
  return (
    <div className="w100 row page__title">
      <div></div>
      <div></div>

      <h2>{title}</h2>
    </div>
  );
}
