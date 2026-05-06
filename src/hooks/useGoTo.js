import { useNavigate } from "react-router-dom";

export function useGoTo(path) {
  const navigate = useNavigate();

  return (id) => {
    if (id) navigate(`${path}/${id}`);
    else navigate(path);
  };
}
