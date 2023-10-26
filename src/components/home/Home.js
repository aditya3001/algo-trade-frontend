import React, { useEffect, useState } from "react";
import RealTimeMinuteDataViewer from "../realTimeMinuteDataViewer/RealTimeMinuteDataViewer";
const Home = function(props){
    const [currentSection, setCurrentSection] = useState(localStorage.getItem('CURRENT_HOME_STATE')? localStorage.getItem('CURRENT_HOME_STATE') : 'banknifty')
    useEffect(()=>{
        localStorage.setItem('CURRENT_HOME_STATE', currentSection)
    },[props])

    const handleActiveSection = (e, activeSection)=>{
        e.preventDefault();
        setCurrentSection(e.target.id);
        localStorage.setItem('CURRENT_HOME_STATE', e.target.id)
    }
    return (<div className='home-container' style={{color:'white'}}>
        
        <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                <li class="mr-2" role="presentation">
                    <button class={`inline-block p-4 rounded-t-lg ${currentSection === 'banknifty' ? 'border-b-2':'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`} id="banknifty" data-tabs-target="#banknifty" type="button" role="tab" aria-controls="banknifty" aria-selected="false" onClick={e => handleActiveSection(e,0)}>BANKNIFTY</button>
                </li>
                <li class="mr-2" role="presentation">
                    <button class={`inline-block p-4 rounded-t-lg ${currentSection === 'nifty' ? 'border-b-2':'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`} id="nifty" data-tabs-target="#nifty" type="button" role="tab" aria-controls="nifty" aria-selected="false" onClick={e => handleActiveSection(e,1)}>NIFTY</button>
                </li>
                <li class="mr-2" role="presentation">
                    <button class={`inline-block p-4 rounded-t-lg ${currentSection === 'finnifty' ? 'border-b-2':'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`} id="finnifty" data-tabs-target="#finnifty" type="button" role="tab" aria-controls="finnifty" aria-selected="false" onClick={e => handleActiveSection(e,2)}>FINNIFTY</button>
                </li>
            </ul>
        </div>

        <div id="myTabContent">
            {currentSection === 'banknifty'?<RealTimeMinuteDataViewer instrument='banknifty'/>:null}
            {currentSection === 'nifty'?<RealTimeMinuteDataViewer instrument='nifty'/>:null}
            {currentSection === 'finnifty'?<RealTimeMinuteDataViewer instrument='finnifty'/>:null}
        </div>


    </div>)
}

export default Home;