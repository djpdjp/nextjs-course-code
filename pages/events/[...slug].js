import {useRouter} from "next/router";
import {getFilteredEvents} from "../../dummy-data";
import EventList from "../../components/events/event-list";
import {Fragment} from "react";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

const FilteredEventsPage = () => {
    const router = useRouter();

    if(!router.query.slug) {
        return <p className='center'>Loading....</p>
    }

    if(isNaN(!+router.query.slug[0]) || isNaN(+router.query.slug[1])){
        return <Fragment>
            <ErrorAlert>
                <p>Invalid Filter.  Please adjust your values.</p>
            </ErrorAlert>
            <div className='center'>
                <Button  link='/events' >Show all Events</Button>
            </div>
        </Fragment>
    }

    const filterData = getFilteredEvents({year: +router.query.slug[0],
        month: +router.query.slug[1]})

    return (
        <Fragment>
            <ResultsTitle date={new Date(+router.query.slug[0], +router.query.slug[1]-1)} />
            <EventList items={filterData}/>
        </Fragment>
    );
}

export default FilteredEventsPage;
