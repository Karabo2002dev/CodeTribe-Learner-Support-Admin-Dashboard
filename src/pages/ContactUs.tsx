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
          sx={{
            bgcolor: "#f1f5f9",
            border: "1px solid #e2e8f0",
            transition: "all 0.25s ease",
            "&:hover": {
              bgcolor: "#e2e8f0",
              transform: "translateY(-2px)",
            },
          }}
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
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: "30px",
        border: "1px solid #dbe7dd",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%)",
        boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
        transition: "all 0.35s ease",
        animation: "fadeInUp 0.7s ease both",
        "@keyframes fadeInUp": {
          "0%": { opacity: 0, transform: "translateY(18px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 24px 60px rgba(15, 23, 42, 0.14)",
        },
      }}
    >
      <Box
        sx={{
          height: single ? 145 : 120,
          background: `linear-gradient(135deg, ${member.accent} 0%, #86efac 100%)`,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            right: -18,
            top: -10,
            width: 110,
            height: 110,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.12)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            left: 18,
            bottom: 14,
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
        <Stack alignItems="center" sx={{ mt: -6 }}>
          <Avatar
            src={member.image}
            alt={member.name}
            sx={{
              width: single ? 126 : 116,
              height: single ? 126 : 116,
              border: "4px solid white",
              boxShadow: "0 12px 28px rgba(0,0,0,0.16)",
            }}
          />
        </Stack>

        <Box textAlign="center" sx={{ mt: 2 }}>
          <Typography
            variant={single ? "h5" : "h6"}
            sx={{ fontWeight: 900, color: "#0f172a" }}
          >
            {member.name}
          </Typography>

          <Typography
            sx={{
              color: member.accent,
              fontWeight: 800,
              mt: 0.5,
              mb: 1.5,
              fontSize: single ? "1rem" : "0.98rem",
            }}
          >
            {member.role}
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              lineHeight: 1.9,
              fontSize: single ? "1rem" : "0.95rem",
              minHeight: single ? "unset" : 155,
              maxWidth: single ? "900px" : "unset",
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
            borderRadius: "16px",
            bgcolor: "#f8fafc",
            border: "1px solid #e2e8f0",
          }}
        >
          <PhoneIcon sx={{ color: member.accent, fontSize: 20 }} />
          <Typography
            sx={{
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "0.2px",
            }}
          >
            {member.phone}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          justifyContent="center"
          spacing={1.4}
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
              boxShadow: "0 12px 28px rgba(34, 197, 94, 0.35)",
              animation: "floatPulse 2.5s ease-in-out infinite",
              "@keyframes floatPulse": {
                "0%, 100%": { transform: "translateY(0)", boxShadow: "0 12px 28px rgba(34, 197, 94, 0.35)" },
                "50%": { transform: "translateY(-4px)", boxShadow: "0 16px 34px rgba(34, 197, 94, 0.5)" },
              },
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
              width: 48,
              height: 48,
              bgcolor: "white",
              border: "1px solid #dbe7dd",
              boxShadow: "0 10px 24px rgba(15, 23, 42, 0.12)",
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
              width: 48,
              height: 48,
              bgcolor: "white",
              border: "1px solid #dbe7dd",
              boxShadow: "0 10px 24px rgba(15, 23, 42, 0.12)",
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
    <Box id="top" className="min-h-screen bg-slate-50">
      {/* Hero */}
      <Box className="relative overflow-hidden bg-green-500">
        <Container maxWidth="lg">
          <Box className="py-16 md:py-24 relative z-10">
            <Chip
              icon={<Groups2OutlinedIcon style={{ color: "white" }} />}
              label="Our Professional Team"
              sx={{
                mb: 3,
                color: "white",
                bgcolor: "rgba(255,255,255,0.15)",
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
                fontSize: { xs: "1rem", md: "1.15rem" },
                lineHeight: 1.95,
                maxWidth: "790px",
                mb: 4,
              }}
            >
              We are a collaborative team of professionals focused on building
              thoughtful, reliable, and modern digital solutions. Our strengths
              cover technical leadership, full stack engineering, frontend
              development, backend architecture, and user interface design.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                href="#team"
                sx={{
                  bgcolor: "white",
                  color: "#16a34a",
                  px: 3,
                  py: 1.2,
                  borderRadius: "16px",
                  fontWeight: 800,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                  "&:hover": {
                    bgcolor: "#f8fafc",
                  },
                }}
              >
                Meet the Team
              </Button>

              <Button
                variant="outlined"
                href="#contact-info"
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.45)",
                  px: 3,
                  py: 1.2,
                  borderRadius: "16px",
                  fontWeight: 700,
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                Contact Details
              </Button>
            </Stack>
          </Box>
        </Container>

        <Box className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-white/10" />
        <Box className="absolute -bottom-12 left-8 w-40 h-40 rounded-full bg-white/10" />
      </Box>

      <Container maxWidth="lg" className="py-12 md:py-16">
        {/* Intro */}
        <Box className="mb-10" id="team">
          <Typography
            variant="h4"
            sx={{ fontWeight: 900, color: "#0f172a", mb: 1 }}
          >
            Meet Our Team
          </Typography>
          <Typography
            sx={{
              color: "#475569",
              maxWidth: "820px",
              lineHeight: 1.9,
            }}
          >
            Our team combines technical strategy, creative design, and software
            engineering to deliver a complete product experience. Each member
            contributes a unique strength that supports quality, collaboration,
            and dependable execution.
          </Typography>
        </Box>

        {/* Row 1 */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {firstRow.map((member) => (
            <Grid item xs={12} md={6} key={member.name}>
              <TeamCard member={member} />
            </Grid>
          ))}
        </Grid>

        {/* Row 2 */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {secondRow.map((member) => (
            <Grid item xs={12} md={6} key={member.name}>
              <TeamCard member={member} />
            </Grid>
          ))}
        </Grid>

        {/* Row 3 */}
        <Grid container spacing={3}>
          {lastRow.map((member) => (
            <Grid item xs={12} key={member.name}>
              <TeamCard member={member} single />
            </Grid>
          ))}
        </Grid>

        {/* Contact Summary */}
        <Box id="contact-info" className="mt-14 md:mt-16">
          <Card
            elevation={0}
            sx={{
              borderRadius: "32px",
              overflow: "hidden",
              border: "1px solid #dcfce7",
              boxShadow: "0 18px 40px rgba(22, 163, 74, 0.08)",
            }}
          >
            <Grid container>
              <Grid item xs={12} md={7}>
                <Box className="p-8 md:p-12 bg-white">
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 900, color: "#0f172a", mb: 1.5 }}
                  >
                    Let’s Connect
                  </Typography>

                  <Typography
                    sx={{
                      color: "#475569",
                      lineHeight: 1.95,
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
                          fontWeight: 800,
                          color: "#0f172a",
                          mb: 0.8,
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
                          fontWeight: 800,
                          color: "#0f172a",
                          mb: 0.8,
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
                          fontWeight: 800,
                          color: "#0f172a",
                          mb: 0.8,
                        }}
                      >
                        Quick Contact Options
                      </Typography>
                      <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
                        <Button
                          component="a"
                          href={toWhatsApp("067 776 7134")}
                          target="_blank"
                          rel="noopener noreferrer"
                          startIcon={<WhatsAppIcon />}
                          variant="contained"
                          sx={{
                            bgcolor: "#16a34a",
                            borderRadius: "14px",
                            fontWeight: 700,
                            "&:hover": { bgcolor: "#15803d" },
                          }}
                        >
                          WhatsApp Karabo
                        </Button>

                        <Button
                          component="a"
                          href={toWhatsApp("0815252702")}
                          target="_blank"
                          rel="noopener noreferrer"
                          startIcon={<MessageIcon />}
                          variant="outlined"
                          sx={{
                            borderRadius: "14px",
                            fontWeight: 700,
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

              <Grid item xs={12} md={5}>
                <Box className="bg-green-500 h-full p-8 md:p-12 text-white flex flex-col justify-center">
                  <Typography variant="h5" sx={{ fontWeight: 900, mb: 1.5 }}>
                    Professional. Creative. Reliable.
                  </Typography>

                  <Typography sx={{ lineHeight: 1.95, opacity: 0.96, mb: 3 }}>
                    Our team is committed to quality work, clean design,
                    dependable development, and strong collaboration. Every
                    contribution is focused on delivering a refined and
                    effective final product.
                  </Typography>

                  <Divider sx={{ borderColor: "rgba(255,255,255,0.18)", mb: 3 }} />

                  <Stack spacing={1.5}>
                    <Chip
                      label="Tech Leadership"
                      sx={{
                        bgcolor: "rgba(255,255,255,0.14)",
                        color: "white",
                        width: "fit-content",
                        fontWeight: 700,
                      }}
                    />
                    <Chip
                      label="Full Stack Engineering"
                      sx={{
                        bgcolor: "rgba(255,255,255,0.14)",
                        color: "white",
                        width: "fit-content",
                        fontWeight: 700,
                      }}
                    />
                    <Chip
                      label="Frontend & Backend Solutions"
                      sx={{
                        bgcolor: "rgba(255,255,255,0.14)",
                        color: "white",
                        width: "fit-content",
                        fontWeight: 700,
                      }}
                    />
                    <Chip
                      label="User Interface Design"
                      sx={{
                        bgcolor: "rgba(255,255,255,0.14)",
                        color: "white",
                        width: "fit-content",
                        fontWeight: 700,
                      }}
                    />
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