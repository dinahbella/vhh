import { DeleteIcon, Edit2Icon, Edit3, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer border-red-700 ${
        selectedId?._id === addressInfo?._id
          ? "border-red-900 border-[4px]"
          : "border-primary hover:bg-primary hover:text-white shadow-lg"
      }`}
    >
      <CardContent className="grid p-4 gap-4">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button
          className="cursor-pointer"
          onClick={() => handleEditAddress(addressInfo)}
        >
          <Edit3 />
          Edit
        </Button>
        <Button
          className="bg-red-700 hover:bg-red-900 cursor-pointer"
          onClick={() => handleDeleteAddress(addressInfo)}
        >
          <Trash2Icon />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
