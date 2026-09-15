// import React from 'react'

// import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

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

export const FabDelete = ()=>{

    const {startDeletingEvent, hasEventSelected} = useCalendarStore();

    const handleDelete = () =>{
        startDeletingEvent()
    }

    


    return (
        
        <button
        className="btn btn-danger fab-danger"
        onClick={handleDelete}
        style={{
            display: hasEventSelected ? '' : 'none'
        }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )

}