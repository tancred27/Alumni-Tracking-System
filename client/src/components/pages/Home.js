import React from 'react';
import Alumni from '../Alumni/Alumni';
import AlumniFilter from '../Alumni/AlumniFilter';

const Home = () => {
    return (
        <div className="grid-2">
            <div>
                <AlumniFilter />
                <Alumni />
            </div>
        </div>
    );
};

export default Home
