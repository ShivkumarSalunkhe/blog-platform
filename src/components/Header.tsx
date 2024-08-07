import React, { useState, useEffect, MouseEvent } from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useRouter } from "next/router";
import ProfileMenu from "./ProfileMenu";

interface HeaderProps {
  title: string;
}

const sections = [
  { title: "Technology", url: "#" },
  { title: "Design", url: "#" },
  { title: "Culture", url: "#" },
  { title: "Business", url: "#" },
  { title: "Politics", url: "#" },
  { title: "Opinion", url: "#" },
  { title: "Science", url: "#" },
  { title: "Health", url: "#" },
  { title: "Style", url: "#" },
  { title: "Travel", url: "#" },
];

export default function Header(props: HeaderProps) {
  const { title } = props;
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);

  const handleLoginClick = () => {
    router.push("/auth");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setUser(token);
    }
  }, [router]);

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Button size="small">Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        {user ? (
          <ProfileMenu />
        ) : (
          <Button
            variant="outlined"
            size="small"
            sx={{ marginRight: "10px" }}
            onClick={handleLoginClick}
          >
            Login
          </Button>
        )}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </>
  );
}
