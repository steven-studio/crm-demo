import {
  FormControl,
  InputAdornment,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React from "react";

const CustomSelect = ({
  icon = null,
  placeholder = "Urgency",
  value,
  isDisabled = false,
  children,
  onChange,
  ...props
}) => {
  // Extract label from children based on current value
  const getSelectedLabel = () => {
    const childArray = React.Children.toArray(children);
    const selectedChild = childArray.find(
      (child) => child?.props?.value === value
    );
    return selectedChild?.props?.children || placeholder;
  };

  return (
    <FormControl
      fullWidth
      sx={{
        backgroundColor: "#F9FAFB",
        borderRadius: "8px",
        border: "1px solid #E5E7EB",
        "&:hover": { borderColor: "#D1D5DB" },
        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
      }}
    >
      <Select
        value={value}
        onChange={onChange}
        displayEmpty
        IconComponent={KeyboardArrowDownIcon}
        disabled={isDisabled}
        startAdornment={
          icon && <InputAdornment position="start">{icon}</InputAdornment>
        }
        renderValue={() => (
          <Typography
            variant="body2"
            color={value ? "textPrimary" : "textSecondary"}
          >
            {getSelectedLabel()}
          </Typography>
        )}
        sx={{
          padding: "0px 12px",
          height: "36px",
          color: "#374151",
        }}
        {...props}
      >
        <MenuItem value="" disabled>
          <span style={{ color: "#000", fontSize: "12px" }}>{placeholder}</span>
        </MenuItem>
        {children}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
