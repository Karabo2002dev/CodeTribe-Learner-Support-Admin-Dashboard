import { useEffect,useState, type ChangeEvent } from "react";
import { type AxiosError } from "axios";
import axios from "../api/axios";
import { useAppSelector } from "../store/hook";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
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
import {
  Person as PersonIcon,
  EditOutlined as EditOutlinedIcon,
  DeleteOutline as DeleteOutlineIcon,
  Refresh as RefreshIcon,
  EmailOutlined as EmailOutlinedIcon,
  Phone as PhoneIcon,
  BadgeOutlined as BadgeOutlinedIcon,
} from "@mui/icons-material";

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

const ui = {
  page: "mt-6 w-full",
  panel: "rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] md:p-5",
  sectionTitle: "text-lg font-semibold text-gray-900",
  sectionDesc: "text-sm text-gray-500",
  profileCard: "rounded-2xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]",
  statBadge: "inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700",
  infoRow: "flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3",
};

const mui = {
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      backgroundColor: "#fff",
      "& fieldset": { borderColor: "#d1d5db" },
      "&:hover fieldset": { borderColor: "#9ca3af" },
      "&.Mui-focused fieldset": { borderColor: "#111827" },
    },
  },
  primaryButton: {
    borderRadius: "12px",
    px: 2.5,
    textTransform: "none",
    boxShadow: "none",
    backgroundColor: "#111827",
    "&:hover": { backgroundColor: "#1f2937", boxShadow: "none" },
  },
  outlinedButton: {
    borderRadius: "12px",
    textTransform: "none",
    borderColor: "#d1d5db",
    color: "#374151",
    backgroundColor: "#fff",
    "&:hover": { borderColor: "#d1d5db", backgroundColor: "#f9fafb" },
  },
  dangerButton: {
    borderRadius: "12px",
    textTransform: "none",
  },
  dialogPaper: { borderRadius: "18px" },
};

type InfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className={ui.infoRow}>
      <div className="text-gray-500">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
        <p className="truncate text-sm text-gray-800">{value}</p>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const user = useAppSelector((state) => state.auth.user);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [form, setForm] = useState<ProfilePayload>(emptyForm);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackType, setSnackType] = useState<"success" | "error">("success");
  const [snackMessage, setSnackMessage] = useState("");

  /** Utility to show snackbar */
  function showSnack(type: "success" | "error", message: string) {
    setSnackType(type);
    setSnackMessage(message);
    setSnackOpen(true);
  }

  /** Fetch profile from backend */
  async function fetchProfile() {
    setLoading(true);
    try {
      const res = await axios.get<{ success: boolean; message: string; data: Profile }>(`/users/profile`);
      setProfile(res.data.data);
      console.log("Fetched profile:", res.data.data);
      setForm({
        fullName: res.data.data.fullName,
        email: res.data.data.email,
        phoneNumber: res.data.data.phoneNumber,
      });
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      showSnack("error", error.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  /** Validate form before submission */
  function validateForm(): boolean {
    if (!form.fullName.trim()) { showSnack("error", "Full name is required"); return false; }
    if (!form.email.trim()) { showSnack("error", "Email is required"); return false; }
    if (!form.phoneNumber.trim()) { showSnack("error", "Phone number is required"); return false; }
    return true;
  }

  /** Handle profile update */
  async function handleUpdateProfile() {
    if (!profile || !validateForm()) return;
    setSubmitting(true);
    try {
      const res = await axios.put<{ success: boolean; message: string; data: Profile }>(
        `/users/profile`,
        form
      );
      setProfile(res.data.data);
      showSnack("success", res.data.message || "Profile updated successfully");
      setOpenEditDialog(false);
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      showSnack("error", error.response?.data?.message || "Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  }

  /** Handle profile deletion */
  async function handleDeleteProfile() {
    if (!profile) return;
    setSubmitting(true);
    try {
      const res = await axios.delete<{ success: boolean; message: string }>(`/users/profile`);
      showSnack("success", res.data.message || "Profile deleted successfully");
      setOpenDeleteDialog(false);
      setProfile(null);
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      showSnack("error", error.response?.data?.message || "Failed to delete profile");
    } finally {
      setSubmitting(false);
    }
  }

  /** Display values */
  const displayName = user?.fullname || profile?.fullName || "User";
  const displayEmail = user?.email || profile?.email || "No email";
  const displayPhone = user?.phone_number || profile?.phoneNumber || "No phone number";
  const displayRole = user?.role || "User";

  return (
    <div className={ui.page}>
      <div className={ui.panel}>
        {/* Header */}
        <div className="mb-4 flex flex-col gap-4 border-b border-gray-100 pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className={ui.sectionTitle}>Profile Settings</h2>
            <p className={ui.sectionDesc}>View and manage your personal profile information.</p>
          </div>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchProfile}
            disabled={loading}
            sx={mui.outlinedButton}
          >
            Refresh
          </Button>
        </div>

        {/* Loading / No profile */}
        {loading ? (
          <div className={ui.profileCard}>
            <div className="px-6 py-12 text-center text-sm text-gray-500">Loading profile...</div>
          </div>
        ) : !profile ? (
          <div className={ui.profileCard}>
            <div className="px-6 py-12 text-center text-sm text-gray-500">No profile found.</div>
          </div>
        ) : (
          <Card elevation={0} sx={{ borderRadius: "16px", border: "1px solid #e5e7eb", boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems={{ xs: "flex-start", md: "center" }} justifyContent="space-between">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ width: 72, height: 72, bgcolor: "#f3f4f6", color: "#374151" }}>
                    <PersonIcon sx={{ fontSize: 34 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: "#111827" }}>{displayName}</Typography>
                    <Box sx={{ mt: 1 }}><span className={ui.statBadge}>{displayRole}</span></Box>
                  </Box>
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                  <Button variant="contained" startIcon={<EditOutlinedIcon />} onClick={() => setOpenEditDialog(true)} sx={mui.primaryButton}>Update Profile</Button>
                  <Button variant="outlined" color="error" startIcon={<DeleteOutlineIcon />} onClick={() => setOpenDeleteDialog(true)} sx={mui.dangerButton}>Delete Profile</Button>
                </Stack>
              </Stack>

              <Divider sx={{ my: 3, borderColor: "#f3f4f6" }} />

              <div className="grid gap-3 md:grid-cols-2">
                <InfoItem icon={<EmailOutlinedIcon fontSize="small" />} label="Email" value={displayEmail} />
                <InfoItem icon={<PhoneIcon fontSize="small" />} label="Phone" value={displayPhone} />
                <InfoItem icon={<BadgeOutlinedIcon fontSize="small" />} label="Full Name" value={displayName} />
                <InfoItem icon={<PersonIcon fontSize="small" />} label="Role" value={displayRole} />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Edit Dialog */}
        <Dialog open={openEditDialog} onClose={() => !submitting && setOpenEditDialog(false)} fullWidth maxWidth="sm" PaperProps={{ sx: mui.dialogPaper }}>
          <DialogTitle sx={{ fontWeight: 700 }}>Update Profile</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField label="Full Name" fullWidth value={form.fullName} onChange={(e: ChangeEvent<HTMLInputElement>) => setForm((p) => ({ ...p, fullName: e.target.value }))} sx={mui.textField} />
              <TextField label="Email" type="email" fullWidth value={form.email} onChange={(e: ChangeEvent<HTMLInputElement>) => setForm((p) => ({ ...p, email: e.target.value }))} sx={mui.textField} />
              <TextField label="Phone Number" fullWidth value={form.phoneNumber} onChange={(e: ChangeEvent<HTMLInputElement>) => setForm((p) => ({ ...p, phoneNumber: e.target.value }))} sx={mui.textField} />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button variant="outlined" onClick={() => setOpenEditDialog(false)} disabled={submitting} sx={mui.outlinedButton}>Cancel</Button>
            <Button variant="contained" onClick={handleUpdateProfile} disabled={submitting} sx={mui.primaryButton}>{submitting ? "Updating..." : "Save Changes"}</Button>
          </DialogActions>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={openDeleteDialog} onClose={() => !submitting && setOpenDeleteDialog(false)} fullWidth maxWidth="xs" PaperProps={{ sx: mui.dialogPaper }}>
          <DialogTitle sx={{ fontWeight: 700 }}>Delete Profile</DialogTitle>
          <DialogContent>
            <Typography sx={{ color: "#4b5563" }}>Are you sure you want to delete your profile?</Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button variant="outlined" onClick={() => setOpenDeleteDialog(false)} disabled={submitting} sx={mui.outlinedButton}>Cancel</Button>
            <Button variant="contained" color="error" onClick={handleDeleteProfile} disabled={submitting} sx={{ borderRadius: "12px", textTransform: "none" }}>{submitting ? "Deleting..." : "Delete"}</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar open={snackOpen} autoHideDuration={3500} onClose={() => setSnackOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
          <Alert severity={snackType} onClose={() => setSnackOpen(false)} sx={{ width: "100%", borderRadius: "12px" }}>{snackMessage}</Alert>
        </Snackbar>
      </div>
    </div>
  );
}