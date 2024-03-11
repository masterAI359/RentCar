export const addVehicleClicked = (clicked) => ({
  type: "Add_vehicle_clicked",
  payload: clicked,
});

export const setEditData = (data)=> ({
  type:"Set_edit_data",
  payload:data
})