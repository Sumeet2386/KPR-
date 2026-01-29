import {
  Card,
  Typography,
  Chip,
  Stack,
} from "@mui/material";

const ResultCard = ({ result }) => {
  if (!result) return null;

  const { mediaType, decision } = result;
  const isVerified = decision.status.toLowerCase().includes("verified");

  return (
    <Card
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 3,
        background: isVerified
          ? "linear-gradient(135deg, #052e16, #14532d)"
          : "linear-gradient(135deg, #450a0a, #7f1d1d)",
        boxShadow: "0 0 25px rgba(0,0,0,0.6)",
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h6" sx={{ color: "#f8fafc" }}>
          Verification Result
        </Typography>

        <Chip
          label={decision.status}
          color={isVerified ? "success" : "error"}
          sx={{ width: "fit-content", fontWeight: 600 }}
        />

        <Typography sx={{ color: "#f8fafc" }}>
          <strong>Media Type:</strong> {mediaType}
        </Typography>

        <Typography sx={{ color: "#f8fafc" }}>
          <strong>Confidence:</strong> {decision.confidence}
        </Typography>

        <Typography sx={{ color: "#f8fafc" }}>
          <strong>Analysis Details:</strong>
        </Typography>

        <ul>
          {decision.reasons.map((r, i) => (
            <li key={i} style={{ color: "#e5e7eb" }}>
              {r}
            </li>
          ))}
        </ul>
      </Stack>
    </Card>
  );
};

export default ResultCard;
