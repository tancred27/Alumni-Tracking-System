import React, { useReducer } from 'react';
import axios from 'axios';
import AlumniContext from './alumniContext';
import alumniReducer from './alumniReducer';
import {
    UPDATE_PROFILE,
    GET_ALUMNI,
    GET_USERS,
    ALUMNI_ERROR,
    GET_PROFILE,
    GET_COLLEGES,
    COLLEGE_ERROR,
    AUTHENTICATE,
    GET_MY_PROFILE,
    FILTER_COLLEGES,
    FILTER_ALUMNI,
    CLEAR_COL_FILTER,
    CLEAR_AL_FILTER
} from '../types';

const AlumniState = (props) => {
    const initialState = {
        user: null,
        users: [],
        alumni: [],
        colleges: [],
        filteredColleges: null,
        filteredAlumni: null,
        error: null
    };

    const [state, dispatch] = useReducer(alumniReducer, initialState);

    // Get any user profile:
    const getProfile = async id => {
        try{
            const res = await axios.get(`/api/users/${id}`);
            dispatch({ type: GET_PROFILE, payload: res.data })
        }
        catch(err){
            dispatch({
                type: ALUMNI_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Get Own Profile:
    const getMyProfile = async () => {
        try{
            const res = await axios.get('/api/userauth');
            dispatch({ type: GET_MY_PROFILE, payload: res.data });
        }
        catch(err){
            dispatch({
                type: ALUMNI_ERROR,
                payload: err.response.msg
            });
        }
    }

    // Get Alumni:
    const getAlumni = async id => {
        try {
            const res = await axios.get(`/api/college/${id}`);
            dispatch({ type: GET_ALUMNI, payload: res.data });
        }
        catch(err){
            dispatch({
                type: ALUMNI_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Get registered users:
    const getUsers = async () => {
        try{
            const res = await axios.get('/api/college');
            dispatch({ type: GET_USERS, payload: res.data }) 
        }
        catch(err){
            dispatch({
                type: ALUMNI_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Get Colleges:
    const getColleges = async () => {
        try{
            const res = await axios.get('/api/dir')
            dispatch({ type: GET_COLLEGES, payload: res.data });
        }
        catch(err){
            dispatch({
                type: COLLEGE_ERROR, 
                payload: err.response.msg
            });
        }
    };

    // Update alumni profile:
    const updateProfile = async () => {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        try{
            const res = await axios.put(`/api/users`, config);
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            })
        }
        catch(err){
            dispatch({
                type: COLLEGE_ERROR,
                payload: err.response.msg
            })
        }
    };

    // Authenticate a user:
    const authenticateUser = async user => {
        try{
            const res = await axios.put(`/api/college/${user._id}`);
            dispatch({
                type: AUTHENTICATE, payload: res.data
            })
        }
        catch(err){
            dispatch({
                type: COLLEGE_ERROR,
                payload: err.response.msg
            })
        }
    };

    // Filter Colleges:
    const filterColleges = text => {
        dispatch({
            type: FILTER_COLLEGES,
            payload: text
        })
    };

    // Filter Alumni:
    const filterAlumni = text => {
        dispatch({
            type: FILTER_ALUMNI,
            payload: text
        })
    };
 
    // Clear College Filter:
    const clearColFilter = () => {
        dispatch({
            type: CLEAR_COL_FILTER
        })
    };

    // Clear Alumni Filter:
    const clearAlFilter = () => {
        dispatch({
            type: CLEAR_AL_FILTER
        })
    };

    return(
        <AlumniContext.Provider
            value= {{
                users: state.users,
                alumni: state.alumni,
                colleges: state.colleges,
                filteredColleges: state.filteredColleges,
                filteredAlumni: state.filterAlumni,
                error: state.error,
                getProfile,
                getMyProfile,
                getUsers,
                getAlumni,
                getColleges,
                updateProfile,
                authenticateUser,
                filterColleges,
                filterAlumni,
                clearAlFilter,
                clearColFilter
            }}>
                {props.children}
            </AlumniContext.Provider>
    )
};

export default AlumniState;