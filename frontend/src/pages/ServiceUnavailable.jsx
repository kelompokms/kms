import { useNavigate } from "@solidjs/router";
import { get } from "../utils/api.js";
import ArrowPath from "../components/icons/ArrowPath.jsx";

export default function ServiceUnavailable() {
    const navigate = useNavigate();

    async function refresh() {
        const [res, err] = await get("");
        if (res) {
            navigate("/");
            return;
        }
        alert("masih down");
    }

    return (
        <main>
            <div class="flex justify-center items-center absolute w-full h-full opacity-10">
                <svg
                    width="20.723946"
                    height="34.77029"
                    viewBox="0 0 5.4832105 9.1996391"
                    version="1.1"
                    class="size-20 md:size-40"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:svg="http://www.w3.org/2000/svg"
                >
                    <defs id="defs1" />
                    <path
                        style="baseline-shift:baseline;display:inline;overflow:visible;opacity:1;fill:#ffffff;stroke:#000000;stroke-width:0.375279;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;enable-background:accumulate;stop-color:#000000;stop-opacity:1"
                        d="M 1.3764602,0.39106723 A 0.6971353,0.6971353 0 0 0 0.3903983,0.39038706 0.6971353,0.6971353 0 0 0 0.39107847,1.3764597 L 3.614109,4.5994901 0.3903983,7.8231792 a 0.6971353,0.6971353 0 0 0 0,0.9853925 0.6971353,0.6971353 0 0 0 0.9860619,6.802e-4 L 5.0928509,5.0928504 A 0.69720501,0.69720501 0 0 0 5.0921707,4.1067885 Z"
                        id="path1-1"
                    />
                </svg>

                <svg
                    width="27.591473"
                    height="17.13422"
                    viewBox="0 0 7.3002437 4.533429"
                    version="1.1"
                    class="size-20 md:size-40 rotate-180"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:svg="http://www.w3.org/2000/svg"
                >
                    <defs id="defs1" />
                    <path
                        style="baseline-shift:baseline;display:inline;overflow:visible;opacity:1;fill:#ffffff;stroke:#000000;stroke-width:0.375279;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;enable-background:accumulate;stop-color:#000000;stop-opacity:1"
                        d="m 0.39052573,0.39053547 a 0.69713657,0.69713657 0 0 0 0,0.98565153 L 3.157302,4.1429319 a 0.69720628,0.69720628 0 0 0 0.9856515,0 L 6.90972,1.376187 a 0.69713657,0.69713657 0 0 0 0,-0.98565153 0.69713657,0.69713657 0 0 0 -0.9856624,0 L 3.6501331,2.6644491 1.3761978,0.39053547 a 0.69713657,0.69713657 0 0 0 -0.98567207,0 z"
                        id="path1-2"
                    />
                </svg>

                <svg
                    width="20.718647"
                    height="34.76395"
                    viewBox="0 0 5.4818086 9.1979617"
                    version="1.1"
                    class="size-20 md:size-40"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:svg="http://www.w3.org/2000/svg"
                >
                    <defs id="defs1" />
                    <path
                        style="baseline-shift:baseline;display:inline;overflow:visible;opacity:1;fill:#ffffff;stroke:#000000;stroke-width:0.375279;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;enable-background:accumulate;stop-color:#000000;stop-opacity:1"
                        d="M 4.1063655,0.39028328 0.3902544,4.106404 a 0.69720462,0.69720462 0 0 0 0,0.985155 l 3.7161111,3.7161208 a 0.69713491,0.69713491 0 0 0 0.985156,0 0.69713491,0.69713491 0 0 0 0,-0.9851658 L 1.867989,4.5989869 5.0915215,1.375449 a 0.69713491,0.69713491 0 0 0 0,-0.98516572 0.69713491,0.69713491 0 0 0 -0.985156,0 z"
                        id="path1"
                    />
                </svg>
            </div>

            <div class="size-full absolute top-0 left-0 flex justify-center items-center z-2">
                <div class="text-center font-semibold text-error">
                    <h2 class="text-4xl">503</h2>

                    <p class="mb-4">Service Unavailable</p>
                    <button onClick={refresh} class="btn btn-ghost btn-error">
                        <ArrowPath class="size-5" />
                        Coba lagi
                    </button>
                </div>
            </div>
        </main>
    );
}
