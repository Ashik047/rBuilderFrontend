import { serverURL } from "./serverURL";
import { commonAPI } from "./commonAPI";

export const addResumeAPI = async (reqBody) => {
    return await commonAPI("post", `${serverURL}/resumes`, reqBody);
}
export const addResumeHistoryAPI = async (reqBody) => {
    return await commonAPI("post", `${serverURL}/history`, reqBody);
}
export const getResumeHistoryAPI = async () => {
    return await commonAPI("get", `${serverURL}/history`, "");
}
export const deleteResumeHistoryAPI = async (id) => {
    return await commonAPI("delete", `${serverURL}/history/${id}`, "");
}
export const getResumeEditHistoryAPI = async (id) => {
    return await commonAPI("get", `${serverURL}/history/${id}`, "");
}
export const updateHistoryAPI = async (id, reqBody) => {
    return await commonAPI("put", `${serverURL}/history/${id}`, reqBody);
}