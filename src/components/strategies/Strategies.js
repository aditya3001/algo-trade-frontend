import { useEffect, useState } from "react";
import Dropdown from 'react-dropdown';
import DataTable from "../dataTable/DataTable";
import './Strategies.css'
import { PYTHON_SERVICE_BASE_URL } from "../../constants/Constants";
const Strategies = function(){

    const [dynamicInputs,setDynamicInputs] = useState({});
    const [currentStrategy, setCurrentStrategy] = useState('');
    const [strategies, setStrategies] = useState({});
    const [inputList,setInputList] = useState([]);
    const [dynamicOutputs, setDynamicOutputs] = useState({});
    const [imgOutput, setImgOutput] = useState([]);
    const [dfOutput,setDfOutput] = useState([]);
    const [errorMsg, setErrorMessage] = useState('');

    const handleInputValueChange = (event,input)=>{
        setDynamicInputs({...dynamicInputs, [input]:event.target.value})
        
    }

    const fetchStrategies = async ()=>{
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' ,"Access-Control-Allow-Origin": "*"}
        };
        const uri = `${PYTHON_SERVICE_BASE_URL}/strategies`;
        console.log(uri)
        const response = await fetch(uri,requestOptions)
        if(response.ok){
            const data = await response.json();
            setStrategies(data)
         
        }
    }
    const handleStrategyChange = (e)=>{
        setDfOutput([])
        setImgOutput([])
        setCurrentStrategy(e.target.value)
        setErrorMessage('')
        if(e.target.value === ''){
            setInputList([])
            setDynamicInputs({});
            return;
        }
        setInputList(strategies[e.target.value])
        setDynamicInputs(strategies[e.target.value].reduce((acc,key)=>{
            acc[key] = ''
            return acc;
        },{}))
    }
    const handleInputSubmit = (e)=>{
        e.preventDefault();
        fetchStrategyResult();
    }

    const fetchStrategyResult = async ()=>{
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' ,"Access-Control-Allow-Origin": "*"}
        };
        let queryString = ''
        for (const inp in dynamicInputs){
            queryString += `${inp}=${dynamicInputs[inp]}&`
        }
        const url = `${PYTHON_SERVICE_BASE_URL}/my-first-api?${queryString.substring(0, queryString.length-1)}`
        const response = await fetch(url,requestOptions)
        if(response.ok){
            const data = await response.json();
            
            if(data.im && data.im.body){
                const obj = JSON.parse(data.im.body);
                obj&&setImgOutput(obj.image.map(im=>{return `data:image/png;base64,${im}`}))
            }else{
                setErrorMessage('No Data Available')
            }
            if(data.df && data.df.length){
                setDfOutput(data.df);
            }else{
                setErrorMessage('No Data Available')
            }
        }
        // const dataJson = [[{"mean":29.61635153898514,"amax":31.93343239437391,"amin":26.301055199413415,"count_nonzero":7},{"mean":43.91536895792498,"amax":55.83771284389465,"amin":24.634613356981035,"count_nonzero":11},{"mean":23.590126003022775,"amax":48.88156356574957,"amin":0.0474208689128117,"count_nonzero":54},{"mean":11.10916044612503,"amax":51.38480156533208,"amin":-45.899257504403586,"count_nonzero":27},{"mean":6.142702881203041,"amax":31.554852636885062,"amin":-18.196216578978703,"count_nonzero":29},{"mean":15.322811089878105,"amax":28.556621771748805,"amin":-5.209827059920544,"count_nonzero":25},{"mean":-9.25592253553299,"amax":20.237796053853085,"amin":-31.505896724527435,"count_nonzero":33},{"mean":-7.870469504364739,"amax":23.06242507324806,"amin":-35.57143908590581,"count_nonzero":26},{"mean":-13.142543403655258,"amax":11.751276811768426,"amin":-33.376029556119846,"count_nonzero":29},{"mean":-31.057906122747397,"amax":7.788256726246701,"amin":-123.04311684880656,"count_nonzero":18},{"mean":-38.75226604022123,"amax":7.611376926916712,"amin":-136.33071542602926,"count_nonzero":14},{"mean":-62.863067408557704,"amax":-3.4989596466273554,"amin":-133.8049608774514,"count_nonzero":18},{"mean":-45.8477315540855,"amax":-45.8477315540855,"amin":-45.8477315540855,"count_nonzero":1},{"mean":-48.67816253795807,"amax":-39.22693346777166,"amin":-54.2843958980984,"count_nonzero":5},{"mean":-60.02578925036369,"amax":-60.02578925036369,"amin":-60.02578925036369,"count_nonzero":1},{"mean":-43.01814931008213,"amax":-43.01814931008213,"amin":-43.01814931008213,"count_nonzero":1},{"mean":-41.60547077860437,"amax":-41.60547077860437,"amin":-41.60547077860437,"count_nonzero":1},{"mean":-67.99082652144372,"amax":-67.99082652144372,"amin":-67.99082652144372,"count_nonzero":1}],[{"average_pnl":-2.660442263795735}]]
        // setDfOutput(dataJson);
    }
    useEffect(()=>{
        fetchStrategies();
    },[])
    

    return(<div className="text-white flex flex-col">
        <div className="flex flex-col gap-5 p-5">
        <select className="text-white bg-gray-400 custom-dropdown" value={currentStrategy} onChange={handleStrategyChange} placeholder="Choose Strategy">
            <option value="">Select Stratgey</option>
            {Object.keys(strategies).map(stg=>{return <option value={stg}>{stg}</option>})}
        </select>
        {inputList.map(input=>{
            return (<div className="flex flex-col"><label>{input}</label><input type="text" className="text-black" id={input} placeholder={`Enter ${input}`} value={dynamicInputs[input]} onChange={(event)=>handleInputValueChange(event,input)}/></div>)
        })}
        <button disabled={!currentStrategy || currentStrategy === ''} className="rounded bg-green-700 w-20" onClick={handleInputSubmit}>SUBMIT</button>
        </div>
        <h2 className="justify-center">RESULTS</h2>
        <div className="results bg-gray-700">
                {imgOutput.length ? <div className="img-results m-2">
                    {imgOutput.map(imgSrc=> {return(<img src={imgSrc} alt="NA"/>)})}
                </div>:<h2 className="m-2">{errorMsg}</h2>}
                
                {dfOutput.length ?<div className="df-results m-2">{dfOutput.map(dfOp=>{return <DataTable data = {dfOp}/>})}</div>:<h2 className="m-2">{errorMsg}</h2>}
        </div>
    </div>)
}

export default Strategies;