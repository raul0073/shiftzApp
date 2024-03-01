import AddShift from "./AddShift"
import AllShifts from "./AllShifts"

function ShiftsTab({userID}:{userID:string}) {
  return (
    <section className='w-full flex flex-col justify-center items-center pt-12'>
         <AllShifts userID={userID}/>
             <div className="w-full my-8">
         <AddShift />
    </div>
    </section>
    
  )
}

export default ShiftsTab