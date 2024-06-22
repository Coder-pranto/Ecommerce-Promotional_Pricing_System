import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchDistricts = async (url) =>
  await axios({
    method: "GET",
    url: url,
    //   headers: {
    //     "X-RapidAPI-Key": "74f556d978msha2ca0a2a7997543p17b758jsnbc5d8b7d758e",
    //     "X-RapidAPI-Host": "bdapi.p.rapidapi.com",
    //   },
  });

export const districtQuery = (key, url) =>
  useQuery({
    queryKey: key,
    queryFn: async () => await fetchDistricts(url),
  });
