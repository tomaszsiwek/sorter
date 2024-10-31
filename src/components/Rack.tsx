import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Sample } from "../types";

export interface RackProps {
  rows: Sample[];
}

const Rack: React.FunctionComponent<RackProps> = ({ rows }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell> Sample </TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Company</TableCell>
            <TableCell align="right">District</TableCell>
            <TableCell align="right">Vision defect</TableCell>
          </TableRow>
        </TableHead>
        {rows.map((row) => (
          <TableBody key={row.id}>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.patient.age}</TableCell>
              <TableCell align="right">{row.patient.company}</TableCell>
              <TableCell align="right">{row.patient.district}</TableCell>
              <TableCell align="right">{row.patient.visionDefect}</TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </TableContainer>
  );
};

export default Rack;
