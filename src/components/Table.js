import React, {Component} from 'react'
import Row from './Row'
import Loader from './Loader'
import ErrorMessage from './Error'
import {fromEvent} from 'rxjs';
import {throttleTime, map, filter, share} from 'rxjs/operators'
import '../style/Table.css'

class Table extends Component {

    constructor(props) {
        super(props)
        this.state = {isLoading: false};
        this.closeError = this.closeError.bind(this)
        this.paginationAuto = this.paginationAuto.bind(this)
    }

    componentDidMount() {
        this.paginationAuto()
        this.scroll$ = fromEvent(window, 'scroll').pipe(
            throttleTime(10),
            map(() => window.scrollY),
            filter(scroll => (document.body.scrollHeight - scroll - window.innerHeight <= 0)),
            share(),
          ).subscribe(() => {
            this.paginationAuto()
          })
    }

    componentWillUnmount() {
        this.scroll$.unsubscribe()
    }

    componentDidUpdate(prevProps) {
        if ((this.props.error && !prevProps.error) || prevProps.auto.length !== this.props.auto.length) {
            this.setState({isLoading: false})
        }
    }

    paginationAuto() {
        this.props.onPagination()
        this.setState({isLoading: true})
    }

    closeError() {
        this.props.onCloseError()
    }

    render() {
        return (
            <div className="table">
                <table>
                    <tbody>
                        <tr className="table-header">
                            <th>VIN</th>
                            <th>Brand</th>
                            <th>Dealer ID</th>
                            <th>Dealer name</th>
                        </tr>
                        {this.props.auto.map((auto, i) => <Row key={i} auto={auto}/>)}              
                    </tbody>
                </table>
                {this.state.isLoading && !this.props.isEnd ? <Loader/> : null}
                {this.props.error ? <ErrorMessage message={this.props.error} onClose={this.closeError}/> : null}
            </div>
          )
    }
}

export default Table