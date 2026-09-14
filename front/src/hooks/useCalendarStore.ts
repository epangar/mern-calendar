import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEvent } from "../store";

export const useCalendarStore = () =>{
    const dispatch = useDispatch()
    const  {events, activeEvent} = useSelector((state:any) => state.calendar) ;    
    
    const setActiveEvent =(calendarEvent:any)=>{
        dispatch(onSetActiveEvent(calendarEvent))
    }
    
    const startSavingEvent = async(calendarEvent)=>{

        if(calendarEvent._id){

        }else{

        }
    }
    return {
        events, 
        activeEvent,
        setActiveEvent,
        startSavingEvent
    }

}