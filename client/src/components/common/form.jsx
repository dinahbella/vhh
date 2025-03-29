import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function Form({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) {
  const renderInputByComponentType = (getControlItem) => {
    const value = formData[getControlItem.name || ""];

    switch (getControlItem.componentType) {
      case "input":
        return (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );

      case "select":
        return (
          <Select
            value={value}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            name={getControlItem.name}
            id={getControlItem.name}
            placeholder={getControlItem.placeholder}
            className="w-full border px-3 py-2 rounded"
            rows={getControlItem.rows || 4}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );

      default:
        return (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
    }
  };

  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        <div className="flex flex-col gap-3">
          {formControls.map((controlItem) => (
            <div className="w-full grid gap-1.5" key={controlItem.name}>
              <Label className="mb-1" htmlFor={controlItem.name}>
                {controlItem.label}
              </Label>
              {renderInputByComponentType(controlItem)}
            </div>
          ))}
        </div>
        <Button type="submit" className="mt-3 hover:bg-green-900 w-full">
          {buttonText || "Submit"}
        </Button>
      </form>
    </div>
  );
}
