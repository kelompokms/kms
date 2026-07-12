import { createSignal, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { post } from "../utils/api";

export default function GantiPfp() {
    const navigate = useNavigate();
    const [image, setImage] = createSignal();

    async function submitGanti() {
        const formData = new FormData();
        formData.set("pfp", image());

        const [res, err] = await post("user/change-pfp", formData);
        if (err) {
            console.log(err);
            setImage(null);
            return;
        }

        navigate("/profil");
    }

    return (
        <main class="flex justify-center items-center">
            <div class="flex flex-col gap-8">
                <h2 class="text-xl font-semibold text-center">
                    Upload gambarmu ke sini
                </h2>
                <input
                    type="file"
                    class="file-input"
                    accept=".png,.jpg,.jpeg,.webp"
                    onchange={(e) => {
                        const file = e.target.files[0];
                        if (file) setImage(file);
                    }}
                ></input>
                <Show when={image()}>
                    <img
                        class="aspect-square w-40 h-40 border mx-auto bg-center rounded-full"
                        src={URL.createObjectURL(image())}
                    ></img>
                    <button class="btn btn-primary" onclick={submitGanti}>
                        Ganti Profile Picture
                    </button>
                </Show>
            </div>
        </main>
    );
}
