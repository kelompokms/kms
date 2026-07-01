import { useNavigate } from "@solidjs/router";
import Wolf from "../assets/wolf.webp";
import { get } from "../utils/api.js";
import ChevronLeft from "../components/icons/ChevronLeft.jsx";

export default function InternalServerError() {
    const navigate = useNavigate();

    async function refresh() {
        const [res, err] = await get("");
        if (res) navigate("/");
    }

    return (
        <main>
            <img
                src={Wolf}
                class="absolute top-0 left-0 w-full h-full opacity-10"
            ></img>
            <div class="size-full absolute top-0 left-0 flex justify-center items-center">
                <div class="text-center text-orange-100/60 font-semibold">
                    <h2 class="text-4xl">400</h2>
                    <p class="my-4">Not Found</p>
                    <button onClick={refresh} class="btn btn-ghost btn-primary">
                        <ChevronLeft class="size-5" />
                        Kembali
                    </button>
                </div>
            </div>
        </main>
    );
}
