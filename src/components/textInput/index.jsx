import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CustomInputLabel from "../customInputLabel";

function TextInput({
  placeholder,
  name,
  value,
  onChange,
  InputStartIcon,
  type,
  InputEndIcon,
  id,
  fullWidth,
  multiline,
  rows,
  disabled,
  readonly,
  showPassIcon,
  handleClickEndIcon,
  showLabel,
  inputBgColor,
  onKeyDown,
  label,
  sx = {}, // 🟢 sx ko default empty object rakha
  error,
  helperText,
}) {
  const [showPass, setShowPass] = useState(false);

  return (
    <>
      {showLabel && <CustomInputLabel label={showLabel} />}
      <TextField
        id={id}
        label={label}
        type={type === "password" && showPass ? "text" : type}
        variant="outlined"
        size="small"
        fullWidth={fullWidth ?? true}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        multiline={multiline ?? false}
        rows={rows}
        disabled={disabled ?? false}
        onWheel={(e) => e.target.blur()}
        fontFamily={"Poppins"}
        onKeyDown={onKeyDown}
        error={error}
        helperText={helperText}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            fontFamily: "Poppins",
            padding: "0px 16px",
            background: inputBgColor || "white",
            border: "1px solid #E5E7EB",
            transition: "all 0.2s ease",
            
            "&:hover": {
              borderColor: "#1F3C88",
              borderWidth: "1px",
            },
            
            "&.Mui-focused": {
              borderColor: "#1F3C88",
              borderWidth: "2px",
              borderRadius: "8px",
              fontFamily: "Poppins",
              boxShadow: "0 0 0 2px rgba(31, 60, 136, 0.1)",
            },
            
            "& fieldset": {
              border: "none",
            },
          },
          
          "& .MuiInputBase-input": {
            fontSize: "14px",
            color: "#374151",
            "&::placeholder": {
              color: "#9CA3AF",
              opacity: 1,
            },
          },
          
          ...sx,
        }}
        InputProps={{
          readOnly: readonly ?? false,
          startAdornment: InputStartIcon && (
            <InputAdornment position="start" sx={{ mr: 1 }}>
              {InputStartIcon}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                if (showPassIcon) {
                  setShowPass(!showPass);
                } else {
                  handleClickEndIcon && handleClickEndIcon();
                }
              }}
            >
              {showPassIcon ? (
                showPass ? (
                  <VisibilityIcon />
                ) : (
                  <VisibilityOffIcon />
                )
              ) : (
                InputEndIcon
              )}
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}

export default TextInput;
