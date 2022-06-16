import React, {useRef, useState, useEffect} from "react";
import './ImageUpload.css'
import Button from '@mui/material/Button';

const ImageUpload = (props) => {
    const [file, setFile] = useState();
    const [preview, setPreview] = useState();
    const [isValid, setIsValid] = useState(false);
    const filePickerRef = useRef();

    useEffect(()=>{
        if(!file){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreview(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file])

    const pickedHandler = (e) => {
        let pickedFile, fileIsValid=false;
        if(e.target.files && e.target.files.length === 1){
            pickedFile = e.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        }else{
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    };
    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    return(
        <div className="form-control">
            <input type="file" id={props.id} style={{display: "none"}} accept=".jpg,.png,.jpeg" ref={filePickerRef} onChange={pickedHandler} />
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                    {preview && <img src={preview} alt="Preview image" />}
                    {!preview && <p>Please pick an image</p>}
                </div>
                <Button type="button" onClick={pickImageHandler} >Pick Image</Button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    );
};

export default ImageUpload;