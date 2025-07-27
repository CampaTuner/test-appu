import { useDispatch, useSelector } from 'react-redux';
import { garbageDetailsService, garbageHistoryService, reportGarbageService } from '../../services/garbageService';
import { setAllGarbages } from '../../redux/slices/garbageSlice';
import { setMessage } from '../../redux/slices/uiSlice';

export const useGarbage = () => {
    const dispatch = useDispatch();
    const { allGarbages } = useSelector((state) => state.garbage);

    const garbageReport = async (garbageData) => {
        try {
            let res = await reportGarbageService(garbageData);
            let newReport = {
                _id: res.data._id,
                type: res.data.type,
                status: res.data.status,
                assignedToMunicipality: { name: res.data.municipalityName },
                location: { address: res.data.location.address },
                createdAt: res.data.createdAt,
            }
            dispatch(setAllGarbages([newReport, ...(allGarbages || [])]));
            dispatch(setMessage({ text: res.message, type: 'success' }));
        } catch (error) {
            const msg = error?.response?.data?.message || 'Garbage report failed. Please try again.';
            dispatch(setMessage({ text: msg, type: 'error' }));
            return false;
        }
    }

    const garbageHistory = async (query) => {
        try {
            let res = await garbageHistoryService(query);
            return res.data;
        } catch (error) {
            const msg = error?.response?.data?.message || 'Garbage history failed. Please try again.';
            dispatch(setMessage({ text: msg, type: 'error' }));
            return false;
        }
    }

    const garbageDetails = async (id) => {
        try {
            let res = await garbageDetailsService(id);
            return res;
        } catch (error) {
            const msg = error?.response?.data?.message || 'Garbage details failed. Please try again.';
            dispatch(setMessage({ text: msg, type: 'error' }));
            return false;
        }
    }

    return {
        garbageReport,
        garbageHistory,
        garbageDetails
    };

}