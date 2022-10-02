export const initUserFormState = {
  email: "",
  nickname: "",
  image: undefined as File | undefined,
  careerList: [] as [number, number][],
  location1: 0,
  location2: 0,
};

export type tUserFormData = typeof initUserFormState;
