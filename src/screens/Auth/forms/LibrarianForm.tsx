import React from "react";
import { Text, StyleSheet } from "react-native";
import { useState } from "react";

import FormInput from "../../../components/FormInput";
import UploadBox from "../../../components/UploadBox";
import RadioSelect from "../../../components/RadioSelect";
import DropdownSelect from "../../../components/DropdownSelect";
import DatePickerInput from "../../../components/DatePickerInput";
import PastDatePickerInput from "../../../components/PastDatePickerInput";




/* ---------- TYPES ---------- */
export type LibrarianFormData = {
  gender?: any;
  dob?: string;
  age?: number | null;
  bloodGroup?: string;
  category?: string;

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

  aadhaar?: string;
  pan?: string;
  employmentType?: string;
  joiningDate?: string;
  experience?: string;
  staffCategory?: string;

  qualification?: string;
  subject?: string;
  university?: string;
  passingYear?: number;
  percentage?: string;

  emergencyName?: string;
  emergencyNumber?: string;
  emergencyRelation?: string;

  password?: string;

  documents?: {
    profileImage?: string;
    aadhaarImage?: string;
    panImage?: string;
    marksheet?: string;
    resume?: string;
    casteCertificate?: string;
  };
};

type Props = {
  data: LibrarianFormData;
  onChange: React.Dispatch<React.SetStateAction<LibrarianFormData>>;
};

/* ---------- COMPONENT ---------- */
export default function LibrarianForm({ data, onChange }: Props) {
  const [age, setAge] = useState<number | null>(data.age ?? null);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 80 }, (_, i) => currentYear - i);
  const [showJoiningDatePicker, setShowJoiningDatePicker] = useState(false);

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
        label="Category (Optional)"
        options={["General", "OBC", "SC", "ST", "Other"]}
        value={data.category}
        onChange={(v:any) => onChange({ ...data, category: v })}
      />
       <Text style={styles.section}>Identity</Text>
       
       <FormInput
        label="Aadhaar No"
        value={data.aadhaar}
        placeholder="Enter Aadhaar number"
        onChangeText={(v:any) => onChange({ ...data, aadhaar: v })}
      />
      <FormInput
        label="Pan Card No"
        value={data.pan}
        placeholder="Enter Pan card number"
        onChangeText={(v:any) => onChange({ ...data, pan: v })}
      />

      {/* ---------- Present Address ---------- */}
      <Text style={styles.section}>Present Address</Text>

      <FormInput
        label="House / Flat No."
        value={data.address?.house}
        placeholder="Enter house/flat number"
        onChangeText={(v:any) =>
          onChange({ ...data, address: { ...data.address, house: v } })
        }
      />
      <FormInput
        label="Street / Locality"
        value={data.address?.street}
        placeholder="Enter street/locality"
        onChangeText={(v:any) =>
          onChange({ ...data, address: { ...data.address, street: v } })
        }
      />
      <FormInput
        label="City / Village / Town"
        value={data.address?.city}
        placeholder="Enter city/village/town"
        onChangeText={(v:any) =>
          onChange({ ...data, address: { ...data.address, city: v } })
        }
      />
      <FormInput
        label="District"
        value={data.address?.district}
        placeholder="Enter district"
        onChangeText={(v:any) =>
          onChange({ ...data, address: { ...data.address, district: v } })
        }
      />
      <FormInput
        label="State"
        value={data.address?.state}
        placeholder="Enter state"
        onChangeText={(v:any) =>
          onChange({ ...data, address: { ...data.address, state: v } })
        }
      />
      <FormInput
        label="Post Office"
        value={data.address?.postOffice}
        placeholder="Enter post office"
        onChangeText={(v:any) =>
          onChange({ ...data, address: { ...data.address, postOffice: v } })
        }
      />
      <FormInput
        label="Country"
        value={data.address?.country}
        placeholder="Enter country"
        onChangeText={(v:any) =>
          onChange({ ...data, address: { ...data.address, country: v } })
        }
      />
      <FormInput
        label="Pincode"
        value={data.address?.pincode}
        placeholder="Enter pincode"
        keyboardType="numeric"
        maxLength={6} // for pincode

        onChangeText={(v:any) =>
          onChange({ ...data, address: { ...data.address, pincode: v } })
        }
      />

      {/* ---------- Employment Details ---------- */}
      <Text style={styles.section}>Employment Details</Text>

     

      <DropdownSelect
        label="Employment Type"
        options={["Permanent", "Contract"]}
        value={data.employmentType}
        onChange={(v:any) => onChange({ ...data, employmentType: v })}
      />

     <PastDatePickerInput
  label="Joining Date"
  value={data.joiningDate}
  onChange={(date) => onChange({ ...data, joiningDate: date })}
/>

{/* Experience (years) with numeric keyboard */}
<FormInput
  label="Experience (years)"
  value={data.experience}
  placeholder="Enter experience"
  keyboardType="numeric"
  onChangeText={(v: string) => onChange({ ...data, experience: v })}
/>
      {/* <FormInput
       
        value={data.staffCategory}
        placeholder="Enter staff category"
        onChangeText={(v:any) => onChange({ ...data, staffCategory: v })}
      /> */}
      <DropdownSelect
  label="Staff Category (Librarian)"
  options={[ "Librarian"]}
  value={data.staffCategory}  // currently you had employmentType here
  onChange={(v:any) => onChange({ ...data, staffCategory: v })}
/>


      {/* ---------- Educational Qualifications ---------- */}
      <Text style={styles.section}>Educational Qualifications</Text>

      <FormInput
        label="Highest Qualification"
        value={data.qualification}
        placeholder="Enter highest qualification"
        onChangeText={(v:any) => onChange({ ...data, qualification: v })}
      />
      <FormInput
        label="Subject"
        value={data.subject}
        placeholder="Enter subject"
        onChangeText={(v:any) => onChange({ ...data, subject: v })}
      />
      <FormInput
        label="University / Board"
        value={data.university}
        placeholder="Enter university/board"
        onChangeText={(v:any) => onChange({ ...data, university: v })}
      />
     
<DropdownSelect
  label="Year of Passing"
  options={years.map(String)}
  value={data.passingYear?.toString()}
  onChange={(v) => onChange({ ...data, passingYear: Number(v) })}
/>

      <FormInput
        label="Percentage / CGPA"
        value={data.percentage}
        placeholder="Enter percentage/CGPA"
        keyboardType="numeric"

        onChangeText={(v:any) => onChange({ ...data, percentage: v })}
      />

      {/* ---------- Emergency ---------- */}
      <Text style={styles.section}>Emergency Contact</Text>

      <FormInput
        label="Emergency Person Name"
        value={data.emergencyName}
        placeholder="Enter emergency person name"
        onChangeText={(v:any) => onChange({ ...data, emergencyName: v })}
      />
      <FormInput
        label="Emergency Person Number"
        value={data.emergencyNumber}
        placeholder="Enter emergency person number"
        keyboardType="numeric"

        onChangeText={(v:any) => onChange({ ...data, emergencyNumber: v })}
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
      

      {/* ---------- Security ---------- */}
      <Text style={styles.section}>Security</Text>

      <FormInput
        label="Password"
        secureTextEntry
        value={data.password}
        placeholder="Enter password" 
        onChangeText={(v:any) => onChange({ ...data, password: v })}
      />

      {/* ---------- Documents ---------- */}
      <Text style={[styles.section, { marginBottom: 16 }]}>Documents</Text>

      <UploadBox label="Profile Image" />
      <UploadBox label="Aadhaar Card Image" />
      <UploadBox label="Pan Card Image" />
      <UploadBox label="Highest Qualifying Marksheet" />
      <UploadBox label="Resume" />
      <UploadBox label="Caste Certificate Image (if any)" />
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
