import { createSignal, onMount, Show } from "solid-js";
import { get, getProfilePicturePath } from "../utils/api.js";
import { formatDate } from "../utils/formatter.js";

import Loading from "../components/Loading.jsx";
import Wolf from "../assets/wolf.webp";

export default function Profil() {
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
                        <img
                            src={
                                profile().Profil
                                    ? getProfilePicturePath(profile().Profil)
                                    : Wolf
                            }
                            class="rounded-full aspect-square bg-center size-40"
                        ></img>
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
                        onclick={() => togglePopupActive()}
                        class="btn text-error btn-ghost w-fit ml-auto mt-4"
                    >
                        Logout
                    </button>
                </div>
            </Show>
        </main>
    );
}
