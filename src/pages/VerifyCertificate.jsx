import React,{useEffect,useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

export default function VerifyCertificate(){

const {id}=useParams();

const [cert,setCert]=useState(null);

useEffect(()=>{

axios.get(`https://backend-production-7a212.up.railway.app/api/verify/${id}`)
.then(res=>setCert(res.data));

},[]);

if(!cert) return <h2>Loading...</h2>;

if(!cert.valid) return <h2>Certificate Invalid</h2>;

return(

<div className="p-10 text-center">

<h1 className="text-3xl font-bold text-green-600">
Certificate Verified
</h1>

<p>Name : {cert.data.name}</p>
<p>Email : {cert.data.email}</p>
<p>Domain : {cert.data.domain}</p>
<p>Duration : {cert.data.duration}</p>

</div>

);

}