import { useNavigate } from "@solidjs/router";
import { get } from "../utils/api";
import { onMount } from "solid-js";

export default function Index() {
    const navigate = useNavigate();

    onMount(async () => {
        const [res, err] = await get("auth");
        if (err) navigate("/login");
        else navigate("/dashboard");
    });
}
