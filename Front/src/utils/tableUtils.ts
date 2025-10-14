import { keys } from "@mantine/core";
import type { DisplayPoll } from "./types";

function filterData(data: DisplayPoll[], search: string) {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
        keys(data[0]).some((key) => key !== 'id' && item[key]?.toLowerCase().includes(query))
    );
}

export function sortData(
    data: DisplayPoll[],
    payload: { sortBy: keyof DisplayPoll | null; reversed: boolean; search: string }
) {
    const { sortBy } = payload;

    if (!sortBy)
        return filterData(data, payload.search);

    return filterData(
        [...data].sort((a, b) => {
            // no filtering by id and link
            if (sortBy === 'id' || sortBy === 'link')
                return 0; // Keep original order

            return payload.reversed
                ? b[sortBy].localeCompare(a[sortBy])
                : a[sortBy].localeCompare(b[sortBy]);
        }),
        payload.search
    );
}