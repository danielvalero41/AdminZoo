import { DELETE, GET, POST, PUT } from "./request";

export const createZone = async (name: string) => {
  const response = await POST("/zone", { name });
  return response;
};

export const getZones = async () => {
  const response = await GET<Array<{ _id: string; name: string; __v: number }>>(
    "/zone"
  );
  return response;
};

export const updateZone = async (id: string, name: string) => {
  const response = await PUT(`/zone/${id}`, { name });
  return response;
};

export const deleteZone = async (id: string) => {
  const response = await DELETE(`/zone/${id}`);
  return response;
};
