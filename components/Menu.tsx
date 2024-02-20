import { ActivityIcon, Calendar, ProjectorIcon, Settings2, Table2Icon } from 'lucide-react'
import React from 'react'

const menuItems = [
    {name: 'Overview',
    icon: <ProjectorIcon className='mr-2' />},
    {name: 'Analytics',
    icon: <ActivityIcon className='mr-2' />},
    {name: 'Shifts',
    icon: <Table2Icon className='mr-2' />},
    {name: 'Calendar',
    icon: <Calendar className='mr-2' />},
    {name: 'Account',
    icon: <Settings2 className='mr-2' />},

]
function Menu() {
  return (
    <div className="w-[20%] border-r-2 border-gray-100 min-h-full">
			<ul className="min-h-full flex flex-col items-center mt-8 px-1">
				{menuItems.map((item: any, index: number)=> {
                    return (
                        <li key={index} className="w-full flex justify-start items-center rounded-lg p-2 h-8 my-2 cursor-pointer hover:bg-gray-100">{item.icon} {item.name}</li>
                    )
                })}
			</ul>
		</div>
  )
}

export default Menu