import { createSignal, For, onMount, Show } from "solid-js";

import { get } from "../utils/api.js";
import { formatDate } from "../utils/formatter.js";

import Loading from "../components/Loading.jsx";
import MagnifyingGlass from "../components/icons/MagnifyingGlass.jsx";

export default function PTIK() {
    const [ptik, setPtik] = createSignal([]);
    const [loading, setLoading] = createSignal(true);

    onMount(async () => {
        const [res, err] = await get("ptik");
        if (err) {
            alert(err);
            setLoading(false);
            return;
        }

        setPtik(res);
        setLoading(false);
    });

    return (
        <>
            <main class="overflow-auto relative">
                <div class="max-w-4xl mx-auto p-4 w-full">
                    <div class="input border-2 border-white mb-4 w-full sticky top-2 z-1">
                        <MagnifyingGlass class="size-6" />
                        <input type="text" placeholder="Cari kata kunci..." />
                    </div>
                    <Show when={!loading()} fallback={Loading}>
                        <table class="table table-zebra py-2 border-2 border-white text-xs md:text-lg">
                            <thead>
                                <tr>
                                    <th>NIM</th>
                                    <th>Nama</th>
                                    <th>Tempat, Tanggal Lahir</th>
                                </tr>
                            </thead>
                            <tbody>
                                <For each={ptik()}>
                                    {(p) => (
                                        <tr>
                                            <td>{p.Nim}</td>
                                            <td>{p.Nama}</td>
                                            <td>
                                                {p.TempatLahir},
                                                <span class="tgl-lahir">
                                                    {" " +
                                                        formatDate(
                                                            p.TanggalLahir,
                                                        )}
                                                </span>
                                            </td>
                                        </tr>
                                    )}
                                </For>
                            </tbody>
                        </table>
                    </Show>
                </div>
            </main>
        </>
    );
}
