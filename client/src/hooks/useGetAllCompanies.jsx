import { setCompanies} from '@/redux/companySlice'
import { COMPANY_API_END_POINT} from '../components/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCompanyLoading } from '@/redux/companySlice'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchCompanies = async () => {
            try {
                dispatch(setCompanyLoading(true));
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
                // console.log('called');
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }finally{
                dispatch(setCompanyLoading(false));
            }
        }
        fetchCompanies();
    },[])
}

export default useGetAllCompanies