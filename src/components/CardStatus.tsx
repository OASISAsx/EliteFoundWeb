import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { StatItem } from "@/src/types/stats.types";

interface Props {
  item: StatItem;
  index: number;
}

export const StatsCard = ({ item, index }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card
        sx={{
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          boxShadow: "none",
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="start"
          >
            <Box
              sx={{
                p: 1,
                borderRadius: "10px",
                bgcolor: alpha(item.color, 0.1),
                color: item.color,
              }}
            >
              <item.icon size={18} />
            </Box>

            {item.change && (
              <Typography
                variant="caption"
                sx={{
                  color: "#32d74b",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <TrendingUp size={12} /> {item.change}
              </Typography>
            )}
          </Stack>

          <Box sx={{ mt: 2 }}>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: 500 }}
            >
              {item.title}
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
              {item.value}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};
