export function formatDate(val) {
    const date = new Date(val);
    return date.toLocaleDateString("id-ID", {
        dateStyle: "long",
    });
}
