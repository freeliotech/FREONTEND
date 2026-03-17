import {useEffect,useState} from "react";
import axios from "axios";

export default function AdminDashboard(){

const [certs,setCerts] = useState([]);

useEffect(()=>{

axios
.get("http://localhost:5000/api/certificate/all")
.then(res=>setCerts(res.data));

},[]);

return(

<div style={{padding:"40px"}}>

<h1>All Certificates</h1>

<table border="1" cellPadding="10">

<thead>

<tr>
<th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Course</th>
</tr>

</thead>

<tbody>

{certs.map((c)=>(
<tr key={c._id}>
<td>{c.refNo}</td>
<td>{c.name}</td>
<td>{c.email}</td>
<td>{c.course}</td>
</tr>
))}

</tbody>

</table>

</div>

);

}