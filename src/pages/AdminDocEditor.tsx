import { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
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

type QA = { question: string; answer: string };

type Section = { id: string; title: string; qas: QA[] };

type RagDoc = {
  docKey: string;
  title: string;
  version: number;
  updatedAt?: string;
  sections: Section[];
};

const DEFAULT_DOCKEY = "latest.json";

function makeId(prefix = "sec") {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
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
      const { data } = await axios.get(`/admin/doc`, {
        params: { docKey: key },
        headers: { Accept: "application/json" },
      });

      setDoc(data.content as RagDoc);
      showSnack("success", "Document loaded ✅");
    } catch (e: any) {
      const msg =
        e?.response?.data?.error || e?.message || "Failed to load document";

      setError(msg);
      setDoc(null);
      showSnack("error", msg);
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
        `/admin/doc`,
        { docKey: docKey.trim(), content: doc },
        { headers: { "Content-Type": "application/json" } },
      );

      setSuccessMsg("Saved successfully ✅");
      showSnack("success", "Saved successfully ✅");

      await loadDoc(docKey.trim());
    } catch (e: any) {
      const msg =
        e?.response?.data?.error || e?.message || "Failed to save document";

      setError(msg);
      showSnack("error", msg);
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    loadDoc(DEFAULT_DOCKEY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setDoc({ ...doc, sections: [...doc.sections, newSection] });
  }

  function deleteSection(sectionIndex: number) {
    if (!doc) return;
    setDoc({
      ...doc,
      sections: doc.sections.filter((_, i) => i !== sectionIndex),
    });
  }

  function updateSectionTitle(sectionIndex: number, title: string) {
    if (!doc) return;
    setDoc({
      ...doc,
      sections: doc.sections.map((s, i) =>
        i === sectionIndex ? { ...s, title } : s,
      ),
    });
  }

  function addQA(sectionIndex: number) {
    if (!doc) return;
    setDoc({
      ...doc,
      sections: doc.sections.map((s, i) =>
        i !== sectionIndex
          ? s
          : {
              ...s,
              qas: [
                ...s.qas,
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
      sections: doc.sections.map((s, i) =>
        i !== sectionIndex
          ? s
          : { ...s, qas: s.qas.filter((_, j) => j !== qaIndex) },
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
      sections: doc.sections.map((s, i) => {
        if (i !== sectionIndex) return s;
        const qas = s.qas.map((qa, j) =>
          j === qaIndex ? { ...qa, [field]: value } : qa,
        );
        return { ...s, qas };
      }),
    });
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="sticky" elevation={1} sx={{ bgcolor: "#22c55e" }}>
        <Toolbar>
          <HelpOutlineIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Knowledge Base Editor
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              size="small"
              label="docKey"
              value={docKey}
              onChange={(e) => setDocKey(e.target.value)}
              sx={{
                width: 240,
                bgcolor: "white",
                borderRadius: 1,
              }}
            />

            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={() => loadDoc(docKey)}
              disabled={loading}
              sx={{
                borderColor: "#22c55e",
                color: "#22c55e",
                "&:hover": {
                  borderColor: "#16a34a",
                  backgroundColor: "rgba(34,197,94,0.08)",
                },
              }}
            >
              {loading ? "Loading..." : "Load"}
            </Button>

            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={saveDoc}
              disabled={!doc || saving}
              sx={{
                bgcolor: "#22c55e",
                "&:hover": { bgcolor: "#16a34a" },
              }}
            >
              {saving ? "Saving..." : "Save"}
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Edit your RAG knowledge base (sections + Q&amp;A) and save to
          Supabase.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {successMsg && (
          <Alert
            severity="success"
            sx={{
              mb: 2,
              backgroundColor: "rgba(34,197,94,0.1)",
              color: "#166534",
            }}
          >
            {successMsg}
          </Alert>
        )}

        {!doc && !loading && (
          <Alert severity="info">
            No document loaded. Try clicking <b>Load</b>.
          </Alert>
        )}

        {doc && (
          <Grid container spacing={2}>
            {/* LEFT SIDE */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Card variant="outlined">
                <CardContent>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1}
                    alignItems={{ xs: "stretch", sm: "center" }}
                    justifyContent="space-between"
                  >
                    <Box sx={{ flex: 1 }}>
                      <TextField
                        label="Document title"
                        value={doc.title}
                        onChange={(e) =>
                          updateDocField("title", e.target.value)
                        }
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                            borderColor: "#22c55e",
                          },
                        }}
                      />

                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ mt: 1 }}
                        alignItems="center"
                        flexWrap="wrap"
                      >
                        <Chip size="small" label={`Version: ${doc.version}`} />

                        <Chip
                          size="small"
                          variant="outlined"
                          label={`Updated: ${doc.updatedAt || "—"}`}
                        />

                        <Chip
                          size="small"
                          variant="outlined"
                          label={`Sections: ${doc.sections.length}`}
                          sx={{
                            borderColor: "#22c55e",
                            color: "#22c55e",
                          }}
                        />
                      </Stack>
                    </Box>

                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={addSection}
                      sx={{
                        whiteSpace: "nowrap",
                        bgcolor: "#22c55e",
                        "&:hover": { bgcolor: "#16a34a" },
                      }}
                    >
                      Add Section
                    </Button>
                  </Stack>

                  <Divider sx={{ my: 2 }} />

                  <Stack spacing={2}>
                    {doc.sections.map((section, sIndex) => (
                      <Card
                        key={section.id}
                        variant="outlined"
                        sx={{
                          borderLeft: "4px solid #22c55e",
                        }}
                      >
                        <CardContent>
                          <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={1}
                            alignItems={{ xs: "stretch", sm: "center" }}
                          >
                            <TextField
                              label="Section title"
                              value={section.title}
                              onChange={(e) =>
                                updateSectionTitle(sIndex, e.target.value)
                              }
                              fullWidth
                              sx={{
                                "& .MuiOutlinedInput-root.Mui-focused fieldset":
                                  {
                                    borderColor: "#22c55e",
                                  },
                              }}
                            />

                            <Button
                              variant="outlined"
                              startIcon={<AddIcon />}
                              onClick={() => addQA(sIndex)}
                              sx={{
                                whiteSpace: "nowrap",
                                borderColor: "#22c55e",
                                color: "#22c55e",
                                "&:hover": {
                                  borderColor: "#16a34a",
                                  backgroundColor: "rgba(34,197,94,0.08)",
                                },
                              }}
                            >
                              Add Q&amp;A
                            </Button>

                            <Button
                              variant="outlined"
                              color="error"
                              startIcon={<DeleteOutlineIcon />}
                              onClick={() => deleteSection(sIndex)}
                              sx={{ whiteSpace: "nowrap" }}
                            >
                              Delete
                            </Button>
                          </Stack>

                          <Divider sx={{ my: 2 }} />

                          <Stack spacing={2}>
                            {section.qas.map((qa, qIndex) => (
                              <Card
                                key={`${section.id}_${qIndex}`}
                                variant="outlined"
                              >
                                <CardContent>
                                  <TextField
                                    label="Question"
                                    value={qa.question}
                                    onChange={(e) =>
                                      updateQA(
                                        sIndex,
                                        qIndex,
                                        "question",
                                        e.target.value,
                                      )
                                    }
                                    fullWidth
                                    sx={{
                                      "& .MuiOutlinedInput-root.Mui-focused fieldset":
                                        {
                                          borderColor: "#22c55e",
                                        },
                                    }}
                                  />

                                  <TextField
                                    label="Answer"
                                    value={qa.answer}
                                    onChange={(e) =>
                                      updateQA(
                                        sIndex,
                                        qIndex,
                                        "answer",
                                        e.target.value,
                                      )
                                    }
                                    fullWidth
                                    multiline
                                    minRows={4}
                                    sx={{
                                      mt: 2,
                                      "& .MuiOutlinedInput-root.Mui-focused fieldset":
                                        {
                                          borderColor: "#22c55e",
                                        },
                                    }}
                                  />

                                  <Stack
                                    direction="row"
                                    justifyContent="flex-end"
                                    sx={{ mt: 1 }}
                                  >
                                    <Button
                                      variant="outlined"
                                      color="error"
                                      startIcon={<DeleteOutlineIcon />}
                                      onClick={() => deleteQA(sIndex, qIndex)}
                                    >
                                      Delete Q&amp;A
                                    </Button>
                                  </Stack>
                                </CardContent>
                              </Card>
                            ))}
                          </Stack>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* RIGHT SIDE */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Card variant="outlined">
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="subtitle1" fontWeight={700}>
                      JSON Preview
                    </Typography>

                    <Chip
                      size="small"
                      variant="outlined"
                      label="Saved as latest.json"
                      sx={{
                        borderColor: "#22c55e",
                        color: "#22c55e",
                      }}
                    />
                  </Stack>

                  <Box
                    component="pre"
                    sx={{
                      m: 0,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "grey.50",
                      border: "1px solid",
                      borderColor: "#22c55e",
                      overflow: "auto",
                      maxHeight: 720,
                      fontSize: 12,
                      lineHeight: 1.4,
                      fontFamily:
                        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                    }}
                  >
                    {JSON.stringify(doc, null, 2)}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3500}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity={snackSeverity}
          sx={{
            width: "100%",
            ...(snackSeverity === "success" && {
              backgroundColor: "#22c55e",
              color: "white",
            }),
          }}
        >
          {snackText}
        </Alert>
      </Snackbar>
    </Box>
  );
}
