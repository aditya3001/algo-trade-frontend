import React, { useEffect } from "react";
import RealTimeMinuteDataViewer from "../realTimeMinuteDataViewer/RealTimeMinuteDataViewer";
const Home = function(props){
    useEffect(()=>{
        props.setCurrentSection(0);
    },[props])
    return (<div style={{color:'white'}}>
        <RealTimeMinuteDataViewer />

    </div>)
}

export default Home;