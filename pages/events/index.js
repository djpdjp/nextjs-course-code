import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import {getEventById, getFeaturedEvents} from "../../helpers/api-util";

function AllEventsPage(props) {
  const router = useRouter();
  const {events} = props;

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

// export async function getStaticPaths() {
//   const events = await getFeaturedEvents();
//   const paths = events.map(event => ({params: {eventId: event.id}}));
//
//   return {
//     paths,
//     fallback: true
//   }
// }

export async function getStaticProps(context) {

  const events = await getAllEvents();
  return {
    props: {
      events
    },
    revalidate: 60
  }

}


export default AllEventsPage;
