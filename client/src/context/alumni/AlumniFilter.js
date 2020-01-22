import React, { useContext, useRef, useEffect } from 'react';
import AlumniContext from './alumniContext';

const AlumniFilter = () => {
    const alumniContext = useContext(AlumniContext);

    const { filterAlumni, clearAlFilter, filteredAlumni } = alumniContext;

    const text = useRef('');

    useEffect(() => {
        if (filteredAlumni === null){
            text.current.value = '';
        }
    })

    const onChange = e => {
        // text.current.value gives the value typed in the text box
        if(text.current.value !== ''){
            filterAlumni(e.target.value);
        }
        else{
            clearAlFilter();
        }
    }

    return (
        <form>
            <input ref={text} type="text" placeholder="Search for Alumni..." onChange={onChange} />
        </form>
    )
}

export default AlumniFilter
