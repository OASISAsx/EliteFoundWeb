import { Grid } from "@mui/material";
import { StatItem } from "@/src/types/stats.types";
import { StatsCard } from "./CardStatus";

interface Props {
  stats: StatItem[];
}

export const StatsGrid = ({ stats }: Props) => {
  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {stats.map((item, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard item={item} index={i} />
        </Grid>
      ))}
    </Grid>
  );
};
