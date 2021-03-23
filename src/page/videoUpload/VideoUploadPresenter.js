import React from 'react';
import Dropzone from 'react-dropzone'
import {Typography , Button, Form , message , Input } from 'antd'
import {PlusOutlined} from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';

const VideoUploadPresenter = ({Description, Titlecontent,onDrop, onSubmit,Description_onChange,Title_onChange}) => {
    
    const {Title} = Typography;
    return (
        <div style={{maxWidth: '50%' , margin:"2rem auto"}}>
        <div style = {{textAlign : 'center' , marginBottom : '2rem'}}>
        <Title level = {2}>Upload Video</Title>
        </div>
        <Form onSubmit= {onSubmit}>
        <div style= {{display:'flex' ,float : 'right' ,justifyContent:'space-between',marginRight:"130px" }}>
        </div>
        <Dropzone
        onDrop ={onDrop}
        multiple = {false} //한번에 파일 몇개를 업로드할것인지
        maxSize = {10000000}
        >
        {({getRootProps, getInputProps}) => (
                <section style ={{ width : "300px"}}>
                <div style ={{width:'300px' , height: '240px' ,border :'1px solid lightgray',
                alignItems:'center' , justifyContent:'center'}} {...getRootProps()}>
                    <input {...getInputProps()}/>
                    <PlusOutlined style ={{fontSize:"50px" , marginTop: "30%" , marginLeft:"40%"} }/>
                </div>
                </section>
        )}
        </Dropzone>
        <label>Title</label>
        <Input
        onChange ={Title_onChange}
        value ={Titlecontent}
        />
        
        <br/>
        <br/>
        
        <label>Description</label>
        <TextArea
        onChange ={Description_onChange}
        value ={Description}
        />
        <br/>
        <br/>
        <Button type = "primary" onClick = {onSubmit}>
        추가
        </Button>
        </Form>
        </div> 
    );
};

export default VideoUploadPresenter;