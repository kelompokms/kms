import { A, useNavigate } from "@solidjs/router";
import { post } from "../utils/api.js";
import { createSignal } from "solid-js";

export default function Login() {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = createSignal(false);

    async function handleForm(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        setSubmitting(true);
        const [res, err] = await post("reset_password", formData);
        if (err) {
            console.log(err);
            setSubmitting(false);
            return;
        }

        alert(res.message);

        navigate("/dashboard");
    }

    return (
        <main class="flex items-center justify-center">
            <form method="POST" onsubmit={handleForm}>
                <fieldset class="fieldset bg-base-200 rounded-box w-xs sm:w-sm p-4 border border-base-content/10">
                    <legend class="fieldset-legend text-xl mx-auto">
                        Reset Password
                    </legend>

                    <label for="nim" class="label">
                        NIM
                    </label>
                    <input
                        name="nim"
                        type="text"
                        class="w-full input validator"
                        placeholder="K352xxxx"
                        pattern="K352[45]\d{3}"
                        required
                    />
                    <label for="tanggal_lahir" class="label">
                        Tanggal Lahir
                    </label>
                    <input
                        name="tanggal_lahir"
                        type="date"
                        class="w-full input validator"
                        required
                    />

                    <label for="password" class="label mt-2">
                        Password Baru
                    </label>
                    <input
                        name="password"
                        type="password"
                        class="w-full input validator"
                        placeholder="admin123"
                        required
                    />

                    <A href="/login" class="mt-2 label link">
                        Kembali ke Login
                    </A>

                    <button
                        disabled={submitting()}
                        type="submit"
                        class="btn btn-secondary mt-4"
                    >
                        Reset Password
                    </button>
                </fieldset>
            </form>
        </main>
    );
}
