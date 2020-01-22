import {
    UPDATE_PROFILE,
    GET_ALUMNI,
    GET_USERS,
    GET_PROFILE,
    ALUMNI_ERROR,
    GET_COLLEGES,
    COLLEGE_ERROR,
    AUTHENTICATE,
    GET_MY_PROFILE,
    FILTER_COLLEGES,
    FILTER_ALUMNI,
    CLEAR_COL_FILTER,
    CLEAR_AL_FILTER,
    SET_CURRENT_COLLEGE,
    SET_CURRENT_ALUMNUS
} from '../types';

export default (state, action) => {
    switch(action.type){
        case GET_ALUMNI:
            return {
                ...state,
                alumni: action.payload
            };
        
        case GET_USERS:
            return{
                ...state,
                users: action.payload
            };

        case GET_COLLEGES:
            return{
                ...state,
                colleges: action.payload
            };

        case GET_MY_PROFILE:
        case GET_PROFILE:
            return{
                ...state,
                user: action.payload
            };
       
        case AUTHENTICATE:
            return{
                ...state,
                user: action.payload
            };
        
        case FILTER_COLLEGES:
            return{
                ...state,
                filteredColleges: state.colleges.filter(college => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return college.name.match(regex);
                })
            };

        case FILTER_ALUMNI:
            return{
                ...state,
                filteredAlumni: state.alumni.filter(alumnus => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return alumnus.name.match(regex) || alumnus.college.match(regex) || alumnus.year.match(regex) || alumnus.branch.match(regex);
                })
            };


        case CLEAR_COL_FILTER:
            return{
                ...state,
                filteredColleges: null
            };
        
        case CLEAR_AL_FILTER:
            return{
                ...state,
                filteredAlumni: null
            };

        case UPDATE_PROFILE:
            return{
                ...state,
                user: action.payload
            };

        case ALUMNI_ERROR:
        case COLLEGE_ERROR:
            return{
                ...state,
                error: action.payload
            };

        case SET_CURRENT_COLLEGE:
            return{
                ...state,
                currentCollegeId : action.payload
            };
        
        case SET_CURRENT_ALUMNUS:
            return{
                ...state,
                currentAlumnusId : action.payload
            };

        default: 
            return state;
    }
}