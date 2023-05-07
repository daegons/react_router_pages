import { Await, defer, json, useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>로딩중...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw json(
      { message: 'EventsPage 에러 내용 : 페치 실행 불가 ' },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

//서버가 아닌 브라우저에서 실행
export function loader() {
  return defer({
    events: loadEvents(),
  });
}
