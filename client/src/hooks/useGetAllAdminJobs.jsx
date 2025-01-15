// src/hooks/useGetAllAdminJobs.jsx
import { setAllAdminJobs } from '@/redux/jobSlice'; // Import the action for setting admin jobs
import { JOB_API_END_POINT } from '../components/utils/constants';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs)); // Dispatch the action to set admin jobs
        }
      } catch (error) {
        // Handle error
      }
    };
    fetchAllAdminJobs();
  }, [dispatch]); // Add `dispatch` as a dependency
};

export default useGetAllAdminJobs;
