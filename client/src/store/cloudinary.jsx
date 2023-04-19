import axios from 'axios';
import React, {useState} from "react";
import {Container, FormGroup, Input } from 'reactstrap';


export function UploadFile() {

    const preset_key = "Perifericos";
    const cloud_name = "de2wihnob";
    const[image, setImage] = useState();

    function handleFile(e){
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", preset_key);
        axios.post('https://api.cloudinary.com/v1_1/de2wihnob/image/upload', formData)
        
        .then(res => setImage (res.data.secure_url) )
        console.log(res.data.secure_url)
        .catch( err => console.log(err));
    }
    ;
    return (<div>
        <Container style={{textAlign: "center"}}>
           
            <FormGroup>
    
              <Input
                  type="file"
                  name="image"
                  placeholder="Sube t imagen aqui"
                  onChange={handleFile}
              />
            </FormGroup>
        </Container> 
            
        </div> );

}
export default UploadFile;  