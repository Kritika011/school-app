import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";

import FormInput from "../../../components/FormInput";
import UploadBox from "../../../components/UploadBox";
import RadioSelect from "../../../components/RadioSelect";
import DropdownSelect from "../../../components/DropdownSelect";
import DatePickerInput from "../../../components/DatePickerInput";
import PastDatePickerInput from "../../../components/PastDatePickerInput";

/* ---------- TYPES ---------- */
export type DriverFormData = {
  gender?: string;
  dob?: string;
  age?: number | null;
  bloodGroup?: string;

  address?: {
    house?: string;
    street?: string;
    city?: string;
    district?: string;
    state?: string;
    postOffice?: string;
    country?: string;
    pincode?: string;
  };

  emergencyName?: string;
  emergencyNumber?: string;
  

  licenceNumber?: string;
  licenceType?: string;
  issuingRTO?: string;
  licenceIssueDate?: string;
  licenceExpiryDate?: string;

  assignedVehicle?: string;
  vehicleNumber?: string;

  joiningDate?: string;
  employmentType?: string;
  emergencyRelation?: string;
  staffCategory?: string;


  aadhaar?: string;
  pan?: string;
  password?: string;
};

type Props = {
  data: DriverFormData;
  onChange: React.Dispatch<React.SetStateAction<DriverFormData>>;
};

/* ---------- COMPONENT ---------- */
export default function DriverForm({ data, onChange }: Props) {
  const [age, setAge] = useState<number | null>(data.age ?? null);

  const handleAgeChange = (value: number | null) => {
    setAge(value);
    onChange({ ...data, age: value });
  };

  return (
    <>
      {/* ---------- Personal Details ---------- */}
      <Text style={styles.section}>Personal Details</Text>

      <RadioSelect
        label="Gender"
        options={["Female", "Male", "Other"]}
        value={data.gender}
        onChange={(v: any) => onChange({ ...data, gender: v })}
      />

      <DatePickerInput setAge={handleAgeChange} />

      <FormInput
        label="Age"
        value={age !== null ? age.toString() : ""}
       placeholder="Enter DOB to calculate age"
        editable={false}
      />

      <DropdownSelect
        label="Blood Group"
        options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
        value={data.bloodGroup}
        onChange={(v: any) => onChange({ ...data, bloodGroup: v })}
      />

      {/* ---------- Present Address ---------- */}
      <Text style={styles.section}>Present Address</Text>

      <FormInput
        label="House / Flat No."
        value={data.address?.house}
        placeholder="Enter house/flat number"
        onChangeText={(v) =>
          onChange({ ...data, address: { ...data.address, house: v } })
        }
      />

      <FormInput
        label="Street / Locality"
        value={data.address?.street}
        placeholder="Enter street/locality"
        onChangeText={(v) =>
          onChange({ ...data, address: { ...data.address, street: v } })
        }
      />

      <FormInput
        label="City / Village / Town"
        value={data.address?.city}
        placeholder="Enter city/village/town"
        onChangeText={(v) =>
          onChange({ ...data, address: { ...data.address, city: v } })
        }
      />

      <FormInput
        label="District"
        value={data.address?.district}
        placeholder="Enter district"
        onChangeText={(v) =>
          onChange({ ...data, address: { ...data.address, district: v } })
        }
      />

      <FormInput
        label="State"
        value={data.address?.state}
        placeholder="Enter state"
        onChangeText={(v) =>
          onChange({ ...data, address: { ...data.address, state: v } })
        }
      />

      <FormInput
        label="Post Office"
        value={data.address?.postOffice}
        placeholder="Enter post office"
        onChangeText={(v) =>
          onChange({ ...data, address: { ...data.address, postOffice: v } })
        }
      />

      <FormInput
        label="Country"
        value={data.address?.country}
        placeholder="Enter country"
        onChangeText={(v) =>
          onChange({ ...data, address: { ...data.address, country: v } })
        }
      />

      <FormInput
        label="Pincode"
        value={data.address?.pincode}
        placeholder="Enter pincode"
        keyboardType="numeric"
        maxLength={6}
        onChangeText={(v) =>
          onChange({ ...data, address: { ...data.address, pincode: v } })
        }
      />

      {/* ---------- Emergency ---------- */}
      <Text style={styles.section}>Emergency Contact</Text>

      <FormInput
        label="Emergency Person Name"
        value={data.emergencyName}
        placeholder="Enter name"
        onChangeText={(v) => onChange({ ...data, emergencyName: v })}
      /> 
      
      <FormInput
        label="Emergency Person Number"
        value={data.emergencyNumber}
        placeholder="Enter number"
        keyboardType="numeric"
        onChangeText={(v) => onChange({ ...data, emergencyNumber: v })}
      />

      <DropdownSelect
  label="Emergency Person Relation"
  options={[
    "Father",
    "Mother",
    "Spouse",
    "Brother",
    "Sister",
    "Son",
    "Daughter",
    "Relative",
    "Friend",
    "Other",
  ]}
  value={data.emergencyRelation}
  onChange={(v: any) =>
    onChange({ ...data, emergencyRelation: v })
  }
/>

     

      {/* ---------- Driving Details ---------- */}
      <Text style={styles.section}>Driving Details</Text>

      <FormInput
        label="Driving Licence Number"
        value={data.licenceNumber}
        placeholder="Enter licence number"
        onChangeText={(v) => onChange({ ...data, licenceNumber: v })}
      />

      <DropdownSelect
        label="Licence Type"
        options={["LMV", "HMV", "MCWG", "Transport"]}
        value={data.licenceType}
        onChange={(v: any) => onChange({ ...data, licenceType: v })}
      />

      <FormInput
        label="Issuing RTO"
        value={data.issuingRTO}
        placeholder="Enter RTO name"
        onChangeText={(v) => onChange({ ...data, issuingRTO: v })}
      />

      <PastDatePickerInput
        label="Licence Issue Date"
        value={data.licenceIssueDate}
        onChange={(date) =>
          onChange({ ...data, licenceIssueDate: date })
        }
      />

      <PastDatePickerInput
        label="Licence Expiry Date"
        value={data.licenceExpiryDate}
        onChange={(date) =>
          onChange({ ...data, licenceExpiryDate: date })
        }
      />

      {/* ---------- Vehicle Details ---------- */}
      <Text style={styles.section}>Vehicle Details</Text>

      <FormInput
        label="Assigned Vehicle"
        value={data.assignedVehicle}
        placeholder="Enter vehicle name"
        onChangeText={(v) => onChange({ ...data, assignedVehicle: v })}
      />

      <FormInput
        label="Vehicle Number"
        value={data.vehicleNumber}
        placeholder="Enter vehicle number"
        onChangeText={(v) => onChange({ ...data, vehicleNumber: v })}
      />

      {/* ---------- Employment ---------- */}
      <Text style={styles.section}>Employment Details</Text>

      <PastDatePickerInput
        label="Joining Date"
        value={data.joiningDate}
        onChange={(date) => onChange({ ...data, joiningDate: date })}
      />

      <DropdownSelect
        label="Employment Type"
        options={["Permanent", "Contract"]}
        value={data.employmentType}
        onChange={(v: any) => onChange({ ...data, employmentType: v })}
      />
      <DropdownSelect
  label="Staff Category (Driver)"
  options={["Driver"]}
  value={data.staffCategory}  // currently you had employmentType here
  onChange={(v:any) => onChange({ ...data, staffCategory: v })}
/>

      {/* ---------- Identity ---------- */}
      <Text style={styles.section}>Identity</Text>

      <FormInput
        label="Aadhaar Number"
        value={data.aadhaar}
        placeholder="Enter Aadhaar number"
        keyboardType="numeric"
        onChangeText={(v) => onChange({ ...data, aadhaar: v })}
      />

      <FormInput
        label="Pan Card Number"
        value={data.pan}
        placeholder="Enter PAN number"
        onChangeText={(v) => onChange({ ...data, pan: v })}
      />

      {/* ---------- Security ---------- */}
      <Text style={styles.section}>Security</Text>

      <FormInput
        label="Password"
        value={data.password}
        secureTextEntry
        placeholder="Enter password"
        onChangeText={(v) => onChange({ ...data, password: v })}
      />

      {/* ---------- Documents ---------- */}
      <Text style={[styles.section, { marginBottom: 16 }]}>Documents</Text>

      <UploadBox label="Profile Image" />
      <UploadBox label="Aadhaar Card Image" />
      <UploadBox label="Pan Card Image" />
      <UploadBox label="Driving Licence (Front)" />
      <UploadBox label="Driving Licence (Back)" />
    </>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  section: {
    color: "#000000",
    fontWeight: "900",
    marginVertical: 10,
    borderBottomColor: "#000000",
    borderBottomWidth: 2,
    fontSize: 20,
    paddingBottom: 10,
  },
});
