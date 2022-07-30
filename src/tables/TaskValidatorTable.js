import {
    Checkbox
} from "@mui/material";
import { useState, useEffect } from "react";
import { getDoc, setDoc, doc, getFirestore } from "firebase/firestore/lite";
import firebase from "../firebase";
import { getDateStr } from "../dateUtils";
import BaseTable from "./BaseTable";

const todayStr = getDateStr();
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowStr = getDateStr(tomorrow);

export default function TaskValidatorTable({ tomorrow, user, setLoading }) {
    const [tasks, setTasks] = useState([]);

    const db = getFirestore(firebase);
    useEffect(() => {
        if (!user) return;
        (async () => {
            setTasks((await getDoc(doc(db, "users", user, "tasks", tomorrow ? tomorrowStr : todayStr))).data()?.tasks ?? []);
            setLoading(false);
        })();
    }, [user]);

    return (
        <BaseTable
            title={`Tasks${ tomorrow ? ' For Tomorrow' : ''}`}
            headers={tomorrow ? [
                { label: 'Task' }
            ] : [
                { label: 'Task' },
                { label: 'Note' },
                { attributes: { padding: "checkbox" }}
            ]}
            rows={ tasks.map(({ task, note, validated }, idx) => tomorrow ? [
                { content: task }
            ] : [
                { content: task },
                { content: note },
                { content: (
                    <Checkbox
                        checked={validated ?? false}
                        color="primary"
                        onChange={() => {
                            const updatedTasks = tasks.map((item, i) => (i !== idx) ? item : { ...item, validated: !item.validated });
                            setDoc(doc(db, "users", user, "tasks", tomorrow ? tomorrowStr : todayStr), { tasks: updatedTasks });
                            setTasks(updatedTasks);
                        }}
                    />
                )}
            ]) }
            emptyPlaceholder={`No tasks set for ${ tomorrow ? 'tomorrow' : 'today' }`}
        />
    )
}