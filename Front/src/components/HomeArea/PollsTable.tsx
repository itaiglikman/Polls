import { ScrollArea, Table, Text, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import { sortData } from "../../utils/tableUtils";
import "./PollsTable.module.css";
import { Th } from './Th';

export interface RowData {
    title: string;
    creator: string;
    link: string;
}

const data = [
    {
        title: 'Athena Weissnat',
        creator: 'Little - Rippin',
        link: 'Elouise.Prohaska@yahoo.com',
    },
    {
        title: 'Deangelo Runolfsson',
        creator: 'Greenfelder - Krajcik',
        link: 'Kadin_Trantow87@yahoo.com',
    },
    {
        title: 'Danny Carter',
        creator: 'Kohler and Sons',
        link: 'Marina3@hotmail.com',
    },
    {
        title: 'Trace Tremblay PhD',
        creator: 'Crona, Aufderhar and Senger',
        link: 'Antonina.Pouros@yahoo.com',
    },
    {
        title: 'Derek Dibbert',
        creator: 'Gottlieb LLC',
        link: 'Abagail29@hotmail.com',
    },
] ;
// ] as RowData[];

export function PollsTable() {
    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState(data);
    const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const setSorting = (field: keyof RowData) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(data, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    const rows = sortedData.map((row) => (
        <Table.Tr key={row.title}>
            <Table.Td>{row.title}</Table.Td>
            <Table.Td>{row.creator}</Table.Td>
            <Table.Td>{row.link}</Table.Td>
        </Table.Tr>
    ));

    return (
        <ScrollArea>
            <TextInput
                placeholder="Search by any field"
                mb="md"
                leftSection={<IconSearch size={16} stroke={1.5} />}
                value={search}
                onChange={handleSearchChange}
            />
            <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
                <Table.Tbody>
                    <Table.Tr>
                        <Th
                            sorted={sortBy === 'title'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('title')}
                        >
                            title
                        </Th>
                        <Th
                            sorted={sortBy === 'creator'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('creator')}
                        >
                            creator
                        </Th>
                        <Th
                            sorted={sortBy === 'link'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('link')}
                        >
                            link
                        </Th>
                    </Table.Tr>
                </Table.Tbody>
                <Table.Tbody>
                    {rows.length > 0 ? (
                        rows
                    ) : (
                        <Table.Tr>
                            <Table.Td colSpan={Object.keys(data[0]).length}>
                                <Text fw={500} ta="center">
                                    Nothing found
                                </Text>
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
        </ScrollArea>
    );
}