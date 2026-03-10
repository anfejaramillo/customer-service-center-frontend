import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ActionsPanel } from './actions-panel';
import { Ticket, User } from './types';

import { createTicket, updateTicket } from '@/api/ticketApi';
import getAllUsers from '@/api/userApi';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import TicketForm from './ticket-form';


type MainContentProps = {
    title: string;
    subtitle: string;
    actions: string[];
    tickets: Ticket[];
    compact?: boolean;
    links: Record<string, string>;
    action: string,
    setAction: Dispatch<SetStateAction<string>>
};

function getPriorityStyles(priority: string) {
    switch (priority.toLowerCase()) {
        case 'high':
            return { backgroundColor: '#ffe4e1', color: '#9f1d1d', borderColor: '#f7b8b2' };
        case 'medium':
            return { backgroundColor: '#fff3d9', color: '#8a5a00', borderColor: '#f2d193' };
        default:
            return { backgroundColor: '#e1f4e5', color: '#1e6f3d', borderColor: '#a8deb8' };
    }
}

function getStatusStyles(status: string) {
    switch (status.toLowerCase()) {
        case 'open':
            return { backgroundColor: '#dcecff', color: '#1d4f91', borderColor: '#b5d2ff' };
        case 'in progress':
            return { backgroundColor: '#efe3ff', color: '#5f2d91', borderColor: '#d2b6ff' };
        case 'closed':
            return { backgroundColor: '#e8e8e8', color: '#484848', borderColor: '#cccccc' };
        default:
            return { backgroundColor: '#e8f3f8', color: '#335e74', borderColor: '#c1dae6' };
    }
}

function formatDate(value: Date | string) {
    const parsed = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(parsed.getTime())) {
        return 'N/A';
    }

    return parsed.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function TicketsMainPage({ title, subtitle, actions, tickets, compact = false, links = {}, action, setAction }: MainContentProps) {
    let render;
    const [users, setUsers] = useState(Array<User>);
    const [customers, setCustomers] = useState(Array<User>);
    const [agents, setAgents] = useState(Array<User>);
    const [isLoading, setIsloading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            try {
                const fetchAllUsers = async () => {
                    const response = await getAllUsers();
                    setUsers(response)
                    let agentsList: User[] = [];
                    let cusomersList: User[] = [];
                    response.map((user) => {
                        switch (user.role) {
                            case "AGENT":
                                agentsList.push(user);
                                break;
                            case "CUSTOMER":
                                cusomersList.push(user);
                                break;
                            default:
                                break;
                        }
                    })
                    setAgents(agentsList);
                    setCustomers(cusomersList);
                };
                fetchAllUsers();
            } catch (error) {
                console.log(error);
            }
            setIsloading(false);
        }
    });

    function getActionToExecute(actionParam: string): { actionResult: string, paramToExecute: string } {
        let _finalAction = actionParam;
        let _finalParam = "";
        let _update = actionParam.indexOf("update");
        if (_update >= 0) {
            _finalAction = "update";
            _finalParam = actionParam.substring(_update + 6);
        }
        let _delete = actionParam.indexOf("delete");
        if (_delete >= 0) {
            _finalAction = "delete";
            _finalParam = actionParam.substring(_delete + 6);
        }
        return {
            actionResult: _finalAction,
            paramToExecute: _finalParam
        };
    }

    const { actionResult, paramToExecute } = getActionToExecute(action);

    function getTicketInfo(_tickets: Array<Ticket>, idTicket: number): Ticket {
        return _tickets.filter((i) => i.id == idTicket)[0];
    }

    function onModifyPress(t: Ticket) {
        setAction("update" + t.id);
    }

    switch (actionResult) {
        case "showAll":
            render = <View style={styles.container}>
                <View style={styles.gradientLayerA} />
                <View style={styles.gradientLayerB} />
                <View style={styles.gradientLayerC} />

                <View style={styles.card}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>
                <TableContainer
                    component={Paper}
                    sx={{
                        borderRadius: 4,
                        border: '2px solid #171717',
                        background: 'rgba(255,255,255,0.9)',
                        boxShadow: '0 14px 34px rgba(0,0,0,0.08)',
                        mt: 2.5,
                    }}>
                    <Table sx={{ minWidth: 850 }} aria-label="tickets table">
                        <TableHead>
                            <TableRow sx={{ background: 'linear-gradient(90deg, #1f2937 0%, #111827 100%)' }}>
                                <TableCell sx={styles.headerCell}>Customer</TableCell>
                                <TableCell sx={styles.headerCell}>Agent</TableCell>
                                <TableCell sx={styles.headerCell}>Ticket</TableCell>
                                <TableCell sx={styles.headerCell}>Priority</TableCell>
                                <TableCell sx={styles.headerCell}>Status</TableCell>
                                <TableCell sx={styles.headerCell}>Updated At</TableCell>
                                <TableCell sx={styles.headerCell}>Modify</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tickets.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} sx={styles.emptyCell}>
                                        No tickets yet. Create one from the left actions panel.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                tickets.map((row, index) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{
                                            backgroundColor: index % 2 === 0 ? '#f8fafc' : '#eef2f7',
                                            '& td': { borderBottom: '1px solid #d8dee9' },
                                            '&:hover': { backgroundColor: '#e2e8f0' },
                                        }}>
                                        <TableCell sx={styles.bodyCellStrong}>{String(row.customerName)}</TableCell>
                                        <TableCell sx={styles.bodyCell}>{String(row.assignedAgentName)}</TableCell>
                                        <TableCell sx={styles.bodyCell}>{String(row.title)}</TableCell>
                                        <TableCell sx={styles.bodyCell}>
                                            <Chip
                                                size="small"
                                                label={String(row.priority)}
                                                sx={{
                                                    ...getPriorityStyles(String(row.priority)),
                                                    fontWeight: 700,
                                                    border: '1px solid',
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={styles.bodyCell}>
                                            <Chip
                                                size="small"
                                                label={String(row.status)}
                                                sx={{
                                                    ...getStatusStyles(String(row.status)),
                                                    fontWeight: 700,
                                                    border: '1px solid',
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={styles.bodyCell}>{formatDate(row.updatedAt)}</TableCell>
                                        <TableCell sx={styles.bodyCell}><Pressable onPress={() => onModifyPress(row)}><Text>Update</Text></Pressable></TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </View>;
            break;
        case "create":
            render = <TicketForm agents={agents} customers={customers} onSubmit={async (e) => { await createTicket(e); setAction("showAll"); }} isUpdate={false}></TicketForm>
            break;
        case "update":
            let ticketToUpdate = getTicketInfo(tickets, Number.parseInt(paramToExecute));
            render = <TicketForm agents={agents} customers={customers} onSubmit={async (e) => { await updateTicket(e); setAction("showAll"); }} _ticket={ticketToUpdate} isUpdate={true}></TicketForm>
            break;
        default:
            break;
    }


    return (
        <View style={[styles.layout, compact && styles.layoutCompact]}>
            <ActionsPanel title="Tickets" items={actions} compact={compact} links={links} setAction={setAction} />
            {
                render
            }
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 16,
        gap: 18,
    },
    layoutCompact: {
        flexDirection: 'column',
    },
    container: {
        flex: 1,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#101010',
        backgroundColor: '#e9e9e9',
        overflow: 'hidden',
        padding: 28,
        minHeight: 420,
    },
    gradientLayerA: {
        position: 'absolute',
        right: -120,
        top: 20,
        width: 420,
        height: 420,
        borderRadius: 210,
        backgroundColor: '#d7d7d7',
        zIndex: -1
    },
    gradientLayerB: {
        position: 'absolute',
        right: -60,
        bottom: -180,
        width: 500,
        height: 500,
        borderRadius: 250,
        backgroundColor: '#c7c7c7',
        zIndex: -1
    },
    gradientLayerC: {
        position: 'absolute',
        left: 90,
        bottom: -140,
        width: 380,
        height: 380,
        borderRadius: 190,
        backgroundColor: '#efefef',
        zIndex: -1
    },
    card: {
        borderWidth: 2,
        borderColor: '#171717',
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.75)',
        padding: 22,
        maxWidth: 620,
        gap: 10,
    },
    title: {
        color: '#171717',
        fontSize: 34,
        fontWeight: '700',
    },
    subtitle: {
        color: '#303030',
        fontSize: 20,
        lineHeight: 30,
    },
    headerCell: {
        color: '#f8fafc',
        fontWeight: 800,
        fontSize: 13,
        textTransform: 'uppercase',
        // letterSpacing: '0.07em',
        //borderBottom: 'none',
        //py: 1.7,
    },
    bodyCell: {
        color: '#273244',
        fontSize: 14,
        fontWeight: 500,
    },
    bodyCellStrong: {
        color: '#111827',
        fontSize: 14,
        fontWeight: 700,
    },
    emptyCell: {
        //  py: 3,
        textAlign: 'center',
        color: '#334155',
        fontSize: 14,
        fontWeight: 600,
        // borderBottom: 'none',
    },
});