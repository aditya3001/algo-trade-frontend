import './DataTable.css'
const DataTable = (props)=>{

    const renderTableHeader = ()=>{
        const headers = Object.keys(props.data[0]);
        return headers.map((header, index) => <th className="tableHeaderStyle" key={index}>{header}</th>);
    }

    const renderTableData = ()=>{
        return props.data.map((item, index) => {
          return (
              <tr key={index}>
                {Object.keys(item).map((k,index)=>{return <td className='tableCellStyle' key={index}>{item[k]}</td>})}
         
              </tr>
          );
        });
      }

      return (
        <div>
          <h2>JSON Data Table</h2>
          <table className="">
            <thead>
              <tr>{renderTableHeader()}</tr>
            </thead>
            <tbody>
              {renderTableData()}
            </tbody>
          </table>
        </div>
      );
}

export default DataTable;
