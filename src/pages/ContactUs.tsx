import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CodeIcon from "@mui/icons-material/Code";
import PaletteIcon from "@mui/icons-material/Palette";
import HubIcon from "@mui/icons-material/Hub";
import WebIcon from "@mui/icons-material/Web";
import StorageIcon from "@mui/icons-material/Storage";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MessageIcon from "@mui/icons-material/Message";
import StarIcon from "@mui/icons-material/Star";

import karaboImg from "../assets/team/karabo.jpg";
import mphoImg from "../assets/team/mpho.jpg";
import mohofeImg from "../assets/team/mohofe.jpg";
import siyandaImg from "../assets/team/siyanda.jpg";
import zwivhuyaImg from "../assets/team/zwivhuya.jpg";

type TeamMember = {
  name: string;
  role: string;
  phone: string;
  email?: string;
  github?: string;
  linkedin?: string;
  image: string;
  accent: string;
  bio: string;
  skills: string[];
};

const teamMembers: TeamMember[] = [
  {
    name: "Mr Kgaphola Karabo",
    role: "Tech Lead & Full Stack Developer",
    phone: "081 525 2702",
    image: karaboImg,
    accent: "#16a34a",
    bio: "Karabo leads the technical direction of the project and helps ensure the team delivers a scalable, maintainable, and high-quality solution. He contributes across frontend and backend development, supports architecture decisions, guides implementation standards, and helps align the team around performance, reliability, and delivery excellence.",
    skills: ["Leadership", "Architecture", "Full Stack", "System Design"],
  },
  {
    name: "Mr Khaphathe Mpho",
    role: "Full Stack Developer",
    phone: "082 705 6724",
    email: "khaphathempho@gmail.com",
    github: "https://github.com/khaphathe",
    linkedin:
      "https://www.linkedin.com/in/mpho-khaphathe-9a3b412b1?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    image: mphoImg,
    accent: "#22c55e",
    bio: "Mpho contributes across the full application stack, building features that connect user-facing experiences with backend services and database processes. He focuses on clean integration, dependable functionality, and strong collaboration between interface logic, server operations, and data handling to keep the product stable and user-focused.",
    skills: ["Full Stack", "APIs", "Database", "Integration"],
  },
  {
    name: "Mr Motikoni Mohofe",
    role: "UI Designer",
    phone: "064 706 5713",
    email: "motikonisimon@gmail.com",
    github: "https://github.com/Motikoni012",
    linkedin:
      "https://www.linkedin.com/in/motikoni-simon-b122ba395?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    image: mohofeImg,
    accent: "#15803d",
    bio: "Mohofe is responsible for shaping the visual and interaction experience of the product. He focuses on intuitive layouts, consistency, clarity, and modern presentation, helping turn product goals into interfaces that feel polished, user-friendly, and professionally crafted.",
    skills: ["UI Design", "UX Thinking", "Visual Design", "Prototyping"],
  },
  {
    name: "Mr Mhlongo Siyanda",
    role: "Frontend Developer",
    phone: "067 776 7134",
    email: "syaonmhlongo100@gmail.com",
    github: "https://github.com/Mr-Mhlongo",
    linkedin:
      "https://www.linkedin.com/in/siyanda-mhlongo-onele?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    image: siyandaImg,
    accent: "#16a34a",
    bio: "Siyanda builds responsive, interactive, and user-focused frontend experiences. He transforms design concepts into polished interfaces while paying close attention to accessibility, responsiveness, usability, and visual consistency so the final experience feels smooth, engaging, and production-ready.",
    skills: ["React", "Frontend", "Responsive UI", "User Experience"],
  },
  {
    name: "Ms Sagida Zwivhuya",
    role: "Backend Developer",
    phone: "082 057 8495",
    image: zwivhuyaImg,
    accent: "#22c55e",
    bio: "Zwivhuya works on the backend systems that power the application, including APIs, business logic, and data processes. She focuses on dependable services that support security, performance, and clean communication between frontend and backend layers, helping keep the product robust and reliable.",
    skills: ["Backend", "APIs", "Data Flow", "Reliability"],
  },
];

const firstRow = teamMembers.slice(0, 2);
const secondRow = teamMembers.slice(2, 4);
const lastRow = teamMembers.slice(4);

function toTel(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

function toWhatsApp(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const localToIntl = digits.startsWith("0") ? `27${digits.slice(1)}` : digits;
  return `https://wa.me/${localToIntl}`;
}

function hasValue(v?: string) {
  return Boolean(v && v.trim().length > 0);
}

const ui = {
  heroBg: {
    background:
      "linear-gradient(135deg, #16a34a 0%, #22c55e 45%, #4ade80 100%)",
  },
  heroButtonPrimary: {
    bgcolor: "#ffffff",
    color: "#166534",
    px: 3,
    py: 1.2,
    borderRadius: "14px",
    fontWeight: 700,
    textTransform: "none",
    boxShadow: "none",
    "&:hover": {
      bgcolor: "#f8fafc",
      boxShadow: "none",
    },
  },
  heroButtonOutline: {
    color: "white",
    borderColor: "rgba(255,255,255,0.45)",
    px: 3,
    py: 1.2,
    borderRadius: "14px",
    fontWeight: 700,
    textTransform: "none",
    "&:hover": {
      borderColor: "#ffffff",
      bgcolor: "rgba(255,255,255,0.08)",
    },
  },
  card: {
    height: "100%",
    borderRadius: "24px",
    border: "1px solid #e5e7eb",
    overflow: "hidden",
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)",
    },
  },
  socialButton: {
    bgcolor: "#f8fafc",
    border: "1px solid #e2e8f0",
    transition: "all 0.2s ease",
    "&:hover": {
      bgcolor: "#f1f5f9",
      transform: "translateY(-1px)",
    },
  },
};

function SocialIcon({
  href,
  icon,
  label,
  disabled = false,
}: {
  href?: string;
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
}) {
  return (
    <Tooltip title={disabled ? `${label} not available` : label}>
      <span>
        <IconButton
          component={disabled ? "button" : "a"}
          href={!disabled ? href : undefined}
          target={!disabled ? "_blank" : undefined}
          rel={!disabled ? "noopener noreferrer" : undefined}
          disabled={disabled}
          sx={ui.socialButton}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
}

function TeamCard({
  member,
  single = false,
}: {
  member: TeamMember;
  single?: boolean;
}) {
  return (
    <Card elevation={0} sx={ui.card}>
      <Box
        sx={{
          height: single ? 140 : 110,
          background: `linear-gradient(135deg, ${member.accent} 0%, #86efac 100%)`,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            right: -16,
            top: -18,
            width: 100,
            height: 100,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.12)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            left: 16,
            bottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "white",
          }}
        >
          <StarIcon sx={{ fontSize: 18 }} />
          <Typography sx={{ fontWeight: 700, fontSize: "0.9rem" }}>
            Team Member
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ px: 3, pb: 3.5, pt: 0 }}>
        <Stack alignItems="center" sx={{ mt: -5.5 }}>
          <Avatar
            src={member.image}
            alt={member.name}
            sx={{
              width: single ? 120 : 108,
              height: single ? 120 : 108,
              border: "4px solid white",
              boxShadow: "0 8px 22px rgba(15, 23, 42, 0.12)",
            }}
          />
        </Stack>

        <Box textAlign="center" sx={{ mt: 2 }}>
          <Typography
            variant={single ? "h5" : "h6"}
            sx={{ fontWeight: 800, color: "#0f172a" }}
          >
            {member.name}
          </Typography>

          <Typography
            sx={{
              color: member.accent,
              fontWeight: 700,
              mt: 0.5,
              mb: 1.5,
              fontSize: single ? "1rem" : "0.95rem",
            }}
          >
            {member.role}
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              lineHeight: 1.8,
              fontSize: single ? "1rem" : "0.95rem",
              minHeight: single ? "unset" : 148,
              maxWidth: single ? "860px" : "unset",
              mx: "auto",
            }}
          >
            {member.bio}
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          flexWrap="wrap"
          justifyContent="center"
          sx={{ mt: 2.5 }}
        >
          {member.skills.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              size="small"
              sx={{
                bgcolor: `${member.accent}12`,
                color: member.accent,
                fontWeight: 700,
                borderRadius: "10px",
              }}
            />
          ))}
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
          sx={{
            mt: 2.5,
            mb: 2,
            py: 1.3,
            px: 2,
            borderRadius: "14px",
            bgcolor: "#f8fafc",
            border: "1px solid #e2e8f0",
          }}
        >
          <PhoneIcon sx={{ color: member.accent, fontSize: 20 }} />
          <Typography
            sx={{
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            {member.phone}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          justifyContent="center"
          spacing={1.3}
          sx={{ mt: 1.5 }}
        >
          <SocialIcon
            href={toTel(member.phone)}
            icon={<PhoneIcon fontSize="small" />}
            label="Call"
          />

          <SocialIcon
            href={toWhatsApp(member.phone)}
            icon={<WhatsAppIcon fontSize="small" />}
            label="WhatsApp"
          />

          <SocialIcon
            href={member.email ? `mailto:${member.email}` : undefined}
            icon={<EmailOutlinedIcon fontSize="small" />}
            label="Email"
            disabled={!member.email}
          />

          <SocialIcon
            href={member.linkedin}
            icon={<LinkedInIcon fontSize="small" />}
            label="LinkedIn"
            disabled={!hasValue(member.linkedin)}
          />

          <SocialIcon
            href={member.github}
            icon={<GitHubIcon fontSize="small" />}
            label="GitHub"
            disabled={!hasValue(member.github)}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}

function FloatingContactBar() {
  return (
    <Box
      sx={{
        position: "fixed",
        right: { xs: 14, md: 24 },
        bottom: { xs: 14, md: 24 },
        zIndex: 1200,
      }}
    >
      <Stack spacing={1.2} alignItems="flex-end">
        <Tooltip title="Chat Siyanda on WhatsApp">
          <IconButton
            component="a"
            href={toWhatsApp("067 776 7134")}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              width: 54,
              height: 54,
              bgcolor: "#22c55e",
              color: "white",
              boxShadow: "0 12px 24px rgba(34, 197, 94, 0.28)",
              "&:hover": { bgcolor: "#16a34a" },
            }}
          >
            <WhatsAppIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Call Mpho">
          <IconButton
            component="a"
            href={toTel("082 705 6724")}
            sx={{
              width: 46,
              height: 46,
              bgcolor: "white",
              border: "1px solid #e2e8f0",
              boxShadow: "0 8px 18px rgba(15, 23, 42, 0.1)",
              "&:hover": { bgcolor: "#f8fafc" },
            }}
          >
            <PhoneIcon sx={{ color: "#16a34a" }} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Back to top">
          <IconButton
            component="a"
            href="#top"
            sx={{
              width: 46,
              height: 46,
              bgcolor: "white",
              border: "1px solid #e2e8f0",
              boxShadow: "0 8px 18px rgba(15, 23, 42, 0.1)",
              "&:hover": { bgcolor: "#f8fafc" },
            }}
          >
            <KeyboardArrowUpIcon sx={{ color: "#16a34a" }} />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
}

export default function ContactUs() {
  return (
    <Box id="top" sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <Box sx={{ ...ui.heroBg, position: "relative", overflow: "hidden" }}>
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 10, md: 14 }, position: "relative", zIndex: 1 }}>
            <Chip
              icon={<Groups2OutlinedIcon style={{ color: "white" }} />}
              label="Our Professional Team"
              sx={{
                mb: 3,
                color: "white",
                bgcolor: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.2)",
                fontWeight: 700,
              }}
            />

            <Typography
              variant="h2"
              sx={{
                color: "white",
                fontWeight: 900,
                lineHeight: 1.08,
                mb: 2,
                fontSize: { xs: "2.4rem", md: "4rem" },
                maxWidth: "820px",
              }}
            >
              Contact Our Team
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.95)",
                fontSize: { xs: "1rem", md: "1.1rem" },
                lineHeight: 1.9,
                maxWidth: "780px",
                mb: 4,
              }}
            >
              We are a collaborative team focused on building thoughtful,
              reliable, and modern digital solutions. Our strengths cover
              technical leadership, full stack engineering, frontend
              development, backend architecture, and user interface design.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                href="#team"
                sx={ui.heroButtonPrimary}
              >
                Meet the Team
              </Button>

              <Button
                variant="outlined"
                href="#contact-info"
                sx={ui.heroButtonOutline}
              >
                Contact Details
              </Button>
            </Stack>
          </Box>
        </Container>

        <Box
          sx={{
            position: "absolute",
            right: -40,
            top: -30,
            width: 220,
            height: 220,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.08)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            left: 28,
            bottom: -40,
            width: 150,
            height: 150,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.08)",
          }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        <Box sx={{ mb: 6 }} id="team">
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: "#0f172a", mb: 1 }}
          >
            Meet Our Team
          </Typography>
          <Typography
            sx={{
              color: "#475569",
              maxWidth: "820px",
              lineHeight: 1.85,
            }}
          >
            Our team combines technical strategy, creative design, and software
            engineering to deliver a complete product experience. Each member
            contributes a unique strength that supports quality, collaboration,
            and dependable execution.
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          {firstRow.map((member) => (
            <Grid  size={{ xs: 12, md: 6 }} key={member.name}>
              <TeamCard member={member} />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          {secondRow.map((member) => (
            <Grid  size={{ xs: 12, md: 6 }} key={member.name}>
              <TeamCard member={member} />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {lastRow.map((member) => (
            <Grid  size={{ xs: 12, md: 6 }} key={member.name}>
              <TeamCard member={member} single />
            </Grid>
          ))}
        </Grid>

        <Box id="contact-info" sx={{ mt: { xs: 8, md: 10 } }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
            }}
          >
            <Grid container>
              <Grid  size={{ xs: 12, md: 7 }}>
                <Box sx={{ p: { xs: 3, md: 5 }, bgcolor: "#ffffff" }}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 800, color: "#0f172a", mb: 1.5 }}
                  >
                    Let’s Connect
                  </Typography>

                  <Typography
                    sx={{
                      color: "#475569",
                      lineHeight: 1.9,
                      mb: 4,
                      maxWidth: "680px",
                    }}
                  >
                    We welcome collaboration, design consultations, software
                    development opportunities, and product discussions. You can
                    contact the most relevant team member directly based on
                    their role, or use the available professional links and
                    WhatsApp shortcuts for faster communication.
                  </Typography>

                  <Stack spacing={3}>
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: "#0f172a",
                          mb: 1,
                        }}
                      >
                        Team Focus
                      </Typography>
                      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                        <Chip icon={<HubIcon />} label="Technical Leadership" />
                        <Chip icon={<CodeIcon />} label="Full Stack Development" />
                        <Chip icon={<WebIcon />} label="Frontend Development" />
                        <Chip icon={<StorageIcon />} label="Backend Development" />
                        <Chip icon={<PaletteIcon />} label="UI Design" />
                      </Stack>
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: "#0f172a",
                          mb: 1,
                        }}
                      >
                        Availability
                      </Typography>
                      <Typography sx={{ color: "#64748b", lineHeight: 1.85 }}>
                        Available for product collaboration, development work,
                        technical discussions, interface design conversations,
                        and implementation support.
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: "#0f172a",
                          mb: 1,
                        }}
                      >
                        Quick Contact Options
                      </Typography>
                      <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
                        <Button
                          component="a"
                          href={toWhatsApp("081 525 2702")}
                          target="_blank"
                          rel="noopener noreferrer"
                          startIcon={<WhatsAppIcon />}
                          variant="contained"
                          sx={{
                            bgcolor: "#16a34a",
                            borderRadius: "14px",
                            fontWeight: 700,
                            textTransform: "none",
                            boxShadow: "none",
                            "&:hover": { bgcolor: "#15803d", boxShadow: "none" },
                          }}
                        >
                          WhatsApp Karabo
                        </Button>

                        <Button
                          component="a"
                          href={toWhatsApp("082 705 6724")}
                          target="_blank"
                          rel="noopener noreferrer"
                          startIcon={<MessageIcon />}
                          variant="outlined"
                          sx={{
                            borderRadius: "14px",
                            fontWeight: 700,
                            textTransform: "none",
                            color: "#16a34a",
                            borderColor: "#16a34a",
                          }}
                        >
                          Message Mpho
                        </Button>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              </Grid>

              <Grid  size={{ xs: 12, md: 5 }}>
                <Box
                  sx={{
                    height: "100%",
                    p: { xs: 3, md: 5 },
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    background:
                      "linear-gradient(135deg, #15803d 0%, #22c55e 100%)",
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5 }}>
                    Professional. Creative. Reliable.
                  </Typography>

                  <Typography sx={{ lineHeight: 1.9, opacity: 0.96, mb: 3 }}>
                    Our team is committed to quality work, clean design,
                    dependable development, and strong collaboration. Every
                    contribution is focused on delivering a refined and
                    effective final product.
                  </Typography>

                  <Divider
                    sx={{
                      borderColor: "rgba(255,255,255,0.18)",
                      mb: 3,
                    }}
                  />

                  <Stack spacing={1.5}>
                    {[
                      "Tech Leadership",
                      "Full Stack Engineering",
                      "Frontend & Backend Solutions",
                      "User Interface Design",
                    ].map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        sx={{
                          bgcolor: "rgba(255,255,255,0.14)",
                          color: "white",
                          width: "fit-content",
                          fontWeight: 700,
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Container>

      <FloatingContactBar />
    </Box>
  );
}