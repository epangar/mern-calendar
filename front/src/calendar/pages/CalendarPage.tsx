import { useState } from 'react';
import { Calendar, type View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getMessagesES, localizer } from "../../helpers";
import { CalendarEvent, CalendarModal, NavBar,  FabAddNew , FabDelete} from '../index'
import { useUiStore, useCalendarStore } from '../../hooks';
import { addHours } from 'date-fns';

const dummyEvent = [{
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
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent} = useCalendarStore(); 
  // setActiveEvent(dummyEvent)


  console.log(events)

  const validViews: View[] = ['month', 'week', 'day', 'agenda'];

  const isValidView = (v: any): boolean => {
    return validViews.includes(v as View)
  };

  const storedView = localStorage.getItem('lastView');
  const [view, setView] = useState<View>(isValidView(storedView) ? (storedView as View) : 'week');
  const [date, setDate] = useState<Date>(new Date());

  const eventStyleGetter = (
    // event: any, start: any, end: any, isSelected: any
  ) => {
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    };
    return { style };
  };

  const onDoubleClick = (event: any) => {
    console.log(event)
    openDateModal();
  };

  const onSelect = (event: any) => {
    setActiveEvent(event)
    // console.log({ click: event });
  };

  const onViewChanged = (nextView: View) => {
    if (!isValidView(nextView)) {
      return
    };


    localStorage.setItem('lastView', nextView);
    setView(nextView);
  };

  return (
    <>
      <NavBar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events && events.length > 0 ? events: dummyEvent}
        view={view}                 // vista controlada
        startAccessor="start"
        endAccessor="end"
        views={validViews}
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}

        // Control de fecha
        date={date}
        onNavigate={(nextDate, nextView) => {
          setDate(nextDate);
          // Si el navigate trae un cambio de vista, sincronízalo también
          if (nextView && isValidView(nextView) && nextView !== view) {
            localStorage.setItem('lastView', nextView);
            setView(nextView);
          }
        }}
      />

      <CalendarModal/>
      <FabAddNew/>
      <FabDelete/>
    </>
  );
};
