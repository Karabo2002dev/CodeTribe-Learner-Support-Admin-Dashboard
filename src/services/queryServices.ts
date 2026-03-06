import axiosInstance from "../api/axios";

export const respondToQuery = async (
  queryId: string,
  response: string
) => {
  const res = await axiosInstance.post("/queries/respond", {
    queryId,
    response,
  });

  return res.data;
};