import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '../../components/utils/constants';
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { jobInfoSchema } from '../utils/formValidation'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        salary: "",
        salaryUnit: "",
        location: "",
        jobType: "", // This is used for job type selection
        experience: "",
        position: 0,
        companyId: "" ,// This is used for company selection
        requirements: []
    });
    const [loading, setLoading]= useState(false);
    const navigate = useNavigate();
    

    const { companies } = useSelector(store => store.company);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // Change handler for selecting company
    const selectCompanyHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        if (selectedCompany) {
            setInput({ ...input, companyId: selectedCompany._id });
        }
    };

    const validateJobInfo=(input)=>{
        try {
            const {companyId,...rest}=input
            jobInfoSchema.parse(rest)
            return true;
        } catch (error) {
            const zodError={...error}
            toast.error(zodError.issues[0].message)
            return false;
        }
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        if(!validateJobInfo(input)){
            return;
        }
        try {
            setLoading(true);
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${JOB_API_END_POINT}/post`, { ...input },{
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const selectJobTypeHandler = (value) => {
        setInput({ ...input, jobType: value });
    }

    const handleRequirementsChange = (e) => {
        const values = e.target.value
            .split(",")
            .map((req) => req.trim()) 
            .filter((req) => req);    
        setInput((prev) => ({ ...prev, requirements: values }));
    };

    const selectSalaryUnitHandler = (value) => {
        setInput({ ...input, salaryUnit: value });
    };

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md bg-white'>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus:ring focus:ring-indigo-300 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus:ring focus:ring-indigo-300 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus:ring focus:ring-indigo-300 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary Unit</Label>
                            <Select onValueChange={selectSalaryUnitHandler}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Currency" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectGroup>
                                        <SelectItem value="USD">USD</SelectItem>
                                        <SelectItem value="INR">INR</SelectItem>
                                        <SelectItem value="EUR">EUR</SelectItem>
                                        <SelectItem value="GBP">GBP</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus:ring focus:ring-indigo-300 my-1"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Select onValueChange={selectJobTypeHandler}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Job Type" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectGroup>
                                        <SelectItem value="onsite">On Site</SelectItem>
                                        <SelectItem value="hybrid">Hybrid</SelectItem>
                                        <SelectItem value="remote">Remote</SelectItem>
                                        <SelectItem value="internship">Internship</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus:ring focus:ring-indigo-300 my-1"
                            />
                        </div>
                        <div>
                            <Label>No. of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                min="1"
                                onChange={(e)=>setInput({...input,position:Number(e.target.value)})}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <div>
                                    <Label>Company</Label>
                                    <Select onValueChange={selectCompanyHandler}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectGroup>
                                                {companies.map((company) => (
                                                    <SelectItem key={company._id} value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )
                        }
                    </div>

                    <div className='my-6'>
                        <Label>Requirements</Label>
                        <Input
                            type="text"
                            value={input.requirements.join(", ")}
                            onChange={handleRequirementsChange}
                            className="my-1 focus:ring focus:ring-indigo-300"
                            placeholder="Add new requirement separated by comma"
                        />
                    </div>

                    {
                        loading ? (
                            <Button className="w-full my-4">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4 bg-indigo-600 text-white hover:bg-indigo-700 transition duration-200 ease-in-out">
                                Post New Job
                            </Button>
                        )
                    }

                    {
                        companies.length === 0 && (
                            <p className='text-xs text-red-600 font-bold text-center my-3'>
                                *Please register a company first, before posting a job.
                            </p>
                        )
                    }
                </form>
            </div>
        </div>
    );
}

export default PostJob;
