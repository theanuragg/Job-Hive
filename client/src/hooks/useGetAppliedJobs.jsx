import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAllJobs } from '@/redux/jobSlice';

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs'); // Replace with your API endpoint
        const data = await response.json();
        dispatch(setAllJobs(data));
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [dispatch]);
};

export default useGetAllJobs;
