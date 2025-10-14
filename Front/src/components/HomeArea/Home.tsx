import { Button } from "@mantine/core";
import { useNavigate } from "react-router";
import "./home.css";
import { PollsTable } from "./PollsTable";

export function Home() {
    const navigate = useNavigate();

    return (
        <div className="Home">
            <PollsTable/>
            <Button onClick={() => navigate('/create')}>Create New Poll</Button>
        </div>
    );
}
