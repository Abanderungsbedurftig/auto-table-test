import {connect} from 'react-redux'
import Table from './Table'
import {getAutoFromApi, getDealerFromApiById} from '../lib/http'
import {addAuto, changeError, toggleEnd} from '../data/autoActions'
import {perPage} from '../config'

let pageNumber = 0

const logError = error => console.error(error)

const getDealerName = (dealers, dealerId) => {
    return dealers.filter(dealer => dealer.id === dealerId).map(dealer => dealer.name)[0]
}

const mapStateToPropsTable = state => 
    ({
        auto: state.auto,
        error: state.error,
        isEnd: state.isEnd
    })

const mapDispatchToPropsTable = dispatch =>
    ({
        async onPagination() {
            try {
                const data = await getAutoFromApi({per_page: perPage, page: ++pageNumber})
                if (data.length) {
                    const dealerPromises = data.map(auto => getDealerFromApiById(auto.dealer.id))
                    const dealers = await Promise.all(dealerPromises)
                    const auto = data.map(auto => ({
                        vin: auto.vin,
                        brand: auto.brand,
                        dealer_id: auto.dealer.id,
                        dealer_name: getDealerName(dealers, auto.dealer.id)
                    }))
                    dispatch(addAuto(auto))
                } else {
                    dispatch(toggleEnd(true))
                }
            } catch (err) {
                logError(err)
                dispatch(changeError(err.message))
            }
            
        },

        onCloseError() {
            dispatch(changeError(null))
        }
    })

export const TablePage = connect(mapStateToPropsTable, mapDispatchToPropsTable)(Table)