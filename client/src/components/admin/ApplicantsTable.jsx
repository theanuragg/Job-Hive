import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '../../components/utils/constants';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    const { user } = useSelector(store => store.auth);
    const [loading, setLoading] = React.useState(false);
    const [downloading, setDownloading] = React.useState(false);

    const statusHandler = async (status, id) => {
        // console.log('called');
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            // console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const sendOfferLetter = async(item) => {
        try {
            setLoading(true);
            const selectedItems = {
                    candidateName : item.applicant.fullname,
                    jobTitle : applicants.title,
                    companyId: applicants.company,
                    salary: applicants.salary,
                    location: applicants.location,
                    recruiterName: user.fullname,
                    userEmail: item.applicant.email
            };

           axios.defaults.withCredentials = true;
            const { data } = await axios.post(`${APPLICATION_API_END_POINT}/send-offer-letter`, selectedItems);

            if(data.success){
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
           toast.error(error.response.data.message); 
        }finally{
            setLoading(false);
        }
    }

    const downloadOfferLetter = async (item) => {
         try {
            setDownloading(true);
            const offerDetails = {
                    candidateName : item.applicant.fullname,
                    jobTitle : applicants.title,
                    companyId: applicants.company,
                    salary: applicants.salary,
                    location: applicants.location,
                    recruiterName: user.fullname,
                    userEmail: item.applicant.email
            };
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(
                `${APPLICATION_API_END_POINT}/download-offer-letter`,
                offerDetails,
                { responseType: "blob" } 
            );
            const blob = new Blob([data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `Offer_Letter_${offerDetails.candidateName}.pdf`;
            a.click();
            window.URL.revokeObjectURL(url);
            toast.success("Offer letter downloaded successfully");
        } catch (error) {
            console.error("Error downloading offer letter:", error);
            toast.error(error.response.data.message);
        }finally{
            setDownloading(false);
        }
    };

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item,index) => (
                            <tr key={item._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell >
                                    {
                                        item.applicant?.profile?.resume ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="float-right cursor-pointer">
                                    <Popover>
                                        <button className='mx-4 bg-orange-600 text-xs  px-2 py-1 rounded-lg text-white'
                                        onClick={() => sendOfferLetter(item,index)}
                                        disabled={loading}
                                        >
                                            {loading ? 'Sending...' : 'Send Offer Letter'}
                                        </button>
                                        <button className='mx-4 bg-orange-500 text-xs  px-2 py-1 rounded-lg text-white'
                                        onClick={() => downloadOfferLetter(item)}
                                        disabled={downloading}
                                        >{downloading ? "Downloading" : "Download Offer Letter"}</button>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {
                                                shortlistingStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={() => statusHandler(status, item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                        
                                    </Popover>

                                </TableCell>

                            </tr>
                        ))
                    }

                </TableBody>

            </Table>
        </div>
    )
}

export default ApplicantsTable