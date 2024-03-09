const initial_state = {
  isAddVehicleClicked: false,
};

const AddVehiclereducer = (state = initial_state, action) => {
  switch (action.type) {
    case "Add_vehicle_clicked":
      return { ...state, isAddVehicleClicked: action.payload };
    default:
      return state;
  }
};

export default AddVehiclereducer;
