// import React from 'react'

import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

const tempEvent =   {
    id: new Date().getTime(),
    title: 'Cumpleaños del Jefe',
    notes: 'Hay que comprar el pastel',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Fernando'
    }
};

export const FabAddNew = ()=>{

    const {openDateModal } = useUiStore();
    const {setActiveEvent} = useCalendarStore();

    const handleClickNew = () =>{
        setActiveEvent(tempEvent);
        openDateModal()
    }

    return (
        <button
        className="btn btn-primary fab"
        onClick={handleClickNew}
        >
            <i className="fas fa-plus"></i>
        </button>
    )

}