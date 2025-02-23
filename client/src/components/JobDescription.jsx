import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../components/utils/constants';
import { setSingleJob } from '@/redux/jobSlice'; // Now correctly imports setSingleJob
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Facebook, Twitter, Linkedin, Share2 } from "lucide-react";


const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
        dispatch(setSingleJob(updatedSingleJob)); // Helps us to real-time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)); // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        // Handle error if needed
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareJob = (platform) => {
    const url = window.location.href;
    const title = `Check out this job: ${singleJob?.title} at ${singleJob?.company?.name}`;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className='min-h-screen bg-gray-50 font-sans'>
      {/* Hero Section */}
      <div className='w-full bg-gradient-to-r from-[#00b4d8] to-[#0096c7] text-white py-12 sm:py-16 md:py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <h1 className='font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 tracking-tight'>{singleJob?.title}</h1>
          <p className='font-display text-xl sm:text-2xl mb-4 sm:mb-6 font-medium'>{singleJob?.company?.name}</p>
          <p className='text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl leading-relaxed font-light'>
            {singleJob?.description?.split('.')[0]}
          </p>
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
            <Link to={`/company/${singleJob?.company?._id}`}>
              <Button variant="outline" className='w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all'>
                VIEW COMPANY
              </Button>
            </Link>
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className='w-full sm:w-auto bg-white text-[#00b4d8] hover:bg-gray-100 font-medium transition-all'>
              {isApplied ? 'ALREADY APPLIED' : 'APPLY FOR THIS JOB'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
          {/* Left Column */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-sm mb-6 sm:mb-8'>
              <div className='flex flex-col sm:flex-row sm:items-center gap-4 mb-6'>
                <div className='w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center'>
                  {singleJob?.company?.logo ? (
                    <img src={singleJob.company.logo} alt="" className='w-12 h-12 object-contain' />
                  ) : (
                    <span className='font-display text-2xl font-bold text-gray-400'>
                      {singleJob?.company?.name?.[0]}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className='font-display text-lg sm:text-xl font-semibold'>{singleJob?.title} <span className='text-gray-500'>({singleJob?.jobType})</span></h2>
                  <p className='text-gray-600'>{singleJob?.company?.name} - {singleJob?.location}</p>
                  <p className='text-[#00b4d8] font-medium'>{singleJob?.salary} {singleJob?.salaryUnit} + Benefits</p>
                </div>
              </div>

              <div className='prose max-w-none'>
                <p className='text-gray-600 whitespace-pre-line mb-8 leading-relaxed'>{singleJob?.description}</p>
                
                <h3 className='font-display text-xl font-semibold mb-4'>Requirements</h3>
                <ul className='list-disc pl-5 space-y-2 text-gray-600 mb-8'>
                  {singleJob?.requirements?.map((req, index) => (
                    <li key={index} className='leading-relaxed'>{req}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className='bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-sm'>
              <h3 className='font-display text-lg sm:text-xl font-semibold mb-4'>Skills</h3>
              <div className='flex flex-wrap gap-2'>
                {['USER EXPERIENCE', 'USER INTERFACE', 'PHOTOSHOP', 'PROTOTYPE', 
                  'WIREFRAME', 'PROJECT MANAGEMENT', 'BASIC ANIMATION'].map((skill, index) => (
                  <Badge 
                    key={index} 
                    className='bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors px-4 py-2 rounded-md font-medium'>
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className='space-y-4 sm:space-y-6'>
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className='w-full py-6 text-lg font-display bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 font-medium transition-all shadow-md hover:shadow-lg'>
              {isApplied ? 'Already Applied' : 'Apply for this job'}
            </Button>

            <div className="bg-white rounded-lg p-5 shadow-sm border">
              <Button 
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="w-full flex items-center justify-between py-3 px-4 bg-white hover:bg-gray-50 border rounded-md transition-all"
              >
                <span className="text-base font-semibold text-gray-700">Share Position</span>
                <Share2 className="w-5 h-5 text-gray-600" />
              </Button>
              
              {showShareOptions && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 animate-in slide-in-from-top-4 duration-200">
                  <Button
                    onClick={() => shareJob('facebook')}
                    className="w-full h-16 bg-white border hover:bg-[#1877f2]/5 rounded-lg transition-all group"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#1877f2]/10 flex items-center justify-center group-hover:bg-[#1877f2]/20 transition-all">
                        <Facebook className="w-4 h-4 text-[#1877f2]" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-[#1877f2] transition-colors">
                        Facebook
                      </span>
                    </div>
                  </Button>

                  <Button
                    onClick={() => shareJob('twitter')}
                    className="w-full h-16 bg-white border hover:bg-[#1da1f2]/5 rounded-lg transition-all group"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#1da1f2]/10 flex items-center justify-center group-hover:bg-[#1da1f2]/20 transition-all">
                        <Twitter className="w-4 h-4 text-[#1da1f2]" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-[#1da1f2] transition-colors">
                        Twitter
                      </span>
                    </div>
                  </Button>

                  <Button
                    onClick={() => shareJob('linkedin')}
                    className="w-full h-16 bg-white border hover:bg-[#0a66c2]/5 rounded-lg transition-all group"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#0a66c2]/10 flex items-center justify-center group-hover:bg-[#0a66c2]/20 transition-all">
                        <Linkedin className="w-4 h-4 text-[#0a66c2]" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-[#0a66c2] transition-colors">
                        LinkedIn
                      </span>
                    </div>
                  </Button>
                </div>
              )}
            </div>

            <div className='bg-white rounded-lg p-5 shadow-sm border relative z-10'>
              <h3 className='text-base font-semibold mb-3'>Job URL</h3>
              <div className='flex gap-0'>
                <input
                  type="text"
                  readOnly
                  value={window.location.href}
                  className='flex-grow p-3 text-sm border rounded-l-md bg-gray-50 truncate focus:outline-none'
                />
                <Button 
                  className='rounded-l-none bg-gradient-to-r from-[#00b4d8] to-[#0096c7] hover:from-[#0096c7] hover:to-[#0087b3] text-base px-6 transition-all'
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success('URL copied to clipboard!');
                  }}
                >
                  Copy
                </Button>
              </div>
            </div>

            {singleJob?.company?.name && (
              <div className='mt-6'>
                <h3 className='text-lg font-semibold mb-2'>More from {singleJob.company.name}</h3>
                {/* Add related jobs here if needed */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
