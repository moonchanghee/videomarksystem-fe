import React, { useRef, useState, useEffect, useMemo } from "react";
import videojs from "video.js";
import 'videojs-markers'
import Axios from 'axios';
import $ from "jquery";
import {Input} from "antd"
const VideoDetailPresenter = ({Video, markers}) => {

    const videoPlayerRef = useRef(null); // Instead of ID
    const text = useRef(null); // Instead of ID
    const [currentTime, setCurrentTime] = useState(null);
    const videoSrc = `../${Video.fileName}`;
    const [currentVal , setCurrentVal] = useState(0)
    const [memotime,  setMemotime] = useState()
    const [Values, setValues] = useState()
    const [newMarkers, setNewMarkers] = useState([{}])
    const [player , setPlayer2]= useState()

    //////////////
const [inputtest, setInputest] = useState()


    ////
    const videoJSOptions = {
        autoplay: true,
        controls: true,
        // width: 500,
        // height: 500,
        userActions: { hotkeys: true },
        playbackRates: [0.5, 1, 1.5, 2],
      };




    useEffect(async() => {
      let id
      async function sibal(){
  id = await Axios.get('/marker').then(async e => {return e.data.markers})
}
sibal()

        if (videoPlayerRef.current && markers) {
         let player = videojs(videoPlayerRef.current, videoJSOptions, () => {
            player.src(videoSrc);
            player.on("ended", () => {
              console.log("ended");
            });
            player.on("play", function(){
             console.log(markers)
             console.log(newMarkers)
            //  sibal()
            //  id = Axios.get('/marker').then(async e => {return e}).then(e => {return e.data.markers})
            // id = await Axios.get('/marker').then(async e => {return e.data.markers})
            })

            player.on("timeupdate", function(){
              setCurrentTime(player.currentTime());
            })

            player.on('pause', function () {
              //현재 비디오 정지 체크
              console.log(id[0].time)
              var isPaused = player.paused();
              if (isPaused) {
                //정지 되었다면 현재 멈춘만큼의 시간을 체크해서 저장.
                setCurrentVal(Number(player.cache_.currentTime))
              }
              return false;
            })
            // player.markers.
          });
          setPlayer2(player)
        player.markers({
          markerStyle: {
             'width':'7px',
             'border-radius': '30%',
             'background-color': 'red'
          },
          
          markerTip:{
             display: true,
             text: function(markers) {
                return "제목: "+ markers.text;
             },
             time: function(markers) {
                return markers.time;
             }
          },
          // // breakOverlay:{
          // //    display: false,
          // //    displayTime: 3,
          // //    style:{
          // //       'width':'100%',
          // //       'height': '20%',
          // //       'background-color': 'red',
          // //       'color': 'white',
          // //       'font-size': '17px'
          // //    },
          //    text: function(markers) {
          //       return "Break overlayddddddd: " + markers.overlayText;
          //    }
          // },
          onMarkerClick: function(marker) {console.log("Ddddddddddddddddddd")},
          onMarkerReached: function(marker) {setValues(marker.val)},
          markers: markers
    })
let dd = inputtest
console.log(id)
    $(".target").click(function () {
      console.log(id)      //마우스 누를떼
      id.map(e => {
        return  player.markers.add([{
          time:e.time,text:"Dddddddd",val : e.val
        }])
      })
      // console.log($("#inputs").val())
      // player.markers.add([{
      //   time:player.cache_.currentTime,text:"Dddddddd",val : $("#inputs").val()
      // }])
    });

    // player.markers.add([
    //   id
    // ])


    $(".insert").click(function () {
      console.log(memotime)      //마우스 누를떼
      console.log(inputtest)
      player.markers.add([{
        time:player.cache_.currentTime,text:"Dddddddd",val : $("#inputs").val()
      }])
    });


    }}, []);


      // console.log(player)


      // useEffect(() => {
      //   $(".target").click(function () {      //마우스 누를떼
      //     // player.markers.add([{
      //     //   time:5,text:"Dddddddd",val : "Ddddddddddd"
      //     // }])
      //   // console.log(player["markers"])
      //   });
      // }, [markers])

      
const checkc = () => {

    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        // tslint:disable-next-line:no-bitwise
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      });
      const body = {
      time: memotime,
      text: "marker",
        val : "안녕",
        key : uuid
    }

    // setMemotime(memotime => [...memotime, currentVal])
    // Axios.post('/marker' , body ).then(e => console.log(e))
  }

  const InsertMemo = () => {
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

  const test =(e) => {
    setInputest(e.currentTarget.value)
    console.log(inputtest)
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
        <button onClick ={InsertMemo}>메모</button>
        <button onClick ={checkc} className = "insert">저장</button>
        <button className = "target">확인</button>
        {/* <GlobalStyle /> */}
        <p>{Values}</p>
        <Input onChange = {test} value ={inputtest} id = "inputs" ></Input>
      </div>
    );
};

export default VideoDetailPresenter;