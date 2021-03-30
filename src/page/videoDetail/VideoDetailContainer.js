import React,{useEffect , useState,useRef } from 'react'
import VideoDetailPresenter from './VideoDetailPresenter'
import Axios from 'axios';
import 'videojs-markers'
const VideoDetailContainer = () => {
    // {"_id":{"$oid":"60596d88b86a9b76dc1d266c"}
    const [video,setVideo] = useState("")
    const [markers , setmarkers] = useState([{time : 12, text: "gdgdg" , val : "hi"}])
    useEffect(() => {
        Axios.post('/uploadVideo/getVideoDetail' , {videoId: "60596d88b86a9b76dc1d266c"})
        .then(res => {
            if(res.data.success){
                console.log("비디오 가져오기 성공")
                console.log(res.data.video)
                setVideo(res.data.video)
                
            }else{
                console.log("비디오 가져오기 실패")
            }
        })
        // Axios.get('/marker').then(e => {setMarkers( marker => [...marker, e.data.markers])})
        Axios.get('/marker').then(e => {setmarkers(markers.concat(e.data.markers))})
        // Axios.get('/marker').then(e => {console.log(e.data.markers)})
        // Axios.get('/marker').then(e => {console.log(text : e.data.markers)})
    }, [])
    
    return (
        <VideoDetailPresenter Video={video} 
        markers = { markers}
        >
        </VideoDetailPresenter>
    );
};

export default VideoDetailContainer;