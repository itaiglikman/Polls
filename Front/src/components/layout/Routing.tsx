import { Route, Routes } from "react-router";
import { Box } from "@mantine/core";
// import { PageNotFound } from "../../pages/PageNotFound/PageNotFound";

export function Routing() {
    return (
        <Box flex={1}>
            <Routes>
                {/* 404 */}
                {/* <Route path="*" element={<PageNotFound />} /> */}
            </Routes>
        </Box>
    );
}