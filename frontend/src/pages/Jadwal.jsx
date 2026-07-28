import PTIK from "../assets/ptik.json";
import { createSignal, For } from "solid-js";

export default function Jadwal() {
    const [kelas, setKelas] = createSignal("A");

    return (
        <main class="p-4 overflow-auto">
            <div class="max-w-7xl mx-auto">
                <div class="flex *:grow mb-4">
                    <button
                        class={`btn ${kelas() == "A" ? "btn-primary" : ""}`}
                        onClick={() => setKelas("A")}
                    >
                        Kelas A
                    </button>
                    <button
                        class={`btn ${kelas() == "B" ? "btn-primary" : ""}`}
                        onClick={() => setKelas("B")}
                    >
                        Kelas B
                    </button>
                </div>
                <table class="table table-zebra py-2 border-2 border-white">
                    <thead>
                        <tr class="border-b-white">
                            <For each={PTIK.keys}>
                                {(val) => <th>{val}</th>}
                            </For>
                        </tr>
                    </thead>
                    <tbody>
                        <For each={PTIK.values[kelas()]}>
                            {(val, index) => (
                                <tr>
                                    <td>{val[0]}</td>
                                    <td>{PTIK.hari[val[1]]}</td>
                                    <td>{val[2]}</td>
                                    <td>{val[3]}</td>
                                    <td>{val[4]}</td>
                                    <td>{val[5]}</td>
                                    <td>{val[6]}</td>
                                    <td>{val[7]}</td>
                                    <td>{val[8]}</td>
                                </tr>
                            )}
                        </For>
                    </tbody>
                </table>
            </div>
        </main>
    );
}
