import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';
// const tempEvent =   {
//     id: new Date().getTime(),
//     title: 'Cumpleaños del Jefe',
//     notes: 'Hay que comprar el pastel',
//     start: new Date(),
//     end: addHours( new Date(), 2 ),
//     bgColor: '#fafafa',
//     user: {
//       _id: '123',
//       name: 'Fernando'
//     }
// };


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [] as any[],
        activeEvent: null as any,
    },
    reducers: {
        onSetActiveEvent: ( state:any, { payload }:any) => {
            console.log(payload)
            state.activeEvent = payload;
        },
        onAddNewEvent: ( state:any, { payload }:any) => {
            console.log(payload)
            state.events.push( payload );
            state.activeEvent = null;
        },
        onUpdateEvent: ( state:any, { payload }:any) => {
            console.log(payload)
            state.events = state.events.map( (event:any) => {
                if ( event.id === payload.id ) {
                    return payload;
                }

                return event;
            });
        },
        onDeleteEvent: ( state:any ) => {
            if ( state.activeEvent ) {
                state.events = state.events.filter( (event:any) => event.id !== state.activeEvent.id );
                state.activeEvent = null;
            }
        },
        onLoadEvents: (state, { payload = [] }) => {
            console.log(payload)
            state.isLoadingEvents = false;
            // state.events = payload;
            payload.forEach( (event:any) => {
                const exists = state.events.some( (dbEvent:any) => dbEvent.id === event.id );
                if ( !exists ) {
                    state.events.push( event )
                }
            })
        },
        onLogoutCalendar: ( state ) => {
            state.isLoadingEvents = true,
            state.events      = []
            state.activeEvent = null
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    onAddNewEvent,
    onDeleteEvent,
    onLoadEvents,
    onLogoutCalendar,
    onSetActiveEvent,
    onUpdateEvent,
} = calendarSlice.actions;