import React, {useState} from 'react';
import VideoUploadPresenter from './VideoUploadPresenter'
import Axios from 'axios'

const VideoUploadContainer = () => {
    const [Titlecontent ,setTitlecontent] = useState("")
    const [ Description , setDescription] = useState("")
    const [FilePath, setFilePath] = useState('')
    const[FileName , setFileName] = useState('')

    const Title_onChange = (e) => {
        setTitlecontent(e.currentTarget.value);
    }
    
    
    const Description_onChange = (e) => {
        setDescription(e.currentTarget.value);
    }
    

    const onDrop = (files) => { //올린 파일의 정보가 담겨져옴
        let formData = new FormData();
        const config = {
            header: {'content-type' : 'multipart/form-data'}
        }
        formData.append("file" , files[0])
        
        console.log(files[0])
        
        Axios.post('/uploadVideo/ondrop' , formData , config )
        .then(res => {
            if(res.data.success){
                console.log(res.data)
                console.log("비디오 업로드 성공")

                setFilePath(res.data.url) //동영상주소
                setFileName(res.data.fileName)
            }else
            alert('비디오 업로드 실패')
        })
        
        }
        
        const onSubmit = (e) =>{
            e.preventDefault();
        
            
            const variables = {
                title:Titlecontent,
                description:Description ,
                filePath:FilePath,
                filename:FileName,
            }
        
            Axios.post('/uploadVideo',variables )
            .then(res => {
                if(res.data.success){
                    console.log("성공")
                    console.log(res.data)
                    // message.success("성공적으로 업로드를 했습니다")
                    // props.history.push('/')
                }else{
                    console.log("실패")
                }
            })
        }


    return (
        <VideoUploadPresenter Description ={Description} Titlecontent={Titlecontent} Description_onChange ={Description_onChange} onDrop ={onDrop} onSubmit ={onSubmit} Title_onChange={Title_onChange}>
        </VideoUploadPresenter>
    );
};

export default VideoUploadContainer;