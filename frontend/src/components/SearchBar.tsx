import { TextField } from "@mui/material";

export const SearchBar = ({
    value,
    setValue,
  }: {
    value: string;
    setValue: (e: any) => void;
  }) => {
    return <TextField value={value} className="w-[60vw]" variant="outlined" label="Search here..." onChange={setValue} />;
  };
  