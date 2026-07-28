import { createSignal, onMount, Show } from "solid-js";
import { A, useNavigate } from "@solidjs/router";

import { get, getProfilePicturePath, post } from "../utils/api.js";
import { formatDate } from "../utils/formatter.js";

import Loading from "../components/Loading.jsx";
import Pencil from "../components/icons/Pencil.jsx";
import Wolf from "../assets/wolf.webp";

export default function Profil() {
    const navigate = useNavigate();

    const [loading, setLoading] = createSignal(true);
    const [profile, setProfile] = createSignal([]);

    onMount(async () => {
        const [res, err] = await get("user");
        if (err) {
            alert(err);
            setLoading(false);
            return;
        }

        setLoading(false);
        setProfile(res);
    });

    return (
        <main class="overflow-auto max-w-xl mx-auto flex justify-center items-center p-4 relative">
            <Show when={!loading()} fallback={Loading}>
                <div class="grow">
                    <div class="w-full flex justify-center items-center py-10">
                        <div class="rounded-full aspect-square bg-center size-40 relative">
                            <A
                                href="/profil/ganti-pfp"
                                draggable="false"
                                class="btn rounded-full btn-ghost absolute left-0 top-0 w-full h-full opacity-0 hover:bg-black/50 hover:opacity-100"
                            >
                                <Pencil class="size-6" />
                            </A>
                            <img
                                src={
                                    profile().Pfp
                                        ? getProfilePicturePath(profile().Pfp)
                                        : Wolf
                                }
                                class="h-full w-full rounded-full"
                            ></img>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center grow">
                        <div class="flex bg-base-200 p-4 border border-neutral first:rounded-t-lg last:rounded-b-lg">
                            <p class="flex-1 text-base-content/80">NIM</p>
                            <p class="font-semibold">{profile().Nim}</p>
                        </div>
                        <div class="flex bg-base-200 p-4 border border-neutral first:rounded-t-lg last:rounded-b-lg">
                            <p class="flex-1 text-base-content/80">Nama</p>
                            <p class="font-semibold">{profile().Nama}</p>
                        </div>
                        <div class="flex bg-base-200 p-4 border border-neutral first:rounded-t-lg last:rounded-b-lg">
                            <p class="flex-1 text-base-content/80">Tempat</p>
                            <p class="font-semibold">{profile().TempatLahir}</p>
                        </div>
                        <div class="flex bg-base-200 p-4 border border-neutral first:rounded-t-lg last:rounded-b-lg">
                            <p class="flex-1 text-base-content/80">
                                Tanggal Lahir:
                            </p>
                            <p class="font-semibold tgl-lahir">
                                {formatDate(profile().TanggalLahir)}
                            </p>
                        </div>
                    </div>
                    <button
                        onclick={() => {
                            const res = confirm("Yakin ingin logout?");
                            if (res)
                                post("/logout", null).then(([res, err]) => {
                                    navigate("/login");
                                });
                        }}
                        class="btn text-error btn-ghost w-fit ml-auto mt-4"
                    >
                        Logout
                    </button>
                </div>
            </Show>
        </main>
    );
}
