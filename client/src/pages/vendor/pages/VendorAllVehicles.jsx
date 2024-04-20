import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect} from "react";
import { setEditData } from "../../../redux/adminSlices/actions";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Button } from "@mui/material";
import { Header } from "../../admin/components";
import { DataGrid } from "@mui/x-data-grid";
import toast from "react-hot-toast";

import Box from "@mui/material/Box";
import { setVenodrVehilces } from "../../../redux/vendor/vendorDashboardSlice";
import VendorAddProductModal from "../Components/VendorAddVehilceModal";

const VendorAllVehicles = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAddVehicleClicked } = useSelector((state) => state.addVehicle);
  const { vendorVehilces } = useSelector((state) => state.vendorDashboardSlice);
  const {_id} = useSelector((state)=> state.user.currentUser)
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/vendor/showVendorVehilces",{
          method:'POST',
          headers: {
                          "Content-Type": "application/json",
                        },
          body: JSON.stringify({
            _id,
          }),
        });
        if (!res.ok) {
          console.log("not success");
        }
        const data = await res.json();
        dispatch(setVenodrVehilces(data))
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [_id,dispatch,isAddVehicleClicked]);
  


  //delete a vehicle
  const handleDelete = async (vehicle_id) => {
    try {
      const res = await fetch(`/api/admin/deleteVehicle/${vehicle_id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("deleted", {
          duration: 800,

          style: {
            color: "white",
            background: "#c48080",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //edit vehicles
  const handleEditVehicle = (vehicle_id) => {
    dispatch(setEditData({ _id: vehicle_id }));
    navigate(`/adminDashboard/editProducts?vehicle_id=${vehicle_id}`);
  };
  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          style={{
            width: "50px",
            height: "40px",
            borderRadius: "5px",
            objectFit: "cover",
          }}
          alt="vehicle"
        />
      ),
    },
    {
      field: "registeration_number",
      headerName: "Register Number",
      width: 150,
    },
    { field: "company", headerName: "Company", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <Button onClick={() => handleEditVehicle(params.row.id)}>
          <ModeEditOutlineIcon />
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <Button onClick={() => handleDelete(params.row.id)}>
          <DeleteForeverIcon />
        </Button>
      ),
    },
  ];

  const rows =
    vendorVehilces &&
    vendorVehilces
      .filter((vehicle) => vehicle.isDeleted === "false")
      .map((vehicle) => ({
        id: vehicle._id,
        image: vehicle.image[0],
        registeration_number: vehicle.registeration_number,
        company: vehicle.company,
        name: vehicle.name,
      }));

  return (
    <div className="max-w-[1000px]  d-flex   justify-end text-start items-end p-10">
      <Header title="AllVehicles" />

      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            ".MuiDataGrid-columnSeparator": {
              display: "none",
            },
            "&.MuiDataGrid-root": {
              border: "none",
            },
          }}
        />
      </Box>

      {/* addProduct modal */}
      <VendorAddProductModal />
    </div>
  );
};

export default VendorAllVehicles;
