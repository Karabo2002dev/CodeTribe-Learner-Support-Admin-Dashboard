import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../store/hook";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";

type Profile = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
};

type ProfilePayload = {
  fullName: string;
  email: string;
  phoneNumber: string;
};

const emptyForm: ProfilePayload = {
  fullName: "",
  email: "",
  phoneNumber: "",
};

export default function SettingsPage() {
  const apiBase = useMemo(() => "/api", []);
  const user = useAppSelector((state) => state.auth.user);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [form, setForm] = useState<ProfilePayload>(emptyForm);

  const [error, setError] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackType, setSnackType] = useState<"success" | "error">("success");
  const [snackMessage, setSnackMessage] = useState("");

  function showSnack(type: "success" | "error", message: string) {
    setSnackType(type);
    setSnackMessage(message);
    setSnackOpen(true);
  }

  async function fetchProfile() {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`${apiBase}/profile`);
      const data = res.data;

      setProfile(data);
      setForm({
        fullName: data.fullName || "",
        email: data.email || "",
        phoneNumber: data.phoneNumber || "",
      });
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to load profile";
      setError(msg);
      showSnack("error", msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  function validateForm() {
    if (!form.fullName.trim()) {
      showSnack("error", "Full name is required");
      return false;
    }
    if (!form.email.trim()) {
      showSnack("error", "Email is required");
      return false;
    }
    if (!form.phoneNumber.trim()) {
      showSnack("error", "Phone number is required");
      return false;
    }
    return true;
  }

  async function handleUpdateProfile() {
    if (!profile) return;
    if (!validateForm()) return;

    setSubmitting(true);

    try {
      await axios.put(`${apiBase}/profile/${profile.id}`, form);
      showSnack("success", "Profile updated successfully");
      setOpenEditDialog(false);
      fetchProfile();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to update profile";
      showSnack("error", msg);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteProfile() {
    if (!profile) return;

    setSubmitting(true);

    try {
      await axios.delete(`${apiBase}/profile/${profile.id}`);
      showSnack("success", "Profile deleted successfully");
      setOpenDeleteDialog(false);
      setProfile(null);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to delete profile";
      showSnack("error", msg);
    } finally {
      setSubmitting(false);
    }
  }

  const displayName = user?.fullname || profile?.fullName || "User";
  const displayEmail = user?.email || profile?.email || "No email";
  const displayPhone = user?.phoneNumber || profile?.phoneNumber || "No phone number";

  return (
    <Box className="min-h-screen bg-slate-50 py-8">
      <Container maxWidth="md">
        <Stack spacing={3}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            spacing={2}
          >
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#0f172a" }}>
                Profile Settings
              </Typography>
              
            </Box>

            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchProfile}
              disabled={loading}
            >
              Refresh
            </Button>
          </Stack>

          {error && <Alert severity="error">{error}</Alert>}

          {loading ? (
            <Card
              elevation={0}
              sx={{
                borderRadius: "24px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.05)",
              }}
            >
              <CardContent sx={{ py: 6 }}>
                <Typography align="center" sx={{ color: "#64748b" }}>
                  Loading profile...
                </Typography>
              </CardContent>
            </Card>
          ) : !profile ? (
            <Card
              elevation={0}
              sx={{
                borderRadius: "24px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.05)",
              }}
            >
              <CardContent sx={{ py: 6 }}>
                <Typography align="center" sx={{ color: "#64748b" }}>
                  No profile found.
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Card
              elevation={0}
              sx={{
                borderRadius: "24px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.05)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={3}
                  alignItems={{ xs: "flex-start", sm: "center" }}
                >
                  <Avatar
                    sx={{
                      width: 90,
                      height: 90,
                      bgcolor: "#dcfce7",
                      color: "#166534",
                    }}
                  >
                    <PersonIcon sx={{ fontSize: 42 }} />
                  </Avatar>

                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 800, color: "#0f172a" }}
                    >
                      {displayName}
                    </Typography>
                    <Typography sx={{ color: "#16a34a", fontWeight: 700, mt: 0.5 }}>
                      {user?.role || "User"}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ my: 3 }} />

                <Stack spacing={2}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <EmailOutlinedIcon sx={{ color: "#64748b" }} />
                    <Typography sx={{ color: "#334155" }}>{displayEmail}</Typography>
                  </Stack>

                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <PhoneIcon sx={{ color: "#64748b" }} />
                    <Typography sx={{ color: "#334155" }}>
                      {user?.phoneNumber}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <BadgeOutlinedIcon sx={{ color: "#64748b" }} />
                    <Typography sx={{ color: "#334155" }}>
                      {user?.fullname|| "No Name"}
                    </Typography>
                  </Stack>

                </Stack>

                <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                  <Button
                    variant="contained"
                    startIcon={<EditOutlinedIcon />}
                    onClick={() => setOpenEditDialog(true)}
                    sx={{
                      bgcolor: "#22c55e",
                      "&:hover": { bgcolor: "#16a34a" },
                    }}
                  >
                    Update Profile
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteOutlineIcon />}
                    onClick={() => setOpenDeleteDialog(true)}
                  >
                    Delete Profile
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          )}

          <Dialog
            open={openEditDialog}
            onClose={() => !submitting && setOpenEditDialog(false)}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle sx={{ fontWeight: 800 }}>Update Profile</DialogTitle>
            <DialogContent>
              <Stack spacing={2} sx={{ pt: 1 }}>
                <TextField
                  label="Full Name"
                  fullWidth
                  value={form.fullName}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, fullName: e.target.value }))
                  }
                />

                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  value={form.email}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                />

                <TextField
                  label="Phone Number"
                  fullWidth
                  value={form.phoneNumber}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, phoneNumber: e.target.value }))
                  }
                />
              </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button
                variant="outlined"
                onClick={() => setOpenEditDialog(false)}
                disabled={submitting}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                onClick={handleUpdateProfile}
                disabled={submitting}
                sx={{
                  bgcolor: "#22c55e",
                  "&:hover": { bgcolor: "#16a34a" },
                }}
              >
                {submitting ? "Updating..." : "Save Changes"}
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openDeleteDialog}
            onClose={() => !submitting && setOpenDeleteDialog(false)}
            fullWidth
            maxWidth="xs"
          >
            <DialogTitle sx={{ fontWeight: 800 }}>Delete Profile</DialogTitle>
            <DialogContent>
              <Typography sx={{ color: "#475569" }}>
                Are you sure you want to delete your profile?
              </Typography>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button
                variant="outlined"
                onClick={() => setOpenDeleteDialog(false)}
                disabled={submitting}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteProfile}
                disabled={submitting}
              >
                {submitting ? "Deleting..." : "Delete"}
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={snackOpen}
            autoHideDuration={3500}
            onClose={() => setSnackOpen(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              severity={snackType}
              onClose={() => setSnackOpen(false)}
              sx={{ width: "100%" }}
            >
              {snackMessage}
            </Alert>
          </Snackbar>
        </Stack>
      </Container>
    </Box>
  );
}