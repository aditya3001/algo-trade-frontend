import './MinutewiseRowData.css'

const MinutewiseRowData = function(props){

    return(<div className="row-data-container">
        <span>{props.data.time}</span>
        <span>{props.data.callPnl}</span>
        <span>{props.data.putPnl}</span>
        <span>{props.data.hedgePnl}</span>
        <span>{props.data.total_pnl}</span>

    </div>)
}

export default MinutewiseRowData;