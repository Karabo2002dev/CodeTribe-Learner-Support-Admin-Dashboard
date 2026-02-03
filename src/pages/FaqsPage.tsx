import {
  Card,
  CardContent,
  Switch,
  IconButton,
  Button,
  TextField,
  Select,
  MenuItem
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";

const FaqsPage = () => {
  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">FAQ’s</h1>

          <div className="flex gap-3">
            <Button variant="outlined" startIcon={<DownloadIcon />} className="!border-green-600 !text-green-600">
              Import from Queries
            </Button>

            <Button variant="contained" startIcon={<AddIcon />} className="!bg-green-600 hover:!bg-green-700">
              Add New FAQ
            </Button>
          </div>
        </div>

        <div className="flex gap-3">
          <TextField placeholder="Search" size="small" fullWidth/>

          <Select size="small" defaultValue="">
            <MenuItem value="">Category</MenuItem>
            <MenuItem value="enrolment">Enrolment</MenuItem>
            <MenuItem value="support">Support</MenuItem>
          </Select>
        </div>

        {[1, 2, 3, 4, 5].map((item, index) => (
          <Card key={item} className={`rounded-xl border ${index === 0 ? "bg-green-50 border-green-400" : "border-gray-200"}`}>
            <CardContent className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">
                  How do I enrol in CodeTribe Academy ?
                </h3>

                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-gray-500">
                    Enrollment
                  </span>

                  <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                    Published
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <IconButton size="small">
                  <EditIcon fontSize="small" />
                </IconButton>

                <IconButton size="small" color="error">
                  <DeleteIcon fontSize="small" />
                </IconButton>

                <Switch defaultChecked color="success" />
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex items-center gap-2 text-sm mt-4">
          <span className="text-gray-500 cursor-pointer">← Previous</span>
          <span className="bg-green-600 text-white px-2 py-1 rounded">1</span>
          <span className="cursor-pointer">2</span>
          <span className="cursor-pointer">3</span>
          <span className="cursor-pointer">…</span>
          <span className="cursor-pointer">68</span>
          <span className="cursor-pointer">Next →</span>
        </div>
      </div>

      <Card className="rounded-xl h-fit">
        <CardContent className="space-y-4">
          <div className="bg-green-600 text-white rounded-lg px-4 py-3 font-medium">
            Chatbot Preview
          </div>

          <div className="space-y-3">
            <div className="bg-green-100 p-3 rounded-lg text-sm w-fit max-w-full">
              How do i enrol in CodeTribe Academy ?
            </div>

            <div className="bg-green-500 text-white p-3 rounded-lg text-sm w-fit ml-auto max-w-full">
              How do i enrol in CodeTribe Academy ?
            </div>
          </div>

          <div className="border-t pt-3">
            <p className="text-sm mb-2">Was it helpful ?</p>

            <div className="flex gap-2">
              <Button variant="contained" className="!bg-green-600 hover:!bg-green-700">
                Yes Thank You
              </Button>

              <Button variant="outlined" className="!border-green-300 !text-green-600">
                No
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FaqsPage;