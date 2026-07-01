/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";

import "./index.css";

import Dashboard from "./pages/Dashboard.jsx";
import AuthProvider from "./pages/AuthProvider.jsx";
import Login from "./pages/Login.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import NotFound from "./pages/NotFound.jsx";
import Index from "./pages/Index.jsx";
import PTIK from "./pages/PTIK.jsx";
import Tugas from "./pages/Tugas.jsx";
import TugasLama from "./pages/TugasLama.jsx";
import TugasEdit from "./pages/TugasEdit.jsx";
import TugasTambah from "./pages/TugasTambah.jsx";
import Profil from "./pages/Profil.jsx";
import Jadwal from "./pages/Jadwal.jsx";

const root = document.getElementById("root");

render(
    () => (
        <Router>
            <Route path="/" component={() => Index} />
            <Route component={AuthProvider}>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/ptik" component={PTIK} />
                <Route path="/tugas" component={Tugas} />
                <Route path="/tugas/lama" component={TugasLama} />
                <Route path="/tugas/tambah" component={TugasTambah} />
                <Route path="/tugas/edit" component={TugasEdit} />
                <Route path="/profil" component={Profil} />
                <Route path="/jadwal" component={Jadwal} />
            </Route>
            <Route path="/login" component={Login} />
            <Route path="/reset_password" component={ResetPassword} />
            <Route path="*404" component={NotFound} />
        </Router>
    ),
    root,
);
