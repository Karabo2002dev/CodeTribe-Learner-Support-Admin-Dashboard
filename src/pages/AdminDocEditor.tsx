import { useEffect, useState } from "react";
import axios from "../api/axios";

import { isAxiosError, type AxiosError } from "axios";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Snackbar,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

type QA = {
  question: string;
  answer: string;
};

type Section = {
  id: string;
  title: string;
  qas: QA[];
};

type RagDoc = {
  docKey: string;
  title: string;
  version: number;
  updatedAt?: string;
  sections: Section[];
};

type AdminDocResponse = {
  content: RagDoc;
};

type BackendErrorResponse = {
  error?: string;
  details?: string;
  message?: string;
};

const DEFAULT_DOCKEY = "latest.json";

function makeId(prefix = "sec"): string {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<BackendErrorResponse>;
    const backend = axiosError.response?.data;

    if (backend?.error) {
      return `${backend.error}${backend.details ? ` - ${backend.details}` : ""}`;
    }

    if (backend?.message) {
      return backend.message;
    }

    return axiosError.message || fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

function getErrorPayload(error: unknown): BackendErrorResponse | undefined {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<BackendErrorResponse>;
    return axiosError.response?.data;
  }

  return undefined;
}

const ui = {
  page: {
    minHeight: "100vh",
    width: "100%",
    maxWidth: "100vw",
    bgcolor: "#f9fafb",
    overflowX: "hidden",
  },
  shell: {
    width: "100%",
    maxWidth: "100vw",
    px: { xs: 2, md: 3 },
    py: 3,
  },
  appBar: {
    bgcolor: "#ffffff",
    color: "#111827",
    borderBottom: "1px solid #e5e7eb",
  },
  panel: {
    borderRadius: "16px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
  },
  sectionCard: {
    borderRadius: "16px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
  },
  qaCard: {
    borderRadius: "14px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#fcfcfd",
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      backgroundColor: "#ffffff",
      "& fieldset": {
        borderColor: "#d1d5db",
      },
      "&:hover fieldset": {
        borderColor: "#9ca3af",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#111827",
      },
    },
  },
  primaryButton: {
    backgroundColor: "#111827",
    color: "#ffffff",
    borderRadius: "12px",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#1f2937",
      boxShadow: "none",
    },
  },
  outlinedButton: {
    borderColor: "#d1d5db",
    color: "#374151",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    "&:hover": {
      borderColor: "#d1d5db",
      backgroundColor: "#f9fafb",
    },
  },
  chipSoft: {
    borderRadius: "999px",
    bgcolor: "#f3f4f6",
    color: "#374151",
  },
  chipOutline: {
    borderRadius: "999px",
    borderColor: "#d1d5db",
    color: "#6b7280",
  },
  preview: {
    m: 0,
    p: 2,
    borderRadius: "14px",
    bgcolor: "#f9fafb",
    border: "1px solid #e5e7eb",
    overflow: "auto",
    maxHeight: 500,
    fontSize: 12,
    lineHeight: 1.5,
    color: "#374151",
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
};

type HeaderProps = {
  docKey: string;
  setDocKey: (value: string) => void;
  loading: boolean;
  saving: boolean;
  hasDoc: boolean;
  onLoad: () => void;
  onSave: () => void;
};

function Header({
  docKey,
  setDocKey,
  loading,
  saving,
  hasDoc,
  onLoad,
  onSave,
}: HeaderProps) {
  return (
    <AppBar position="sticky" elevation={0} sx={ui.appBar}>
      <Toolbar sx={{ gap: 2, flexWrap: "wrap" }}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ flexGrow: 1, minWidth: 0 }}
        >
          <HelpOutlineIcon sx={{ color: "#6b7280" }} />
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Admin Knowledge Base Editor
            </Typography>
            <Typography variant="body2" sx={{ color: "#6b7280" }}>
              Manage sections and Q&amp;A content for your knowledge base
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          <TextField
            size="small"
            label="docKey"
            value={docKey}
            onChange={(e) => setDocKey(e.target.value)}
            sx={{ width: 240, ...ui.textField }}
          />

          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={onLoad}
            disabled={loading}
            sx={ui.outlinedButton}
          >
            {loading ? "Loading..." : "Load"}
          </Button>

          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={onSave}
            disabled={!hasDoc || saving}
            sx={ui.primaryButton}
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

type QACardProps = {
  qa: QA;
  sectionIndex: number;
  qaIndex: number;
  onUpdate: (
    sectionIndex: number,
    qaIndex: number,
    field: keyof QA,
    value: string,
  ) => void;
  onDelete: (sectionIndex: number, qaIndex: number) => void;
};

function QACard({
  qa,
  sectionIndex,
  qaIndex,
  onUpdate,
  onDelete,
}: QACardProps) {
  return (
    <Card variant="outlined" sx={ui.qaCard}>
      <CardContent sx={{ p: 2 }}>
        <TextField
          label="Question"
          value={qa.question}
          onChange={(e) =>
            onUpdate(sectionIndex, qaIndex, "question", e.target.value)
          }
          fullWidth
          sx={ui.textField}
        />

        <TextField
          label="Answer"
          value={qa.answer}
          onChange={(e) =>
            onUpdate(sectionIndex, qaIndex, "answer", e.target.value)
          }
          fullWidth
          multiline
          minRows={4}
          sx={{ mt: 2, ...ui.textField }}
        />

        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 1.5 }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteOutlineIcon />}
            onClick={() => onDelete(sectionIndex, qaIndex)}
            sx={{ borderRadius: "12px" }}
          >
            Delete Q&amp;A
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

type SectionCardProps = {
  section: Section;
  sectionIndex: number;
  onUpdateTitle: (sectionIndex: number, title: string) => void;
  onAddQA: (sectionIndex: number) => void;
  onDeleteSection: (sectionIndex: number) => void;
  onUpdateQA: (
    sectionIndex: number,
    qaIndex: number,
    field: keyof QA,
    value: string,
  ) => void;
  onDeleteQA: (sectionIndex: number, qaIndex: number) => void;
};

function SectionCard({
  section,
  sectionIndex,
  onUpdateTitle,
  onAddQA,
  onDeleteSection,
  onUpdateQA,
  onDeleteQA,
}: SectionCardProps) {
  return (
    <Card variant="outlined" sx={ui.sectionCard}>
      <CardContent sx={{ p: 2.5 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          alignItems={{ xs: "stretch", sm: "center" }}
        >
          <TextField
            label="Section title"
            value={section.title}
            onChange={(e) => onUpdateTitle(sectionIndex, e.target.value)}
            fullWidth
            sx={ui.textField}
          />

          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => onAddQA(sectionIndex)}
            sx={ui.outlinedButton}
          >
            Add Q&amp;A
          </Button>

          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteOutlineIcon />}
            onClick={() => onDeleteSection(sectionIndex)}
            sx={{ whiteSpace: "nowrap", borderRadius: "12px" }}
          >
            Delete
          </Button>
        </Stack>

        <Divider sx={{ my: 2, borderColor: "#f3f4f6" }} />

        <Stack spacing={2}>
          {section.qas.map((qa, qaIndex) => (
            <QACard
              key={`${section.id}_${qaIndex}`}
              qa={qa}
              sectionIndex={sectionIndex}
              qaIndex={qaIndex}
              onUpdate={onUpdateQA}
              onDelete={onDeleteQA}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

type EditorProps = {
  doc: RagDoc;
  onUpdateTitle: (title: string) => void;
  onAddSection: () => void;
  onUpdateSectionTitle: (sectionIndex: number, title: string) => void;
  onAddQA: (sectionIndex: number) => void;
  onDeleteSection: (sectionIndex: number) => void;
  onUpdateQA: (
    sectionIndex: number,
    qaIndex: number,
    field: keyof QA,
    value: string,
  ) => void;
  onDeleteQA: (sectionIndex: number, qaIndex: number) => void;
};

function Editor({
  doc,
  onUpdateTitle,
  onAddSection,
  onUpdateSectionTitle,
  onAddQA,
  onDeleteSection,
  onUpdateQA,
  onDeleteQA,
}: EditorProps) {
  return (
    <Card variant="outlined" sx={ui.panel}>
      <CardContent sx={{ p: 2.5 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          alignItems={{ xs: "stretch", sm: "center" }}
          justifyContent="space-between"
        >
          <Box sx={{ flex: 1 }}>
            <TextField
              label="Document title"
              value={doc.title}
              onChange={(e) => onUpdateTitle(e.target.value)}
              fullWidth
              sx={ui.textField}
            />

            <Stack
              direction="row"
              spacing={1}
              sx={{ mt: 1.5 }}
              alignItems="center"
              flexWrap="wrap"
            >
              <Chip
                size="small"
                label={`Version: ${doc.version}`}
                sx={ui.chipSoft}
              />
              <Chip
                size="small"
                variant="outlined"
                label={`Updated: ${doc.updatedAt || "—"}`}
                sx={ui.chipOutline}
              />
              <Chip
                size="small"
                variant="outlined"
                label={`Sections: ${doc.sections.length}`}
                sx={ui.chipOutline}
              />
            </Stack>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddSection}
            sx={ui.primaryButton}
          >
            Add Section
          </Button>
        </Stack>

        <Divider sx={{ my: 2, borderColor: "#f3f4f6" }} />

        <Stack spacing={2}>
          {doc.sections.map((section, index) => (
            <SectionCard
              key={section.id}
              section={section}
              sectionIndex={index}
              onUpdateTitle={onUpdateSectionTitle}
              onAddQA={onAddQA}
              onDeleteSection={onDeleteSection}
              onUpdateQA={onUpdateQA}
              onDeleteQA={onDeleteQA}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

type PreviewProps = {
  doc: RagDoc;
  docKey: string;
};

function Preview({ doc, docKey }: PreviewProps) {
  return (
    <Card variant="outlined" sx={ui.panel}>
      <CardContent sx={{ p: 2.5 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography variant="subtitle1" fontWeight={700}>
            JSON Preview
          </Typography>

          <Chip
            size="small"
            variant="outlined"
            label={`Saved as ${docKey}`}
            sx={ui.chipOutline}
          />
        </Stack>

        <Box component="pre" sx={ui.preview}>
          {JSON.stringify(doc, null, 2)}
        </Box>
      </CardContent>
    </Card>
  );
}

export default function AdminDocEditor() {
  const [docKey, setDocKey] = useState(DEFAULT_DOCKEY);
  const [doc, setDoc] = useState<RagDoc | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error">(
    "success",
  );
  const [snackText, setSnackText] = useState("");

  function showSnack(severity: "success" | "error", text: string) {
    setSnackSeverity(severity);
    setSnackText(text);
    setSnackOpen(true);
  }

  async function loadDoc(key = docKey) {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const { data } = await axios.get<AdminDocResponse>("/admin/doc", {
        params: { docKey: key },
        headers: { Accept: "application/json" },
      });

      setDoc(data.content);
      showSnack("success", "Document loaded successfully");
    } catch (error: unknown) {
      const msg = getErrorMessage(error, "Failed to load document");
      const backend = getErrorPayload(error);

      setError(msg);
      setDoc(null);
      showSnack("error", msg);

      console.error("Load error:", backend);
    } finally {
      setLoading(false);
    }
  }

  async function saveDoc() {
    if (!doc) return;

    setSaving(true);
    setError(null);
    setSuccessMsg(null);

    try {
      await axios.post(
        "/admin/doc",
        { docKey: docKey.trim(), content: doc },
        { headers: { "Content-Type": "application/json" } },
      );

      setSuccessMsg("Saved successfully");
      showSnack("success", "Saved successfully");
      await loadDoc(docKey.trim());
    } catch (error: unknown) {
      const msg = getErrorMessage(error, "Failed to save document");
      const backend = getErrorPayload(error);

      setError(msg);
      showSnack("error", msg);

      console.error("Save error:", backend);
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    void loadDoc(DEFAULT_DOCKEY);
  }, []);

  function updateDocField<K extends keyof RagDoc>(key: K, value: RagDoc[K]) {
    if (!doc) return;
    setDoc({ ...doc, [key]: value });
  }

  function addSection() {
    if (!doc) return;

    const newSection: Section = {
      id: makeId("section"),
      title: "New Section",
      qas: [{ question: "New question", answer: "New answer" }],
    };

    setDoc({
      ...doc,
      sections: [...doc.sections, newSection],
    });
  }

  function deleteSection(sectionIndex: number) {
    if (!doc) return;

    setDoc({
      ...doc,
      sections: doc.sections.filter((_, index) => index !== sectionIndex),
    });
  }

  function updateSectionTitle(sectionIndex: number, title: string) {
    if (!doc) return;

    setDoc({
      ...doc,
      sections: doc.sections.map((section, index) =>
        index === sectionIndex ? { ...section, title } : section,
      ),
    });
  }

  function addQA(sectionIndex: number) {
    if (!doc) return;

    setDoc({
      ...doc,
      sections: doc.sections.map((section, index) =>
        index !== sectionIndex
          ? section
          : {
              ...section,
              qas: [
                ...section.qas,
                { question: "New question", answer: "New answer" },
              ],
            },
      ),
    });
  }

  function deleteQA(sectionIndex: number, qaIndex: number) {
    if (!doc) return;

    setDoc({
      ...doc,
      sections: doc.sections.map((section, index) =>
        index !== sectionIndex
          ? section
          : {
              ...section,
              qas: section.qas.filter((_, i) => i !== qaIndex),
            },
      ),
    });
  }

  function updateQA(
    sectionIndex: number,
    qaIndex: number,
    field: keyof QA,
    value: string,
  ) {
    if (!doc) return;

    setDoc({
      ...doc,
      sections: doc.sections.map((section, index) => {
        if (index !== sectionIndex) return section;

        const updatedQAs = section.qas.map((qa, i) =>
          i === qaIndex ? { ...qa, [field]: value } : qa,
        );

        return { ...section, qas: updatedQAs };
      }),
    });
  }

  return (
    <Box sx={ui.page}>
      <Header
        docKey={docKey}
        setDocKey={setDocKey}
        loading={loading}
        saving={saving}
        hasDoc={!!doc}
        onLoad={() => {
          void loadDoc(docKey);
        }}
        onSave={() => {
          void saveDoc();
        }}
      />

      <Box sx={ui.shell}>
        <Box sx={{ ...ui.panel, mb: 3, p: 2.5 }}>
          <Typography variant="body1" sx={{ color: "#4b5563" }}>
            Edit your RAG knowledge base sections and answers, then save the
            latest version to your backend.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: "12px" }}>
            {error}
          </Alert>
        )}

        {successMsg && (
          <Alert severity="success" sx={{ mb: 2, borderRadius: "12px" }}>
            {successMsg}
          </Alert>
        )}

        {!doc && !loading && (
          <Alert severity="info" sx={{ borderRadius: "12px" }}>
            No document loaded. Click <b>Load</b> to fetch a document.
          </Alert>
        )}

        {doc && (
          <Grid
            container
            spacing={2}
            sx={{
              width: "100%",
              m: 0,
            }}
          >
            <Grid size={{ xs: 12 }}>
              <Editor
                doc={doc}
                onUpdateTitle={(title) => updateDocField("title", title)}
                onAddSection={addSection}
                onUpdateSectionTitle={updateSectionTitle}
                onAddQA={addQA}
                onDeleteSection={deleteSection}
                onUpdateQA={updateQA}
                onDeleteQA={deleteQA}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Preview doc={doc} docKey={docKey} />
            </Grid>
          </Grid>
        )}
      </Box>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3500}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity={snackSeverity}
          sx={{ width: "100%", borderRadius: "12px" }}
        >
          {snackText}
        </Alert>
      </Snackbar>
    </Box>
  );
}