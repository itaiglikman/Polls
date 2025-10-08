import { Route, Routes } from "react-router";
import { Box } from "@mantine/core";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { Home } from "../HomeArea/Home";
import { CreatePoll } from "../CreatePollArea/CreatePoll";
import { PollPage } from "../PollPageArea/PollPage";

export function Routing() {
    return (
        <Box flex={1}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/create" element={<CreatePoll/>}/>
                {/* poll page */}
                {/* <Route path="/polls/:id" element={<PollPage id={}/>}/> */}
                <Route path="/polls" element={<PollPage/>}/>
                {/* 404 */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Box>
    );
}