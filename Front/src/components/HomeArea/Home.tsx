import { Button } from "@mantine/core";
import { useNavigate } from "react-router";
import "./home.css";
import { PollsTable } from "./PollsTable";

export function Home() {
    const navigate = useNavigate();

    return (
        <div className="Home">
            <Button onClick={() => navigate('/create')} mb={20}>Create New Poll</Button>
            <PollsTable/>
        </div>
    );
}
