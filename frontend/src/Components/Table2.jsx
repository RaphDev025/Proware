import React from 'react'
import { IconPark } from 'assets/SvgIcons'
import { iconPath } from 'Utils/handlingFunction'

const Table = ({data, headers, height='430px', onDelete }) => {
    
    return (
        <div role="table" className='w-100'>
            <TableHeader headers={headers} />
            <TableBody dataContents={data} height={height} onDelete={onDelete} />
        </div>
    )
}

const TableBody = ({dataContents, height, onDelete }) => {

    return(
        <div className='d-flex flex-column w-100 gap-2 table-container' role='rowgroup' style={{height: height}}>
        {dataContents.map((data) => (
            <div role='row' key={data._id} className={`table-row d-flex text-center py-2 rounded-3  `} >
                <span className='w-100 text-truncate text-light' style={{fontSize: '12px'}} role='cell' >
                    {data.user_id}
                </span>
                <span className='w-100 text-truncate text-light' style={{fontSize: '12px'}} role='cell' >
                    {data.user_name}
                </span>
                <span className='w-100 text-truncate text-light' style={{fontSize: '12px'}} role='cell' >
                    {data.category}
                </span>
            <div className='d-flex gap-3 w-100 justify-content-center '>
                    <button className='btn btn-sm text-light'>
                    <IconPark path={iconPath('', 'messages', 'heroicons:magnifying-glass-plus-20-solid', 'heroicons:magnifying-glass-plus-20-solid')} size={20} />
                </button>
                <button className='btn btn-sm text-light'>  
                    <IconPark path={iconPath('', 'messages', 'akar-icons:edit', 'akar-icons:edit')} size={20} />
                </button>
                <button className='btn btn-sm text-light' onClick={() => onDelete(data)}>  
                    <IconPark path={iconPath('', 'messages', 'mdi:trash-can-outline', 'mdi:trash-can-outline')} size={20} />
                </button>
            </div>
            </div>
        ))}
        </div>
    )
}

const TableHeader = ({headers}) => {
    return (
        <div role='rowgroup'>
            <div role='row' className='d-flex gap-2 header-txt mb-3 p-2 rounded-3' style={{backgroundColor: '#2E3039'}}>
            {headers.map((header, indx) => (
                <span key={indx} role='cell' className='w-100 text-light text-center'>{header}</span>
            ))}
            </div>
        </div>
    )
}
export default Table