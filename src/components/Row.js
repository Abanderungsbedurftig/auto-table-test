import React from 'react'

const Row = ({auto}) => {

    return (
        <tr>
            <td>{auto.vin}</td>
            <td>{auto.brand}</td>
            <td>{auto.dealer_id}</td>
            <td>{auto.dealer_name}</td>
        </tr>
    )
}

export default Row