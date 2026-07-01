import { createEffect, createSignal, onMount, Show } from "solid-js";
import { A, useLocation, useNavigate } from "@solidjs/router";

import { get } from "../utils/api";
import Loading from "../components/Loading";
import ChevronLeft from "../components/icons/ChevronLeft.jsx";

export default function AuthProvider({ children }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [isAuth, setIsAuth] = createSignal(false);
    const [isNested, setIsNested] = createSignal(false);

    createEffect(() => {
        setIsNested(location.pathname != "/dashboard");
    });

    onMount(async () => {
        const [res, err] = await get("auth");
        if (err) navigate("/login", { replace: true });
        else setIsAuth(true);
    });

    return (
        <>
            <header class="border-b-2 border-primary h-16 flex items-center p-2">
                <div class="max-w-4xl mx-auto w-full">
                    <Show when={isNested()}>
                        <A href="/dashboard" class="btn btn-ghost p-2 py-4">
                            <ChevronLeft class="size-6" />
                            Kembali
                        </A>
                    </Show>
                </div>
            </header>
            <Show fallback={Loading} when={isAuth()}>
                {children}
            </Show>
        </>
    );
}
