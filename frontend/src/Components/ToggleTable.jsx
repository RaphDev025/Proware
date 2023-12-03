import React, {useState, useEffect} from 'react'
import {IconPark} from 'assets/SvgIcons'
import {iconPath} from 'Utils/handlingFunction'

const ToggleTable = ({data, headers, height='430px', onDelete }) => {
    // State to keep track of the checked checkboxes
    const [checkedItems, setCheckedItems] = useState({});

    useEffect(() => {
        // Initialize checked items based on data
        const initialCheckedItems = {}
            data.forEach((item) => {
            initialCheckedItems[item._id] = item.status === 'Selling'
        })
        setCheckedItems(initialCheckedItems)
    }, [data])

    // Function to handle checkbox change
    const handleCheckboxChange = async (itemId) => {
        try {
            // Update the state with the new checked items
            setCheckedItems((prevCheckedItems) => ({
                ...prevCheckedItems,
                [itemId]: !prevCheckedItems[itemId],
            }));

            // Make an API call to update the status in the database
            const response = await fetch(`https://modiform-api.vercel.app/api/products/${itemId}`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                status: checkedItems[itemId] ? 'Stored' : 'Selling',
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update status')
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    }

    return (
        <div role="table" className='w-100 text-center'>
            <TableHeader headers={headers} />
            {data.length !== 0 ? <TableBody
                dataContents={data}
                height={height}
                onDelete={onDelete}
                onCheckboxChange={handleCheckboxChange}
                checkedItems={checkedItems}
            /> : <h4 className='text-light d-flex align-items-center justify-content-center'>No Products Added...</h4>}
        </div>
    )
}

const TableBody = ({dataContents, height, onDelete, onCheckboxChange, checkedItems }) => {

    return(
        <div className='d-flex flex-column w-100 gap-2 table-container' role='rowgroup' style={{height: height}}>
        {dataContents.map((data, indx) => (
            <div role='row' key={indx} className={`table-row d-flex align-items-center text-light text-center py-2 rounded-3  `} >
                <span className='w-100 text-truncate ' style={{fontSize: '12px'}} role='cell'>
                    {data.invClass}
                </span>
                <span className='w-100 text-truncate ' style={{fontSize: '12px'}} role='cell'>
                    {data.category}
                </span>
                <span className='w-100 text-truncate ' style={{fontSize: '12px'}} role='cell'>
                    {data.item_code}
                </span>
                <span className='w-100 text-truncate ' style={{fontSize: '12px'}} role='cell'>
                    {data.item_name}
                </span>
                <span className='w-100 text-truncate ' style={{fontSize: '12px'}} role='cell'>
                    {data.qty}
                </span>

                <span
                    className={`w-100 text-truncate rounded-4 py-2 `}
                    style={{ fontSize: '12px', backgroundColor: `${checkedItems[data._id] ? 'green' : 'red'}` }}
                    role='cell'
                >
                    {checkedItems[data._id] ? 'Selling' : 'Stored'}
                </span>

                <span className='w-100 text-truncate' style={{fontSize: '12px'}} role='cell'>
                    <button className='btn text-light'>
                        <IconPark path={iconPath('', 'messages', 'heroicons:magnifying-glass-plus-20-solid', 'heroicons:magnifying-glass-plus-20-solid')} size={20} />
                    </button>
                </span>

                <span className='w-100 p-0 form-switch' style={{ fontSize: '12px' }} role='cell'>
                    <input
                        type={'checkbox'}
                        role='switch'
                        className={`form-check-input py-2 px-3 ${checkedItems[data._id] ? 'bg-success' : 'bg-danger'}`}
                        checked={!!checkedItems[data._id]}
                        onChange={() => onCheckboxChange(data._id)}
                    />
                </span>

                <span className='w-100' style={{fontSize: '12px'}} role='cell'>
                    <button className='btn btn-sm text-light'>  
                        <IconPark path={iconPath('', 'messages', 'akar-icons:edit', 'akar-icons:edit')} size={20} />
                    </button>
                    <button className='btn btn-sm text-light' onClick={() => onDelete(data)}>  
                        <IconPark path={iconPath('', 'messages', 'mdi:trash-can-outline', 'mdi:trash-can-outline')} size={20} />
                    </button>
                </span>
            </div>
        ))}
        </div>
    )
}

const TableHeader = ({headers}) => {
    return (
        <div role='rowgroup'>
            <div role='row' className='d-flex gap-2 header-txt mb-3 p-2 rounded-3 text-light' style={{backgroundColor: '#2E3039'}}>
            {headers.map((header, indx) => (
                <span key={indx} role='cell' className='w-100 text-center'>{header}</span>
            ))}
            </div>
        </div>
    )
}
export default ToggleTable