import api from "./api";

export const registerCitizenService = async (credentials) => {
  const response = await api.post('/citizen/auth/register', credentials);
  return response.data;
}
export const loginCitizenService = async (credentials) => {
  const response = await api.post('/citizen/auth/login', credentials);
  return response.data;
}
export const validateOtpService = async (otp, email) => {
  const response = await api.post('/citizen/auth/verify-otp', { otp, email });
  return response.data;
}
export const logoutCitizenService = async () => {
  const response = await api.post('/citizen/auth/logout');
  return response.data;
}
export const fetchCurrentCitizenService = async () => {
  const response = await api.get('/citizen/auth/profile');
  return response.data;
}

export const resendOtpCitizenService = async (email) => {
  const response = await api.post('/citizen/auth/send-otp', { email });
  return response.data;
}

export const resetPasswordCitizenService = async (email, newPassword, token) => {
  const response = await api.patch('/citizen/auth/reset-password', { email, newPassword }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
}

export const addAddressCitizenService = async (address) => {
  const response = await api.put('/citizen/address', address);
  return response.data;
}