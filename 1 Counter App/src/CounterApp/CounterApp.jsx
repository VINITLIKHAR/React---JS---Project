import React, { useState } from 'react'
import '../CounterApp/CounterApp.css'


const Counter = () => {

    const [count, setcount] = useState(0)

  return (
    <div>
      <div className="counter_container">
        <h1>Counter App</h1>

        <div className="count_display">{count}</div>


        {/* Buttons */}
        <div className="button_group">
          <button onClick={()=> setcount(count - 1)} className='btn decrement'>-</button>
          <button onClick={()=> setcount(0)} className='btn reset'>Reset</button>
          <button onClick={()=> setcount(count + 1)} className='btn increment'>+</button>
        </div>
      </div>
    </div>
  )
}

export default Counter