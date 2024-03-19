import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  setEditData,
} from "../../../redux/adminSlices/actions";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { Header } from "../components";
import AddProductModal from "../components/AddProductModal";

function AllVehicles() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAddVehicle = useSelector(
    (state) => state.addVehicle.isAddVehicleClicked
  );

  const [allVehicles, setVehicles] = useState([]);

  

  //show vehicles
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch("/api/admin/showVehicles", {
          method: "GET",
        });
        if (res.ok) {
          const data = await res.json();
          setVehicles(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchVehicles();
  }, [isAddVehicle]);

  //delete a vehicle
  const handleDelete = async (vehicle_id) => {
    try {
      console.log(vehicle_id);
      setVehicles(allVehicles.filter((cur) => cur._id !== vehicle_id));
      await fetch(`/api/admin/deleteVehicle/${vehicle_id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //edit vehicles
  const handleEditVehicle = (vehicle_id) => {
    dispatch(setEditData({ _id: vehicle_id }));
    navigate(`/adminDashboard/editProduct?vehicle_id=${vehicle_id}`);
  };

  return (
    <>
      <div className="w-full d-flex   justify-end text-start items-end p-10">
        <Header title="AllVehicles" />

        <TableContainer
          sx={{
            marginLeft: "auto",
            marginRight: "40px",
            textAlign: "right",
          }}
        >
          <Table aria-label="caption table">
            <caption>A basic table example with a caption</caption>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "red" }}>Image</TableCell>
                <TableCell style={{ color: "red" }}>Register Number</TableCell>
                <TableCell style={{ color: "red" }} align="left">
                  Company
                </TableCell>
                <TableCell style={{ color: "red" }} align="left">
                  name
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allVehicles.map((cur, idx) => (
                <TableRow style={{ color: "black" }} key={idx}>
                  <TableCell>
                    <img
                      key={idx}
                      style={{
                        width: "50px",
                        height: "40px",
                        borderRadius: "5px",
                        objectFit: "cover",
                      }}
                      src={cur.image}
                      id="image"
                    />
                  </TableCell>
                  <TableCell
                    style={{ color: "black" }}
                    component="th"
                    scope="row"
                  >
                    {cur.registeration_number}
                  </TableCell>
                  <TableCell style={{ color: "black" }} align="left">
                    {cur.company}
                  </TableCell>
                  <TableCell style={{ color: "black" }} align="left">
                    {cur.name}
                  </TableCell>
                  <TableCell
                    sx={{ color: "black", padding: 0, align: "right" }}
                  >
                    <Button onClick={() => handleEditVehicle(cur._id)}>
                      <ModeEditOutlineIcon />{" "}
                    </Button>
                    <Button onClick={() => handleDelete(cur._id)}>
                      <DeleteForeverIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* addProduct modal */}
        <AddProductModal />
      </div>
      
    </>
  );
}

export default AllVehicles;
