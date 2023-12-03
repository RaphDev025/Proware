export const iconPath = (item, navItem, fillIcon, outlineIcon) => {
    return item === navItem ? fillIcon : outlineIcon
}
export const handleActiveItem = (item, setItem) => {
    setItem(item)
}

export const handleStatus = (status) => {
    switch(status){
        case 'Received':
        case 'received':
            return '#008659'
        case 'Processing':
        case 'processing':
            return '#9F580A'
        case 'Pending':
        case 'pending':
            return '#1A3B53'
        case 'Canceled':
        case 'canceled':
            return '#9F0A0A'
        default: 
            return null
    }
}
