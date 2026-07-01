import KMS from "../components/KMS.jsx";
import { For } from "solid-js";
import { A } from "@solidjs/router";

import UserGroup from "../components/icons/UserGroup.jsx";
import User from "../components/icons/User.jsx";
import Calendar from "../components/icons/Calendar.jsx";
import Clipboard from "../components/icons/Clipboard.jsx";

export default function Dashboard() {
    const dashboardItem = [
        { path: "/ptik", name: "Mahasiswa PTIK", icon: UserGroup },
        { path: "/profil", name: "Profil", icon: User },
        { path: "/tugas", name: "Tugas", icon: Clipboard },
        { path: "/jadwal", name: "Jadwal", icon: Calendar },
    ];

    return (
        <main class="overflow-auto">
            <KMS class="h-1/3 bg-black/50 border-b-2 border-primary"></KMS>
            <div class="grid grid-cols-2 gap-4 p-4 max-w-2xl mx-auto mt-4">
                <For each={dashboardItem}>
                    {(item) => (
                        <A
                            class="p-4 border-2 btn btn-primary btn-outline aspect-video w-full h-full flex flex-col gap-2"
                            state={{ name: item.name }}
                            href={item.path}
                        >
                            {item.icon}
                            <p class="font-bold text-center md:text-lg">
                                {item.name}
                            </p>
                        </A>
                    )}
                </For>
            </div>
        </main>
    );
}
