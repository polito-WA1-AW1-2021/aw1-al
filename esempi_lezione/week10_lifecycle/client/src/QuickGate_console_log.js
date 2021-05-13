import {useEffect, useState} from "react";

function QuickGate_console_log(props) {
    console.log("function QuickGate called");
    const [open, setOpen] = useState(false) ;

    console.log("run useEffect()");
    useEffect(()=>{
        console.log("Run callback registered with useEffect");
        setTimeout(()=>setOpen(false), 500)
    }, [open]) ;

    const openMe = () => {
        console.log("setState true");
        setOpen(true) ;
    } ;

    const stri=open? 'GO':'STOP';
    console.log("Return JSX with "+stri);
    return <div onClick={openMe}>
        {open ? <span>GO</span> : <span>STOP</span>}
    </div> ;
}

export default QuickGate_console_log ;