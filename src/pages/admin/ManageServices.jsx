import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://backend-production-7a212.up.railway.app/api/services";

export default function AdminManageServices() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    title: "", desc: "", img: "", tag: ""
  });
  const [editId, setEditId] = useState(null);

  const load = async () => {
    const res = await axios.get(API);
    setList(res.data);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    editId
      ? await axios.put(`${API}/${editId}`, form)
      : await axios.post(API, form);

    setForm({ title: "", desc: "", img: "", tag: "" });
    setEditId(null);
    load();
  };

  const edit = (s) => {
    setEditId(s._id);
    setForm(s);
  };

  const del = async (id) => {
    if (confirm("Delete service?")) {
      await axios.delete(`${API}/${id}`);
      load();
    }
  };

  return (
    <div className="p-8 bg-black min-h-screen text-white mt-19">

      <h1 className="text-3xl font-bold mb-6 text-cyan-400">
        Manage Services
      </h1>

      {/* FORM */}
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4 mb-10">
        <input placeholder="Title" value={form.title}
          onChange={e=>setForm({...form,title:e.target.value})} />
        <input placeholder="Tag" value={form.tag}
          onChange={e=>setForm({...form,tag:e.target.value})} />
        <input placeholder="Image URL" value={form.img}
          onChange={e=>setForm({...form,img:e.target.value})} />
        <textarea placeholder="Description"
          value={form.desc}
          onChange={e=>setForm({...form,desc:e.target.value})} />

        <button className="bg-cyan-500 py-2 rounded col-span-full">
          {editId ? "Update Service" : "Add Service"}
        </button>
      </form>

      {/* LIST */}
      <div className="grid md:grid-cols-2 gap-6">
        {list.map(s => (
          <div key={s._id}
            className="bg-gray-900 p-5 rounded-xl border border-cyan-400/20">
            <h3 className="font-bold text-cyan-300">{s.title}</h3>
            <p className="text-sm text-gray-400">{s.tag}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={()=>edit(s)}
                className="px-4 py-1 bg-blue-600 rounded">
                Edit
              </button>
              <button
                onClick={()=>del(s._id)}
                className="px-4 py-1 bg-red-600 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
