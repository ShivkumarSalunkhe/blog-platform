import React, { useState, MouseEvent } from "react";
import { Menu, MenuItem, IconButton, Avatar, Typography } from "@mui/material";
import { useRouter } from "next/router";

const ProfileMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const userName =
    typeof window !== "undefined" ? localStorage.getItem("firstName") : null;

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOutClick = () => {
    localStorage.removeItem("token");
    router.push("/");
    handleClose();
  };

  return (
    <>
      <Typography
        component="h6"
        variant="h6"
        color="inherit"
        align="center"
        noWrap
        sx={{ marginRight: "10px" }}
      >
        {userName}
      </Typography>
      <IconButton onClick={handleClick}>
        <Avatar
          alt="careercoach"
          src="https://as1.ftcdn.net/v2/jpg/04/23/59/74/1000_F_423597477_AKCjGMtevfCi9XJG0M8jter97kG466y7.jpg"
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: 2,
          },
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={handleLogOutClick}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
