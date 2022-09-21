export type type_date = "y" | "M" | "d";

export type type_date_obj = { y: number; m: number; d: number };

export type type_key_label = { key: string; label: string };

export type typeSetState<T> = React.Dispatch<React.SetStateAction<T>>;

type tDispatch<T> = React.Dispatch<React.SetStateAction<T>>;
