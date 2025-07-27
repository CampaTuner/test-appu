import api from "./api";

export const getAllNotificationService = async () => {
    const response = await api.get('/notification/citizen');
    return response.data;
}

export const deleteAllNotificationsService = async () => {
    const res = await api.delete(`notification/citizen`);
    return res.data;
};
