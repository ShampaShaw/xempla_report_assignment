import TimelineIndex from "./TimeLine/TimelineIndex";
import * as React from 'react';

const AllComponentsPages = () => {
    return (
        <div className="d-flex flex-row flex-wrap" style={{ paddingTop: '70px' }}>
            <div className="col-12 p-4">
                <TimelineIndex />
            </div>
        </div>
    );
};

export default AllComponentsPages;