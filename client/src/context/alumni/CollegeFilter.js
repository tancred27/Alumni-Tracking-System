import React, { useContext, useRef, useEffect } from 'react';
import AlumniContext from './alumniContext';

const CollegeFilter = () => {
    const alumniContext = useContext(AlumniContext);

    const { filterColleges, clearColFilter, filteredColleges } = alumniContext;

    const text = useRef('');

    useEffect(() => {
        if (filteredColleges === null){
            text.current.value = '';
        }
    })

    const onChange = e => {
        // text.current.value gives the value typed in the text box
        if(text.current.value !== ''){
            filterColleges(e.target.value);
        }
        else{
            clearColFilter();
        }
    }

    return (
        <form>
            <input ref={text} type="text" placeholder="Search for a college..." onChange={onChange} />
        </form>
    )
}

export default CollegeFilter
