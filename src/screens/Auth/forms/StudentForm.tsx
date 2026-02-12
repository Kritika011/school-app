import React from "react";
import { Text, StyleSheet } from "react-native";
import FormInput from "../../../components/FormInput";
import UploadBox from "../../../components/UploadBox";
import DropdownSelect from "../../../components/DropdownSelect";
import PastDatePickerInput from "../../../components/PastDatePickerInput";
import RadioSelect from "../../../components/RadioSelect";
import DatePickerInput from "../../../components/DatePickerInput";
import { useState } from "react";


/* ---------- TYPES ---------- */
export type StudentFormData = {
  fatherName?: string;
  fatherContact?: string;
  fatherOccupation?: string;
  fatherAadhaar?: string;
  fatherPan?: string;

  motherName?: string;
  motherContact?: string;
  motherOccupation?: string;
  motherAadhaar?: string;
  motherPan?: string;

  guardianName?: string;
  guardianContact?: string;
  guardianRelation?: string;


  gender?: "Male" | "Female" | "Other";
  dob?: string;
  age?: number | null;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  religion?: string;
  category?: "General" | "OBC" | "SC" | "ST" | "Other";
  aadhaar?: string;

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

  class?: string;
  section?: string;
  discipline?: string;
  startSession?: string;
  endSession?: string;
  roll?: string;

  documents?: {
    profileImage?: string;
    aadhaarImage?: string;
    birthCertificate?: string;
    marksheet?: string;
    transferCertificate?: string;
    casteCertificate?: string;
  };
};

type Props = {
  data: StudentFormData;
  onChange: React.Dispatch<React.SetStateAction<StudentFormData>>;
};

/* ---------- COMPONENT ---------- */
export default function StudentForm({ data, onChange }: Props) {
  const currentYear = new Date().getFullYear();
  const [age, setAge] = useState<number | null>(data.age ?? null);
    const handleAgeChange = (value: number | null) => {
    setAge(value);
    onChange({ ...data, age: value });
  };
// const currentYear = new Date().getFullYear();
const sessionYears = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i); 
// 5 years before and 5 years after current year

  return (
    <>
      <Text style={styles.section}>Personal Details</Text>
 {/* ---------- Personal ---------- */}
      <RadioSelect
              label="Gender"
              options={["Female", "Male", "Other"]}
              value={data.gender}
              onChange={(v:any) => onChange({ ...data, gender: v })}
              
            />
      
            <DatePickerInput
              setAge={handleAgeChange}
            />
      
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
              onChange={(v:any) => onChange({ ...data, bloodGroup: v })}
            />
      
            <DropdownSelect
              label="Category "
              options={["General", "OBC", "SC", "ST", "Other"]}
              value={data.category}
              onChange={(v:any) => onChange({ ...data, category: v })}
            />
            <DropdownSelect
  label="Religion"
  options={[
    "Hindu",
    "Muslim",
    "Christian",
    "Sikh",
    "Buddhist",
    "Jain",
    "Other"
  ]}
  value={data.religion}
  onChange={(v) => onChange({ ...data, religion: v })}
/>


       <Text style={styles.section}>Identity</Text>
      
            <FormInput
              label="Aadhaar Number"
              value={data.aadhaar}
              placeholder="Enter Aadhaar number"
              keyboardType="numeric"
              onChangeText={(v) => onChange({ ...data, aadhaar: v })}
            />

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

      {/* ---------- Father ---------- */}
      <Text style={styles.section}>Father</Text>
      <FormInput
        label="Name"
        value={data.fatherName}
        placeholder="Enter Father's name"
        onChangeText={(v: string) => onChange({ ...data, fatherName: v })}
      />
      <FormInput
        label="Contact"
        value={data.fatherContact}
        placeholder="Enter Father's Contact"
        keyboardType="numeric"
        maxLength={10}
        onChangeText={(v: string) => onChange({ ...data, fatherContact: v })}
      />
      <FormInput
        label="Occupation"
        value={data.fatherOccupation}
        placeholder="Enter Father's Occupation"
        onChangeText={(v: string) => onChange({ ...data, fatherOccupation: v })}
      />
      <FormInput
        label="Aadhaar Card"
        value={data.fatherAadhaar}
          placeholder="Enter Father's Aadhaar number"
        keyboardType="numeric"
        maxLength={12}
        onChangeText={(v: string) => onChange({ ...data, fatherAadhaar: v })}
      />
      <FormInput
        label="Pan Card"
        value={data.fatherPan}
        placeholder="Enter Father's Pan card number"
        maxLength={10}
        onChangeText={(v: string) => onChange({ ...data, fatherPan: v })}
      />

      {/* ---------- Mother ---------- */}
      <Text style={styles.section}>Mother</Text>
      <FormInput
        label="Name"
        value={data.motherName}
        placeholder="Enter Mother's name"
        onChangeText={(v: string) => onChange({ ...data, motherName: v })}
      />
      <FormInput
        label="Contact"
        value={data.motherContact}
        placeholder="Enter Mother's Contact"
        keyboardType="numeric"
        maxLength={10}
        onChangeText={(v: string) => onChange({ ...data, motherContact: v })}
      />
      <FormInput
        label="Occupation"
        value={data.motherOccupation}
        placeholder="Enter Mother's Occupation"
        onChangeText={(v: string) => onChange({ ...data, motherOccupation: v })}
      />
      <FormInput
        label="Aadhaar Card"
        value={data.motherAadhaar}
        placeholder="Enter Mother's Aadhaar number"
        keyboardType="numeric"
        maxLength={12}
        onChangeText={(v: string) => onChange({ ...data, motherAadhaar: v })}
      />
      <FormInput
        label="Pan Card"
        value={data.motherPan}
        placeholder="Enter Mother's Pan card number"
        maxLength={10}
        onChangeText={(v: string) => onChange({ ...data, motherPan: v })}
      />

      {/* ---------- Guardian ---------- */}
      <Text style={styles.section}>Guardian (Optional)</Text>
      <FormInput
        label="Name"
        value={data.guardianName}
        placeholder="Enter Guardian's name"
        onChangeText={(v: string) => onChange({ ...data, guardianName: v })}
      />
      <FormInput
        label="Contact"
        value={data.guardianContact}
        placeholder="Enter Guardian's Contact"
        keyboardType="numeric"
        maxLength={10}
        onChangeText={(v: string) => onChange({ ...data, guardianContact: v })}
      />
      <FormInput
        label="Relationship"
        value={data.guardianRelation}
        placeholder="Enter Relationship with Guardian"
        onChangeText={(v: string) => onChange({ ...data, guardianRelation: v })}
      />

     
      {/* ---------- Academic ---------- */}
      <Text style={styles.section}>Academic Details</Text>
      <FormInput
        label="Roll"
        value={data.roll}
        placeholder="Enter Roll Number"
        keyboardType="numeric"
        onChangeText={(v: string) => onChange({ ...data, roll: v })}
      />
      <FormInput
        label="Class"
        value={data.class}
        placeholder="Enter Class"
        onChangeText={(v: string) => onChange({ ...data, class: v })}
      />
      <FormInput
        label="Section"
        value={data.section}
        placeholder="Enter Section"
        onChangeText={(v: string) => onChange({ ...data, section: v })}
      />
      <FormInput
        label="Discipline"
        value={data.discipline}
        placeholder="Enter Discipline"
        onChangeText={(v: string) => onChange({ ...data, discipline: v })}
      />
      
<DropdownSelect
  label="Start Session"
  options={sessionYears.map(String)}
  value={data.startSession}
  onChange={(v: string) => onChange({ ...data, startSession: v })}
/>

<DropdownSelect
  label="End Session"
  options={sessionYears.map(String)}
  value={data.endSession}
  onChange={(v: string) => onChange({ ...data, endSession: v })}
/>


      {/* ---------- Documents ---------- */}
      <Text style={styles.section}>Documents</Text>
      <UploadBox label="Profile Image" />
      <UploadBox label="Aadhaar Card Image" />
      <UploadBox label="Birth Certificate" />
      <UploadBox label="Previous Marksheet" />
      <UploadBox label="Transfer Certificate" />
      <UploadBox label="Caste Certificate" />
    </>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  section: {
    color: "#000000",
    fontWeight: 900,
    marginVertical: 10,
    borderBottomColor: "#000000",
    borderBottomWidth: 2,
    fontSize: 20,
    paddingBottom: 10,
  },
});
