import { Route, Routes } from "react-router";
import { Box } from "@mantine/core";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { Home } from "../HomeArea/Home";
import { CreatePoll } from "../CreatePollArea/CreatePoll";
import { PollPage } from "../PollPageArea/PollPage";

export function Routing() {
    return (
        <Box flex={1} m={20}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/create" element={<CreatePoll/>}/>
                {/* poll page */}
                <Route path="/polls/poll-page/:pollId" element={<PollPage/>}/>
                {/* 404 */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Box>
    );
}