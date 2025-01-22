import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const deleteCompany = createAsyncThunk(
    'company/delete',
    async (companyId) => {
        return companyId;
    }
);

const companySlice = createSlice({
    name:"company",
    initialState:{
        singleCompany:null,
        companies:[],
        searchCompanyByText:"",
        isLoading: false
    },
    reducers:{
        // actions
        setCompanyLoading: (state,action)=>{
            state.isLoading = action.payload;
        },
        setSingleCompany:(state,action) => {
            state.singleCompany = action.payload;
        },
        setCompanies:(state,action) => {
            state.companies = action.payload;
        },
        setSearchCompanyByText:(state,action) => {
            state.searchCompanyByText = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteCompany.fulfilled, (state, action) => {
            state.companies = state.companies.filter(
                company => company._id !== action.payload
            );
        });
    }
});
export const {setSingleCompany, setCompanies,setSearchCompanyByText,setCompanyLoading} = companySlice.actions;
export default companySlice.reducer;