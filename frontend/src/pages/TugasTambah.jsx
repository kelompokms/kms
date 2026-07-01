import { createSignal } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import ChevronLeft from "../components/icons/ChevronLeft";
import Plus from "../components/icons/Plus";
import { post } from "../utils/api.js";

export default function TugasTambah() {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = createSignal(false);

    async function submitForm(event) {
        event.preventDefault();
        setSubmitting(true);

        const formData = new FormData(event.target);

        const [res, err] = await post("tugas", formData);
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
                        Tambah Tugas
                    </legend>

                    <label class="label" for="nama">
                        Nama
                    </label>
                    <input
                        name="nama"
                        type="text"
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
                        min="2026-06-30"
                        class="w-full input validator"
                    />

                    <label class="label" for="link">
                        Link Tugas (opsional)
                    </label>
                    <input
                        name="link"
                        type="url"
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
                            <Plus class="size-6" />
                            Tambah
                        </button>
                    </div>
                </fieldset>
            </form>
        </main>
    );
}
