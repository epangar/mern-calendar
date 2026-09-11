export const CalendarEvent =  ({event}:any) => {
    console.log(event);     

    const {title, user} = event;
     return (
        <>
            <div>Calendar Event</div>
            <strong>{title}</strong>
            <span> - {user.name}</span>
        </>
     )
}