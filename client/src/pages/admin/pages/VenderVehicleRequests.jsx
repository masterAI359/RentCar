import { GrStatusGood } from "react-icons/gr";
import { MdOutlinePending } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";







const VenderVehicleRequests = () => {

   const {vendorVehicleApproved , vendorVehilces} =  useSelector(state => state.vendorDashboardSlice)
   const dispatch = useDispatch()

    const columns = [
        {
          field: "image",
          headerName: "Image",
          width: 100,
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
          field: "status",
          headerName: "Status",
          width: 150,
          renderCell: (params) =>
            !params.row.status ? (
              <div className="text-yellow-500   bg-yellow-100 p-2 rounded-lg flex items-center justify-center gap-x-1">
              <span className="text-[8px]">Pending</span>
              <MdOutlinePending />
            </div>
            ) : (
              <div className="text-green-500   bg-green-100 p-2 rounded-lg flex items-center justify-center gap-x-1">
                <span className="text-[8px]">Approved</span>
                <GrStatusGood />
              </div>
            ),
        },
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
            status: vehicle.isAdminApproved,
          }));
  return (
    <div className="max-w-[1000px]  d-flex   justify-end text-start items-end p-10 bg-slate-100 rounded-md">
      

      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize:vendorVehicleApproved && vendorVehicleApproved.length > 10 ? 10 : 5 ,
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
  )
}

export default VenderVehicleRequests