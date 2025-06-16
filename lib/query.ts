import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type useFindOneProps = {
  api: string;
  key: string;
  id: string;
};

export const useFindOne = ({ api, key, id }: useFindOneProps) => {
  return useQuery({
    queryKey: [key, { id }],
    queryFn: async () =>
      await axios.get(`${api}/${id}`).then((res) => res.data),
    enabled: id ? true : false,
  });
};

type useFindManyProps = {
  api: string;
  key: string;
};

export const useFindMany = ({ api, key }: useFindManyProps) => {
  return useQuery({
    queryKey: [key],
    queryFn: async () => await axios.get(api).then((res) => res.data),
  });
};
