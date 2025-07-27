import api from "./api";

export const reportGarbageService = async (garbageData) => {
    const response = await api.post('/garbage/report', garbageData);
    return response.data;
}
export const garbageHistoryService = async (query) => {
    const response = await api.get(`garbage/citizen/my-reports?${query}`);
    return response.data;
}
export const garbageDetailsService = async (id) => {
    const response = await api.get(`garbage/${id}`);
    return response.data;
}