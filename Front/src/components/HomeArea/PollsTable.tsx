import { Button, Group, ScrollArea, Table, Text, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import pollsService from '../../services/pollsService';
import { sortData } from "../../utils/tableUtils";
import type { DisplayPoll } from '../../utils/types';
import "./PollsTable.module.css";
import { Th } from './Th';
import { useNavigate } from 'react-router';
import notifyService from '../../services/NotifyService';

export function PollsTable() {
    const [search, setSearch] = useState('');
    const [sortedPolls, setSortedPolls] = useState<DisplayPoll[]>([]);
    const [sortBy, setSortBy] = useState<keyof DisplayPoll | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        pollsService.getPolls()
            .then(pollsData => setSortedPolls(pollsData))
            .catch(error => console.error('Error fetching polls:', error));
    }, [])

    const setSorting = (field: keyof DisplayPoll) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedPolls(sortData(sortedPolls, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedPolls(sortData(sortedPolls, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    const rows = sortedPolls.map((row) => (
        <Table.Tr
            key={row.id}
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/polls/poll-page/' + row.id)}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f3f5'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
        >
            <Table.Td>{row.title}</Table.Td>
            <Table.Td>{row.creator}</Table.Td>
            <Table.Td>
            <Group>
                <Button onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(row.link!);
                notifyService.success('Link was copied to your clipboard!')
                }}>
                Share
                </Button>
            </Group>
            </Table.Td>
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
                <Table.Thead>
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
                </Table.Thead>
                <Table.Tbody>
                    {rows.length > 0 ? (
                        rows
                    ) : (
                        <Table.Tr>
                            <Table.Td colSpan={3}>
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