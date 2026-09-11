import { useState } from 'react';
import { NavBar } from "../components/NavBar";
import { Calendar, type View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours } from 'date-fns';
import { getMessagesES, localizer } from "../../helpers";
import { CalendarEvent } from '../components/CalendarEvent';
import { CalendarModal } from '../components/CalendarModal';

const events = [{
  title: 'Big Meeting',
  notes: "Comprar cosas para la reunión",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Fernando'
  }
}];


export const CalendarPage = () => {

  // Control explícito de la vista y la fecha
  const validViews: View[] = ['month', 'week', 'day', 'agenda'];

    
  const [lastView, setLastView] = useState(() => (localStorage.getItem('lastView') as View | null) ?? 'week');

  /**
   * const [lastView, setLastView] = useState<View>(() => {
        const saved = localStorage.getItem('lastView');
        return saved && validViews.includes(saved as View) ? (saved as View) : 'month';
    });
   */
  
  const [date, setDate] = useState<Date>(new Date());

  const eventStyleGetter = (event: any, start: any, end: any, isSelected: any) => {
    console.log({ event, start, end, isSelected });

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    };

    return { style };
  };

  const onDoubleClick = (event: any) => {
    console.log({doubleClick: event});
  }

  const onSelect = (event: any) => {
    console.log({click: event});
  }

  const onViewChanged = ( event :any) => {
    localStorage.setItem('lastView', event );
    setLastView( event )
  }

  return (
    <>
      <NavBar />
      <CalendarModal/>     
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day', 'agenda']}
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
            event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}

        // Control de vista y fecha
        date={date}
        onNavigate={(nextDate) => {
          console.log('onNavigate ->', nextDate);
          setDate(nextDate);
        }}
      />
    </>
  );
};
