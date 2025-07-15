import React, { memo } from "react";
import { Box, Typography, TablePagination } from "@mui/material";
import { Save, Warning } from "@mui/icons-material";
import { SaveButton } from "../StyledComponents/StyledComponents";
import { TableFooterProps } from "./TableFooter.type";
import "./TableFooter.style.css";

const TableFooter: React.FC<TableFooterProps> = ({
  editedCells,
  hasEmptyCell,
  saveChanges,
  dataLength,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <Box className="table-footer">
      <Box className="table-footer-actions">
        <SaveButton
          onClick={saveChanges}
          disabled={editedCells.size === 0 || hasEmptyCell}
        >
          <Save className="save-btn-text" />
          {hasEmptyCell ? "Fill All Cells" : "Save Changes"}
        </SaveButton>
        {hasEmptyCell && (
          <Box className="table-footer-warning">
            <Warning color="warning" fontSize="small" />
            <Typography variant="body2" color="warning.main" fontWeight={600}>
              Please fill all empty cells before saving
            </Typography>
          </Box>
        )}
      </Box>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={dataLength}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        className="table-footer-pagination"
      />
    </Box>
  );
};

export default memo(TableFooter);
