import { Box, Button, Chip, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomBreadcrumbs from "../../components/breadcrumb/CustomBreadcrumbs";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { CommonTable } from "../../components/table/Table";
import { useFormattedDate } from "../../utils/Hooks";
import { useGetLeaderBoardMutation } from "../../redux/slices/apiSlice";
import TableSkeleton from "../../components/skeleton/TableSkeleton";

const Leaderboard = () => {
  const [data, setData] = useState();

  const [postData, { isLoading, error, data: leaderBoardData }] =
    useGetLeaderBoardMutation();

  useEffect(() => {
    postData({});
  }, []);

  useEffect(() => {
    if (leaderBoardData) {
      setData(leaderBoardData?.data?.leaderboard);
    }
  }, [leaderBoardData]);

  const columns = [
    { field: "id", headerName: "ID", width: 400 },
    { field: "name", headerName: "Name", width: 400 },
    { field: "score", headerName: "Score", width: 400 },
  ];

  return (
    <>
      <CustomBreadcrumbs
        items={[
          {
            label: "Leaderboard",
            href: "/dashboard/students",
            icon: <EmojiEventsIcon fontSize="small" />,
          },
        ]}
      />
      <Paper sx={{ height: "auto", width: "100%", padding: 3 }}>
        {/* Leader board table */}
        {isLoading ? (
          <TableSkeleton rows={10} columns={6} />
        ) : (
          <CommonTable
            userTableData={data}
            columns={columns}
            pageSizeOptions={[10, 15, 20, 50, 100]}
          />
        )}
      </Paper>
    </>
  );
};

export default Leaderboard;
