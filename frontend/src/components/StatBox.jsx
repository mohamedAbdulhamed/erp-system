import { Box, ButtonBase, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const StatBox = ({ title, subtitle, link, icon, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  return (
    <ButtonBase
      onClick={() => link && navigate(link)}
      sx={{
        width: "100%",
      }}
    >
      <Box width="100%" m="0 30px">
        <Box display="flex" justifyContent="space-between">
          <Box>
            {icon}
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ color: colors.grey[100] }}
            >
              {title}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ArrowForwardIosIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" mt="2px">
          <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
            {subtitle}
          </Typography>
          <Typography
            variant="h5"
            fontStyle="italic"
            sx={{ color: colors.greenAccent[600] }}
          >
            {increase}
          </Typography>
        </Box>
      </Box>
    </ButtonBase>
  );
};

export default StatBox;
