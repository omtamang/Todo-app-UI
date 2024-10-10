import { useState } from 'react'
import './Counter.css'
import CounterButton from './CounterButtonB';


export default function Counter(){

    const [count, setCount] = useState(0);

    function incrementCounterParentFunction(by){
        setCount(count + by)
    }

    function decrementCounterParentFunction(by){
        if(count>0){
            setCount(count - by)
        }
    }

    function ResetCounter(by){
        setCount(0)
    }

    return (
        <>
            <span className="totalCount">{count}</span>
            <CounterButton by={1} incrementCounterParentFunction={incrementCounterParentFunction} decrementCounterParentFunction={decrementCounterParentFunction}/>
            <CounterButton by={2} incrementCounterParentFunction={incrementCounterParentFunction} decrementCounterParentFunction={decrementCounterParentFunction}/>
            <CounterButton by={3} incrementCounterParentFunction={incrementCounterParentFunction} decrementCounterParentFunction={decrementCounterParentFunction}/>
            <button className="ResetcounterButton"  onClick={ResetCounter}>RESET</button> 
        </>
    )
}