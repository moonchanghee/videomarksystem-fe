import React, { useRef, useState, useEffect } from "react";
import videojs from "video.js";
import 'videojs-markers'
import Axios from 'axios';
const VideoDetailPresenter = ({Video}) => {

    const videoPlayerRef = useRef(null); // Instead of ID
    const text = useRef(null); // Instead of ID
    const [currentTime, setCurrentTime] = useState(null);
    const videoSrc = `../${Video.fileName}`;
    const [currentVal , setCurrentVal] = useState(0)
    const [memotime,  setMemotime] = useState()
    const [Values, setValues] = useState()
    const [markerss, setMarker] = useState([{}])

    const videoJSOptions = {
        autoplay: true,
        controls: true,
        // width: 500,
        // height: 500,
        userActions: { hotkeys: true },
        playbackRates: [0.5, 1, 1.5, 2],
        
      };
      let player

useEffect(async() => {
    return await Axios.get('/marker').then(e => {setMarker(e.data.markers)})
}, [])


       useEffect( () => {
console.log(markerss)
        if (videoPlayerRef) {
         // eslint-disable-next-line react-hooks/exhaustive-deps
         player = videojs(videoPlayerRef.current, videoJSOptions, () => {
            player.src(videoSrc);
            player.on("ended", () => {
              console.log("ended");
            });
    
            player.on("timeupdate", function(){
              setCurrentTime(player.currentTime());
            })
    
            player.on('pause', function () {
              //현재 비디오 정지 체크
              var isPaused = player.paused();
              if (isPaused) {
                //정지 되었다면 현재 멈춘만큼의 시간을 체크해서 저장.
                setCurrentVal(Number(player.cache_.currentTime))
              }
              return false;
            })
          });
          player.markers({
            markerStyle: {
               'width':'7px',
               'border-radius': '30%',
               'background-color': 'red'
            },
            
            markerTip:{
               display: true,
               text: function(marker) {
                  return "제목: "+ marker.text;
               },
               time: function(marker) {
                  return marker.time;
               }
            },
            breakOverlay:{
               display: false,
               displayTime: 3,
               style:{
                  'width':'100%',
                  'height': '20%',
                  'background-color': 'red',
                  'color': 'white',
                  'font-size': '17px'
               },
               text: function(marker) {
                  return "Break overlayddddddd: " + marker.overlayText;
               }
            },
            onMarkerClick: function(marker) {console.log("Ddddddddddddddddddd")},
            onMarkerReached: function(marker) {},
            markers: markerss

        });
        // player.markers.add([{
        //     time: 5,
        //     text: "I'm added dynamically",
        //     val:"Ddddddd"
        //  }]);
        }

      }, []);
      
const checkc = () => {

    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        // tslint:disable-next-line:no-bitwise
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        // tslint:disable-next-line:no-bitwise
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      });
      const body = {
      time: memotime,
      text: "marker",
        val : "안녕",
        key : uuid
    }

    // setMemotime(memotime => [...memotime, currentVal])
    Axios.post('/marker' , body ).then(e => console.log(e))
  }

  const InsertMemo = async () => {
    setMemotime(currentVal)
    // await setMemotime(memotime => [...memotime, currentVal])
    // setTestVal(1)


    // const newtime = {
    //   time: 2,
    //   text: "marker",
    //   key : uuid
    // }
    // console.log(newtime)
    // setMarker(markerss.concat(newtime))
    
    // console.log("메모클릭")
    // setMemoCheck(true)
  }


const ghkrdls =() => {
console.log()
}

    return (
        <div style={{ width: "100%" }}>
        <video
        style={{ width: "500px", height:"300px" }}
          ref={videoPlayerRef}
          src={`../${Video.fileName}`} 
        //   controls 
          className="video-js"
        />
       
        <span>재생시간: {currentTime}</span><br/>
        <span>멈춘시간: {currentVal}</span><br/>
        <span>메모입력: {memotime}</span><br/>

        {Math.floor(currentTime) === Math.floor(memotime) ? console.log("같다") : console.log("다름")}
        <button onClick ={InsertMemo}>메모</button>
        <button onClick ={checkc}>저장</button>
        <button onClick ={ghkrdls}>확인</button>
        {/* <GlobalStyle /> */}
      </div>
    );
};

export default VideoDetailPresenter;