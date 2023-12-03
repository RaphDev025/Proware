import React from 'react'
import { IconPark } from 'assets/SvgIcons'
import { iconPath } from 'Utils/handlingFunction'

const Overview = ({data, icon, icoSize=40, desc, color='var(--light-black)'}) => {
    return (
        <div className='d-flex gap-3 p-3 text-light rounded-3 align-items-center justify-content-center w-25' style={{backgroundColor: `${color}`}}>
            <div className='trans-bg d-flex justify-content-center align-items-center' style={{width: '80px', height: '80px', borderRadius: '50%'}}>
                <IconPark path={iconPath('', 'overview', icon, icon)} size={icoSize}/>
            </div>
            <div className='w-50'>
                <h3 className='m-0'><b>{data}</b></h3>
                <figcaption style={{fontSize: '12px'}}>{desc}</figcaption>
            </div>
        </div>
    )
}

export default Overview