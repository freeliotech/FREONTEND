import React, {useRef,useState,useEffect} from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {QRCodeCanvas} from "qrcode.react";
import axios from "axios";

export default function CertificateGenerator(){

const certRef = useRef();

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [domain,setDomain]=useState("");
const [duration,setDuration]=useState("");
const [certId,setCertId]=useState("");

useEffect(()=>{

const id="FLT-"+Math.floor(100000+Math.random()*900000);
setCertId(id);

},[]);


const generateCertificate = async()=>{

await axios.post("http://localhost:5000/api/create",{

name,
email,
domain,
duration,
certificateId:certId

});

};


const downloadPDF = async()=>{

const canvas = await html2canvas(certRef.current);

const imgData = canvas.toDataURL("image/png");

const pdf = new jsPDF("landscape","mm","a4");

pdf.addImage(imgData,"PNG",0,0,297,210);

pdf.save("certificate.pdf");

};


return(

<div className="p-10 bg-gray-100 min-h-screen">

<div className="max-w-md mx-auto bg-white p-6 shadow rounded">

<h2 className="text-xl font-bold mb-4">
Generate Certificate
</h2>

<input
className="border p-2 w-full mb-2"
placeholder="Student Name"
onChange={(e)=>setName(e.target.value)}
/>

<input
className="border p-2 w-full mb-2"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
className="border p-2 w-full mb-2"
placeholder="Domain"
onChange={(e)=>setDomain(e.target.value)}
/>

<input
className="border p-2 w-full mb-4"
placeholder="Duration"
onChange={(e)=>setDuration(e.target.value)}
/>

<button
onClick={generateCertificate}
className="bg-blue-600 text-white px-4 py-2 rounded"
>
Save Certificate
</button>

<button
onClick={downloadPDF}
className="bg-green-600 text-white px-4 py-2 rounded ml-3"
>
Download PDF
</button>

</div>



{/* CERTIFICATE */}

<div className="flex justify-center mt-10">

<div
ref={certRef}
className="relative w-[1100px] h-[650px] bg-white p-10 shadow-xl"
style={{border:"10px solid #1e3a8a"}}
>

<div className="absolute inset-4 border-4 border-blue-400"></div>
<div className="absolute inset-8 border-2 border-blue-600"></div>

<div className="text-center">

<h1 className="text-4xl font-bold">
FREELIOTECH PVT LTD
</h1>

<h2 className="text-xl mt-2">
INTERNSHIP CERTIFICATE
</h2>

<p className="mt-8">
This certificate is proudly presented to
</p>

<h1 className="text-4xl text-blue-700 mt-2">
{name || "Student Name"}
</h1>

<p className="mt-2">
Email : {email || "student@email.com"}
</p>

<p className="mt-4">
has successfully completed internship in
</p>

<h2 className="text-2xl font-semibold">
{domain || "Artificial Intelligence"}
</h2>

<p>
Duration : {duration || "2 Months"}
</p>

<p>
Certificate ID : {certId}
</p>

<div className="flex justify-center mt-6">

<QRCodeCanvas
value={`http://localhost:5173/verify/${certId}`}
size={90}
/>

</div>

<p className="mt-2 text-sm">
Verify : /verify/{certId}
</p>

</div>


<div className="flex justify-between mt-16 px-20">

<div className="text-center">
<div className="border-t w-40"></div>
<p>Director</p>
</div>

<div className="text-center">
<div className="border-t w-40"></div>
<p>HOD</p>
</div>

</div>

</div>

</div>

</div>

);

}