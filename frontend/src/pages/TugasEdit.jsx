import { createSignal } from "solid-js";
import { A, useLocation, useNavigate } from "@solidjs/router";
import ChevronLeft from "../components/icons/ChevronLeft";
import Pencil from "../components/icons/Pencil.jsx";
import { put } from "../utils/api.js";

export default function TugasEdit() {
    const location = useLocation();
    const navigate = useNavigate();

    const [submitting, setSubmitting] = createSignal(false);

    async function submitForm(event) {
        event.preventDefault();
        setSubmitting(true);

        const formData = new FormData(event.target);
        formData.set("id", location.state?.ID);

        const [res, err] = await put("tugas", formData);
        if (err) {
            alert(err);
            setSubmitting(false);
            return;
        }

        setSubmitting(false);
        navigate("/tugas");
    }

    return (
        <main>
            <form
                class="h-full flex justify-center items-center "
                onsubmit={submitForm}
            >
                <fieldset class="fieldset bg-base-200 w-xs sm:w-sm p-4 border border-base-content/10">
                    <legend class="fieldset-legend text-xl mx-auto">
                        Edit Tugas
                    </legend>

                    <label class="label" for="nama">
                        Nama
                    </label>
                    <input
                        name="nama"
                        type="text"
                        value={location.state?.Nama}
                        class="w-full input validator"
                        placeholder="Presentasi Gelombang Radiasi..."
                        required
                    />

                    <label class="label" for="matkul">
                        Matkul
                    </label>
                    <input
                        name="matkul"
                        type="text"
                        value={location.state?.Matkul}
                        class="w-full input validator"
                        placeholder="Jaringan Nirkabel..."
                        required
                    />
                    <label class="label" for="deskripsi">
                        Deskripsi
                    </label>
                    <textarea
                        name="deskripsi"
                        type="text"
                        value={location.state?.Deskripsi}
                        class="textarea w-full validator"
                        placeholder="Menjelaskan minimal 50 slide disertai quis dan contoh..."
                        required
                    ></textarea>

                    <label class="label" for="deadline">
                        Deadline
                    </label>
                    <input
                        name="deadline"
                        type="date"
                        value={location.state?.Deadline}
                        min="2026-06-30"
                        class="w-full input validator"
                    />

                    <label class="label" for="link">
                        Link Tugas (opsional)
                    </label>
                    <input
                        name="link"
                        type="url"
                        value={location.state?.Link}
                        min="2026-04-01"
                        class="w-full input validator"
                        placeholder="https://docs.google.com/"
                    />
                    <div class="flex flex-row mt-4 gap-4 justify-stretch items-stretch">
                        <A class="grow btn btn-outline" href="/tugas">
                            <ChevronLeft class="size-6" /> Kembali
                        </A>
                        <button
                            class="grow btn btn-primary"
                            disabled={submitting()}
                        >
                            <Pencil class="size-6" />
                            Edit
                        </button>
                    </div>
                </fieldset>
            </form>
        </main>
    );
}
