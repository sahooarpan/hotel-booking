import Axios from 'axios';
import React, {useMemo,useState,useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { setRoom } from '../actions/Room';
import Steps from './Steps'
import { setAlert } from '../actions/alert'
const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };
  
  

  
  



  function MyDropzone(props) {
    const [files, setFiles] = useState([]);
    const [previewImage, setPreviewImage] = useState('');
    
    const {
      getRootProps,
      fileRejections,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject,
    } = useDropzone({accept: 'image/*',
    maxFiles:4,
    
    onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })) );
      }
});


    const style = useMemo(() => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }), [
      isDragActive,
      isDragReject,
      isDragAccept
    ]);

    const handleSubmit=(e)=>{
      e.preventDefault();
      
      console.log(props.room.roomDetails,previewImage)
      
    }


    
    useEffect(() =>{
      
      async function fetchData(){
        if(props.room.roomDetails===null){
          const res = await Axios.get('http://localhost:5000/');
          props.setRoom(res.data)
        }
        

      }
      fetchData()
      props.setAlert('Data fetched from CSV File :)','alert-success')
    }, [props]);
  
   useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
      }, [files]);
    
      const thumbs = files.map(file => {
        return(
          <div className="col-xs-12 col-md-4 col-lg-4 mb-4">
            <img
              src={file.preview}
              className="mr-3 img-fluid img-thumbnail img-files"
              
              alt=""
            />
        
         
        
        <input type="radio" name="previewImage" 
          value={file.preview}
          onChange={e=>handleChange(e)}
          checked={previewImage===file.preview}
          />
        </div>
      )});
     const handleChange=(e)=>{
        setPreviewImage(e.target.value);
    }
  
  

    return (
      <>  
      <Steps step2 step3 />
      <div className="conatiner">  
      <div className="routes mt-2 form-container">
       
        <div {...getRootProps({style})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          <em>(4 files are the maximum number of files you can drop here)</em>
        </div>

       {thumbs.length>0 && <div className="img-container container">
         <div className="row">
          
          {thumbs}
          
         </div>
           
        
        
        <>
       
          
          
        
        </>
      </div>} 
      {fileRejections.length>0 &&
        <h4 className="text-center mt-4 text-danger">Please upload max 4 files only</h4>
    
    }
    <div className="btn-container">
    <Link to='/step2' className="btn mt-4 btn-primary btn-lg float-left">Previous</Link>   
    <button disabled={previewImage===''} onClick={handleSubmit} type="submit" className="btn mt-4 btn-success btn-lg float-right">Submit</button>
    </div>
      </div>
      
    </div>
      </>
    );
  }
  
const mapStateToProps=(state)=>({
  room:state.room
})
export default connect(mapStateToProps,{setRoom,setAlert})(MyDropzone)