import { useState } from "react";
import Modal from "../../components/CustomModal";
import { TbEditCircle } from "react-icons/tb";

//mui

import TextField from "@mui/material/TextField";

const ProfileEdit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button className="" onClick={() => setIsModalOpen(true)}>
        <TbEditCircle />
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="bg-white rounded-md max-w-[600px]"
      >
        <div className="p-8">
          <h2 className="font-bold">Make changes to your profile</h2>
          {/* mui components */}
         
            <div className="flex flex-col mx-auto md:min-w-[500px] gap-10 my-10">
            <TextField id="outlined-basic" label="Name" variant="outlined" />
            <TextField id="outlined-basic" label="Email" variant="outlined" />
            <TextField
              id="outlined-basic"
              label="Phone"
              type="Number"
              variant="outlined"
            />
            
            <TextField
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              defaultValue="Default Value"
            />
            </div>
            
     
          {/* mui text feild end here */}

          <div className="flex justify-end items-center gap-x-2">
            <button
              className="w-[100px] rounded-sm text-white bg-red-500 p-2"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
            <button
              className="w-[100px] rounded-sm text-white bg-green-500 p-2"
              onClick={() => setIsModalOpen(false)}
            >
              save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProfileEdit;
