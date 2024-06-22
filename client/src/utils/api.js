import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";


const apiBaseUrl = "http://localhost:5000/api/v1";

const myAxios = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-type": "multipart/form-data",
  },
});

// Function to fetch data take (url, token, method, data) and return response data
export const fetchData = async (url, token, method = "get", data = null) => {
  const config = {
    method,
    url,
    headers: {
      Authorization: `${token}`,
    },
    data,
  };

  const response = await myAxios(config);
  // console.log(response);
  return response;
};

// Function to use with useQuery. we can cached the data using useQuery (GET request)
export const useDataQuery = (key, url, token, method = "get", data = null) => {
  const queryClient = useQueryClient();
  return useQuery(key, async () => await fetchData(url, token, method, data), {
    onSuccess: (fetchedData) => {
      // Cache the data after a successful request
      queryClient.setQueryData(key, fetchedData);
    },
  });
};

// Function to use with useMutation for creating data (POST request)
export const useCreateMutation = (key, url, token) => {
  const queryClient = useQueryClient();
  //pras changed here
  return useMutation((newData) => fetchData(url, token, "post", newData), {
    onSuccess: () => {
      // Invalidate and refetch the query to update the cache
      queryClient.invalidateQueries(key);
    },
  });
};

// Function to use with useMutation for updating data (PATCH request)
export const useUpdateMutation = (key, url, token) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, updatedData }) =>
      fetchData(`${url}/${id}`, token, "patch", updatedData),
    {
      onSuccess: () => {
        // Invalidate and refetch the query to update the cache
        queryClient.invalidateQueries(key);
      },
    }
  );
};

// Function to use with useMutation for deleting data (DELETE request)
export const useDeleteMutation = (key, url, token) => {
  const queryClient = useQueryClient();

  return useMutation(
    (ids) => {
      const deletePromises = ids.map((id) =>
        fetchData(`${url}/${id}`, token, "delete")
      );
      return Promise.all(deletePromises);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch the query to update the cache
        queryClient.invalidateQueries(key);
      },
    }
  );
};
