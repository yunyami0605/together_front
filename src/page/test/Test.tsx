import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface IvalidationForm {
  id: string;
  age: number;
}

export default function Test() {
  const schema = yup.object().shape({
    id: yup.string().required("아이디를 입력해주세요."), // required 설정
    age: yup
      .number()
      .min(3, "3이상 값을 입력해주세요.")
      .max(10, "10이하 값을 입력해주세요.")
      .typeError("값을 입력해주세요."), // 최솟값, 최댓값 설정
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IvalidationForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      // 초기값 설정
      id: "",
      age: 0,
    },
  });

  const check = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <div>
        <input type="text" {...register("id")} />
        {errors.id && <h3>{errors.id.message}</h3>}

        <input type="number" {...register("age")} />
        {errors.age && <h3>{errors.age.message}</h3>}
      </div>

      <div>
        <button onClick={handleSubmit(check)}>확인</button>
      </div>
    </div>
  );
}
