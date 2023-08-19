import { useEffect, useState } from "react"
import './ParametersManipulator.css'
import { baseUri } from "../../App";

const ParametersManipulator = function(){
    const [input, setInput] = useState({parameterName:"",parameterValue:""})
    // const [parametersCreated, setParametersCreated] = useState(false);

    useEffect(()=>{
        console.log('SHIT')
        getAllParameters();
    },[])

    async function submitForm(e){
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,"Access-Control-Allow-Origin": "*"},
            body: JSON.stringify(input)
        };
        const response = await fetch(`${baseUri}/parameters/createParameter`, requestOptions);
        // const data = await response.json();
        if(response.status === 200){
            // setParametersCreated(true);
            getAllParameters();
            setInput({parameterName:"",parameterValue:""})
            console.log("Parameter Created")
        }else{
            // setParametersCreated(false);
            console.log("Error Occured")
        }

    }
    const [parameters,setParameters] = useState([]);
    async function getAllParameters(){
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' ,"Access-Control-Allow-Origin": "*"},
        };
        const response = await fetch(`${baseUri}/parameters`, requestOptions);
        console.log("Response : ",response.status)
        if(response.status === 200){
            const data = await response.json();
            setParameters(data);
        }else{
            console.log("Error Occured")
        }

    }
    async function deleteParameter(event, param){
        event.preventDefault();
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' ,"Access-Control-Allow-Origin": "*"},
        };
        const response = await fetch(`http://localhost:8080/parameters/${param.parameterId}`, requestOptions);
        // console.log("Response : ",response)
        if(response.ok){
            getAllParameters();
        }else{
            console.log("Error Occured")
        }
       
    }
    return(<div className="parameter-container">
        <form onSubmit={submitForm} className="p-4 flex flex-col gap-3">
            <div className="flex justify-between gap-4">
                <label>Parameter Name</label>
                <input type="text" placeholder="Parameter Name" className="text-black" value={input.parameterName} onChange={e=>{setInput({...input,parameterName:e.target.value})}} required/>
            </div>
            <div className="flex justify-between gap-4">
                <label>Parameter Value</label>
                <input type="text" placeholder="Parameter Value" className="text-black" value={input.parameterValue} onChange={e=>{setInput({...input,parameterValue:e.target.value})}} required/>
            </div>    
            <button type="submit" className="bg-gray-700 btn">SUBMIT</button>
        </form>

        <div className="parameter-table-container">
            <table>
                <thead>
                    <tr>
                        <th className="table-header-cell">Parameter Name</th>
                        <th className="table-header-cell">Parameter Value</th>
                        <th className="table-header-cell">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {parameters.map((p) => {return (<tr key={p.parameterId}>
                            <th>{p.parameterName}</th>
                            <th>{p.parameterValue}</th>
                            <th><button className="bg-gray-800 p-1 btn" onClick={e=>{deleteParameter(e,p)}}>Delete</button></th>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>

    </div>)
}

export default ParametersManipulator;