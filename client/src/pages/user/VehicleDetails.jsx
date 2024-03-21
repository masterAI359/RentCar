

import Typography from "@mui/material/Typography";

import { useSelector } from "react-redux";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import ButtonBase from "@mui/material/ButtonBase";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const VehicleDetails = () => {
  const { singleVehicleDetail } = useSelector(
    (state) => state.userListVehicles
  );
  

  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={singleVehicleDetail.image} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Model: {singleVehicleDetail.model}
              </Typography>
              <Typography gutterBottom variant="subtitle2" component="div">
                Company: {singleVehicleDetail.company}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Year made : {singleVehicleDetail.year_made}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Transmission : {singleVehicleDetail.transmition}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Seats : {singleVehicleDetail.seats}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: "pointer" }} variant="body2">
                Re
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              $19.00
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default VehicleDetails;

