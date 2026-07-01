const host = import.meta.env.VITE_API_HOST
    ? import.meta.env.VITE_API_HOST
    : window.location.host + "/api";

const URL = window.location.protocol + "//" + host + "/";

export const getProfilePicturePath = (path) => URL + "public" + "/pfp/" + path;

export async function get(...segments) {
    const [res, err] = await fetch(URL + segments.join("/"), {
        method: "GET",
        credentials: "include",
    })
        .then((res) => [res, null])
        .catch((err) => [null, err]);

    if (err) {
        return [null, err];
    }
    if (res && !res.ok) {
        const text = await res.text();
        return [null, res.statusText];
    }

    const json = await res.json();

    return [json, null];
}

export async function post(path, body) {
    const [res, err] = await fetch(URL + path, {
        method: "POST",
        body: body,
        credentials: "include",
    })
        .then((response) => [response, null])
        .catch((error) => [null, error]);

    if (err) {
        return [null, err.statusText];
    }

    if (res && !res.ok) {
        const text = await res.text();
        return [null, text];
    }

    const json = await res.json();
    return [json, null];
}

export async function put(path, body) {
    const [res, err] = await fetch(URL + path, {
        method: "PUT",
        body: body,
        credentials: "include",
    })
        .then((response) => [response, null])
        .catch((error) => [null, error]);

    if (err) {
        return [null, err.statusText];
    }

    if (res && !res.ok) {
        const text = await res.text();
        return [null, text];
    }

    const json = await res.json();
    return [json, null];
}
