const initial_state = {
  isAddVehicleClicked: false,
  editData:{
    _id:null,
    registeration_number:null,
    company:null,
    name:null
  }
};

const AddVehiclereducer = (state = initial_state, action) => {
  switch (action.type) {
    case "Add_vehicle_clicked":
      return { ...state, isAddVehicleClicked: action.payload };
    case "Set_edit_data":
      return {...state,editData:action.payload}
    default:
      return state;
  }
};

export default AddVehiclereducer;



