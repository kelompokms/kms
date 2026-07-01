import { createSignal, For, onMount, Show } from "solid-js";
import { A } from "@solidjs/router";

import { get } from "../utils/api";
import { formatDate } from "../utils/formatter.js";

import ChevronLeft from "../components/icons/ChevronLeft.jsx";
import Pencil from "../components/icons/Pencil.jsx";

export default function TugasLama() {
    const [tugas, setTugas] = createSignal([]);
    const [loading, setLoading] = createSignal(true);

    onMount(async () => {
        const [res, err] = await get("tugas/lama");
        if (err) {
            setLoading(false);
            console.log(err);
            return;
        }

        setLoading(false);
        setTugas(res ? res : []);
    });

    return (
        <main class="overflow-auto max-w-4xl mx-auto p-4">
            <div class="flex flex-col gap-2">
                <div class="flex flex-col md:flex-row md:gap-2 mb-4">
                    <span class="grow"></span>
                    <A
                        href="/tugas"
                        class="btn btn-outline btn-primary rounded-none mt-4 md:w-max"
                    >
                        <span>
                            <ChevronLeft class="size-6" />
                        </span>{" "}
                        Kembali
                    </A>
                </div>
                <For each={tugas()}>
                    {(t) => (
                        <div class="border border-white/10 bg-base-200/20 flex flex-col md:flex-row items-center">
                            <div class="flex flex-col gap-2 grow p-4 w-full">
                                <div>
                                    <h2 class="font-bold text-lg">{t.Nama}</h2>
                                    <p class="opacity-70 italic">{t.Matkul}</p>
                                </div>
                                <p>{t.Deskripsi}</p>
                                <p class="text-warning">
                                    Deadline: {formatDate(t.Deadline)}
                                </p>
                                <div>
                                    <Show when={t.Link}>
                                        <p>Links:</p>
                                        <A
                                            target="_blank"
                                            class="link block text-blue-400"
                                            href={t.Link}
                                        >
                                            {t.Link}
                                        </A>
                                    </Show>
                                </div>
                            </div>
                            <A
                                href="/tugas/edit"
                                class="btn rounded-none flex md:flex-col w-full md:w-auto md:py-8 mx-4"
                            >
                                <span>
                                    <Pencil />
                                </span>
                                Edit
                            </A>
                        </div>
                    )}
                </For>
            </div>
        </main>
    );
}
