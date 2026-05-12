import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ApiContext } from "../../config/Api";

const API = `${ApiContext}/krishi`;

const box = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const defaultAddress = { village: "", district: "", state: "", pincode: "" };

export default function KrishiRent() {
  const [theme, setTheme] = useState("dark");
  const [token, setToken] = useState(localStorage.getItem("krishi_token") || "");
  const [user, setUser] = useState(null);
  const [machines, setMachines] = useState([]);
  const [products, setProducts] = useState([]);
  const [training, setTraining] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "", phone: "" });

  const config = useMemo(
    () => ({ headers: { Authorization: `Bearer ${token}` } }),
    [token]
  );

  const syncData = async () => {
    const [m, p, t] = await Promise.all([
      axios.get(`${API}/machines`),
      axios.get(`${API}/products`, { params: { category: category || undefined, search: query || undefined } }),
      axios.get(`${API}/training`, { params: { search: query || undefined } }),
    ]);

    setMachines(m.data);
    setProducts(p.data);
    setTraining(t.data);
  };

  useEffect(() => {
    syncData().catch(() => {});
  }, [category]);

  useEffect(() => {
    if (!token) return;
    Promise.all([
      axios.get(`${API}/users/me`, config),
      axios.get(`${API}/rentals/my`, config),
      axios.get(`${API}/orders/my`, config),
    ])
      .then(([u, r, o]) => {
        setUser(u.data);
        setRentals(r.data);
        setOrders(o.data);
        if (u.data.role === "admin") {
          axios.get(`${API}/admin/analytics`, config).then((a) => setAnalytics(a.data));
        }
      })
      .catch(() => {
        setToken("");
        localStorage.removeItem("krishi_token");
      });
  }, [token]);

  const doSeed = async () => {
    await axios.post(`${API}/seed`);
    await syncData();
  };

  const onAuth = async (mode) => {
    const url = mode === "login" ? `${API}/auth/login` : `${API}/auth/register`;
    const body = mode === "login"
      ? { email: authForm.email, password: authForm.password }
      : { ...authForm, address: defaultAddress };
    const res = await axios.post(url, body);
    setToken(res.data.token);
    localStorage.setItem("krishi_token", res.data.token);
    setUser(res.data.user);
  };

  const addCart = (product) => {
    setCart((prev) => {
      const found = prev.find((x) => x.productId === product._id);
      if (found) {
        return prev.map((x) => (x.productId === product._id ? { ...x, quantity: x.quantity + 1 } : x));
      }
      return [...prev, { productId: product._id, name: product.name, price: product.price, quantity: 1 }];
    });
  };

  const bookMachine = async (machine) => {
    if (!token) return alert("Login required");
    await axios.post(
      `${API}/rentals`,
      {
        machineId: machine._id,
        startDate: new Date(),
        endDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
        hours: 2,
      },
      config
    );
    const r = await axios.get(`${API}/rentals/my`, config);
    setRentals(r.data);
  };

  const checkout = async () => {
    if (!token) return alert("Login required");
    if (!cart.length) return;

    await axios.post(
      `${API}/orders`,
      {
        items: cart,
        address: user?.address || { village: "Village", district: "District", state: "Bihar", pincode: "800001" },
        paymentMethod: "cod",
      },
      config
    );

    setCart([]);
    const o = await axios.get(`${API}/orders/my`, config);
    setOrders(o.data);
  };

  const markProgress = async (id) => {
    if (!token) return alert("Login required");
    await axios.patch(`${API}/training/${id}/progress`, { progress: 100 }, config);
    alert("Training marked as completed");
  };

  const light = theme === "light";

  return (
    <div className={`${light ? "bg-slate-100 text-slate-900" : "bg-slate-950 text-slate-100"} min-h-screen px-4 py-8 sm:px-8`}>
      <div className="mx-auto max-w-7xl">
        <motion.div initial="hidden" animate="show" variants={box} className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-black sm:text-4xl">KrishiRent</h1>
            <p className={`${light ? "text-slate-600" : "text-slate-300"}`}>Rent machines, buy farm essentials and learn smarter farming.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={doSeed} className="rounded-lg bg-emerald-500 px-4 py-2 text-white">Seed Demo Data</button>
            <button onClick={() => setTheme(light ? "dark" : "light")} className="rounded-lg border border-slate-400 px-4 py-2">
              {light ? "Dark" : "Light"} Mode
            </button>
          </div>
        </motion.div>

        {!token && (
          <motion.div variants={box} initial="hidden" animate="show" className={`${light ? "bg-white" : "bg-slate-900"} mb-6 grid gap-3 rounded-2xl p-4 sm:grid-cols-2`}>
            <input placeholder="Name" className="rounded border p-2 text-slate-900" onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })} />
            <input placeholder="Phone" className="rounded border p-2 text-slate-900" onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })} />
            <input placeholder="Email" className="rounded border p-2 text-slate-900" onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} />
            <input placeholder="Password" type="password" className="rounded border p-2 text-slate-900" onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} />
            <div className="flex gap-2 sm:col-span-2">
              <button onClick={() => onAuth("register")} className="rounded bg-blue-600 px-4 py-2 text-white">Register</button>
              <button onClick={() => onAuth("login")} className="rounded bg-indigo-600 px-4 py-2 text-white">Login</button>
            </div>
          </motion.div>
        )}

        <motion.div variants={box} initial="hidden" animate="show" className="mb-6 grid gap-3 sm:grid-cols-3">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products/training" className="rounded-lg border p-2 text-slate-900" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg border p-2 text-slate-900">
            <option value="">All Categories</option>
            <option value="seeds">Seeds</option>
            <option value="fertilizers">Fertilizers</option>
            <option value="pesticides">Pesticides</option>
          </select>
          <button onClick={() => syncData()} className="rounded-lg bg-cyan-600 px-4 py-2 text-white">Apply</button>
        </motion.div>

        <section className="mb-8">
          <h2 className="mb-3 text-2xl font-bold">Machine Rental</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {machines.map((m) => (
              <motion.div key={m._id} variants={box} initial="hidden" whileInView="show" className={`${light ? "bg-white" : "bg-slate-900"} rounded-2xl p-4`}>
                <h3 className="font-bold">{m.name}</h3>
                <p className="text-sm">{m.type} | {m.location}</p>
                <p className="mt-2 text-emerald-400">Rs. {m.pricePerHour}/hour</p>
                <button onClick={() => bookMachine(m)} className="mt-3 rounded bg-emerald-600 px-3 py-2 text-white">Book Now</button>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-2xl font-bold">Agriculture Store</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <motion.div key={p._id} variants={box} initial="hidden" whileInView="show" className={`${light ? "bg-white" : "bg-slate-900"} rounded-2xl p-4`}>
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm capitalize">{p.category}</p>
                <p className="mt-2 text-amber-400">Rs. {p.price}</p>
                <button onClick={() => addCart(p)} className="mt-3 rounded bg-amber-500 px-3 py-2 text-slate-900">Add to Cart</button>
              </motion.div>
            ))}
          </div>
          <div className={`${light ? "bg-white" : "bg-slate-900"} mt-4 rounded-2xl p-4`}>
            <h3 className="font-bold">Cart ({cart.length})</h3>
            <p className="text-sm">Total: Rs. {cart.reduce((t, i) => t + i.price * i.quantity, 0)}</p>
            <button onClick={checkout} className="mt-2 rounded bg-cyan-600 px-4 py-2 text-white">Checkout</button>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-2xl font-bold">Training Hub</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {training.map((t) => (
              <motion.div key={t._id} variants={box} initial="hidden" whileInView="show" className={`${light ? "bg-white" : "bg-slate-900"} rounded-2xl p-4`}>
                <h3 className="font-semibold">{t.title}</h3>
                <p className="text-sm">{t.category}</p>
                <a className="mt-2 inline-block text-cyan-400 underline" href={t.videoUrl} target="_blank" rel="noreferrer">Watch video</a>
                <button onClick={() => markProgress(t._id)} className="mt-3 block rounded bg-indigo-600 px-3 py-2 text-white">Mark Completed</button>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className={`${light ? "bg-white" : "bg-slate-900"} rounded-2xl p-4`}>
            <h3 className="mb-2 text-xl font-bold">Rental History</h3>
            {rentals.map((r) => (
              <p key={r._id} className="mb-1 text-sm">{r.machine?.name || "Machine"} - {r.status} - Rs. {r.totalAmount}</p>
            ))}
          </div>
          <div className={`${light ? "bg-white" : "bg-slate-900"} rounded-2xl p-4`}>
            <h3 className="mb-2 text-xl font-bold">Orders & Delivery</h3>
            {orders.map((o) => (
              <p key={o._id} className="mb-1 text-sm">{o.trackingId} - {o.status} - Rs. {o.totalAmount}</p>
            ))}
          </div>
        </section>

        {user?.role === "admin" && analytics && (
          <section className="mt-8 rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-700 p-5 text-white">
            <h3 className="text-2xl font-bold">Admin Dashboard</h3>
            <p>Users: {analytics.users} | Machines: {analytics.machines} | Rentals: {analytics.rentals} | Orders: {analytics.orders} | Trainings: {analytics.trainings}</p>
          </section>
        )}
      </div>
    </div>
  );
}
