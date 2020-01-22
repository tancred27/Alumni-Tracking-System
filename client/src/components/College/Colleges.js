import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CollegeItem from './CollegeItem';
import AlumniContext from '../../context/alumni/alumniContext';
import CollegeFilter from '../../context/alumni/CollegeFilter';

const Colleges = () => {

    const alumniContext = useContext(AlumniContext);

    const { filteredColleges, colleges, getColleges } = alumniContext;

    useEffect(() => {
        try{
            getColleges();
        }
        catch(err){
           console.log(err.message);
        }
        // eslint-disable-next-line
    }, []);

    if(colleges.length === 0){
        return <h4>Please add a contact!</h4>
    }

    return (
        <Fragment>
            <CollegeFilter />
            <TransitionGroup>
            {(filteredColleges || colleges).map(alumnus => (
                <CSSTransition key={alumnus._id} classNames="item" timeout={500}>
                    <CollegeItem alumnus={alumnus} />
                </CSSTransition>
            ))}
            </TransitionGroup>
        </Fragment>
    );
};

export default Colleges;