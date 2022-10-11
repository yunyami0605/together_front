import { useLocation } from "react-router-dom";

export default function useCustomQuery(url?: string) {
  const search = useLocation().search;

  if (url) {
    // url props 존재 시, 해당 query 반환.
    const urlSplit = url.split("?");
    if (urlSplit.length === 2) return new URLSearchParams(urlSplit[1]);
  }

  return new URLSearchParams(search);
}
