export const capitalizeWord = word => word.charAt(0).toUpperCase() + word.slice(1);

export async function getAPIData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
}