import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs } = useSelector(store => store.job);
    const [searchedQuery, setSearchedQuery] = useState('');
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedJobType, setSelectedJobType] = useState('');

    // Filter jobs based on search query and filters
    useEffect(() => {
        let filteredJobs = allJobs;

        if (searchedQuery) {
            filteredJobs = filteredJobs.filter((job) =>
                job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            );
        }

        if (selectedLocation) {
            filteredJobs = filteredJobs.filter(
                (job) => job.location.toLowerCase() === selectedLocation.toLowerCase()
            );
        }

        if (selectedJobType) {
            filteredJobs = filteredJobs.filter(
                (job) => job.jobType.toLowerCase() === selectedJobType.toLowerCase()
            );
        }

        setFilterJobs(filteredJobs);
    }, [allJobs, searchedQuery, selectedLocation, selectedJobType]);

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto mt-5">
                {/* Search and filter section */}
                <div className="flex items-center gap-4 mb-5">
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        value={searchedQuery}
                        onChange={(e) => setSearchedQuery(e.target.value)}
                        className="p-2 border rounded-md flex-1"
                    />
                    <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="p-2 border rounded-md"
                    >
                        <option value="">All Locations</option>
                        <option value="New York">New York</option>
                        <option value="San Francisco">San Francisco</option>
                        <option value="India">India</option>
                        {/* Add more locations dynamically if needed */}
                    </select>
                    <select
                        value={selectedJobType}
                        onChange={(e) => setSelectedJobType(e.target.value)}
                        className="p-2 border rounded-md"
                    >
                        <option value="">All Job Types</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Internship">Internship</option>
                        {/* Add more job types dynamically if needed */}
                    </select>
                </div>

                {/* Main content */}
                <div className="flex gap-5">
                    <div className="w-1/5">
                        <FilterCard />
                    </div>
                    <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                        {filterJobs.length <= 0 ? (
                            <span>No jobs found</span>
                        ) : (
                            <div className="grid grid-cols-3 gap-4">
                                {filterJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        key={job?._id}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
