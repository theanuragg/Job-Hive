import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchedQuery: "", // Stores the searched query for jobs
  allJobs: [], // Stores the list of jobs fetched
  allAppliedJobs: [], // Stores the list of applied jobs
  singleJob: null, // Stores the details of a single job
  allAdminJobs: [], // Stores the list of admin jobs
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload; // Set searched query for jobs
    },
    setAllJobs: (state, action) => {
      state.allJobs = action.payload; // Set the jobs list
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload; // Set the applied jobs list
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload; // Set the details of a single job
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload; // Set the admin jobs list
    },
    setSearchJobByText: (state, action) => {
      state.searchedQuery = action.payload; // Set the filter text for searching jobs
    },
  },
});

// Exporting the actions
export const {
  setSearchedQuery,
  setAllJobs,
  setAllAppliedJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
} = jobSlice.actions;

export default jobSlice.reducer;
