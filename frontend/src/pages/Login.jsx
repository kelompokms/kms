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
        const [res, err] = await post("login", formData);
        if (err) {
            console.log(err);
            setSubmitting(false);
            return;
        }

        alert(res.statusText);

        navigate("/dashboard");
    }

    return (
        <main class="flex items-center justify-center">
            <form method="POST" onsubmit={handleForm}>
                <fieldset class="fieldset bg-base-200 rounded-box w-xs sm:w-sm p-4 border border-base-content/10">
                    <legend class="fieldset-legend text-xl mx-auto">
                        Login
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

                    <label for="password" class="label mt-2">
                        Password
                    </label>
                    <input
                        name="password"
                        type="password"
                        class="w-full input validator"
                        placeholder="admin123"
                        required
                    />

                    <A href="/reset_password" class="mt-2 label">
                        Lupa password? <u>Reset</u>
                    </A>

                    <button
                        disabled={submitting()}
                        type="submit"
                        class="btn btn-primary mt-4"
                    >
                        Login
                    </button>
                </fieldset>
            </form>
        </main>
    );
}
