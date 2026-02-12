import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

import FormInput from "../../../components/FormInput";
import UploadBox from "../../../components/UploadBox";
import RadioSelect from "../../../components/RadioSelect";
import DropdownSelect from "../../../components/DropdownSelect";
import DatePickerInput from "../../../components/DatePickerInput";
import PastDatePickerInput from "../../../components/PastDatePickerInput";
import { Ionicons } from "@expo/vector-icons";

/* ---------- TYPES ---------- */
export type TeacherFormData = {
  fullName?: string;
  mobile?: string;
  email?: string;
  school?: string;
  role?: string;

  gender?: string;
  dob?: string;
  age?: number | null;
  bloodGroup?: string;
  maritalStatus?: string;
  religion?: string;
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

  responsibleFor?: string;

  classes?: {
    className?: string;
    section?: string;
    startSession?: string;
    endSession?: string;
  }[];

  subjects?: string[];

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
};

type Props = {
  data: TeacherFormData;
  onChange: React.Dispatch<React.SetStateAction<TeacherFormData>>;
};

/* ---------- COMPONENT ---------- */
export default function TeacherForm({ data, onChange }: Props) {
  const [age, setAge] = useState<number | null>(data.age ?? null);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 80 }, (_, i) => currentYear - i);

  const classes = data.classes ?? [{}];
  const subjects = data.subjects ?? [""];
  const removeSubject = (index: number) => {
  const updated = subjects.filter((_, i) => i !== index);
  onChange({ ...data, subjects: updated });
};


  const handleAgeChange = (value: number | null) => {
    setAge(value);
    onChange({ ...data, age: value });
  };

  const addClass = () => {
    onChange({ ...data, classes: [...classes, {}] });
  };

  const addSubject = () => {
    onChange({ ...data, subjects: [...subjects, ""] });
  };
const removeClass = (index: number) => {
  const updated = classes.filter((_, i) => i !== index);
  onChange({ ...data, classes: updated });
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

      <FormInput label="Age" value={age?.toString() ?? ""} editable={false}
      placeholder="Enter DOB to calculate age" />

      <DropdownSelect
        label="Blood Group"
        options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
        value={data.bloodGroup}
        onChange={(v: any) => onChange({ ...data, bloodGroup: v })}
      />

      <DropdownSelect
        label="Marital Status"
        options={["Single", "Married", "Widowed", "Other"]}
        value={data.maritalStatus}
        onChange={(v: any) => onChange({ ...data, maritalStatus: v })}
      />

      {/* <FormInput label="Religion" value={data.religion} onChangeText={(v) => onChange({ ...data, religion: v })} /> */}

      <DropdownSelect
        label="Category"
        options={["General", "OBC", "SC", "ST", "Other"]}
        value={data.category}
        onChange={(v: any) => onChange({ ...data, category: v })}
      />
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

      {/* ---------- Address ---------- */}
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

      {/* ---------- Responsibility ---------- */}
      <Text style={styles.section}>Teaching Responsibility</Text>

      {classes.map((cls, index) => (
  <View key={index} style={styles.classCard}>
    <View style={styles.classRow}>
      <FormInput
        label="Class"
        value={cls.className}
        placeholder="Enter class"
        onChangeText={(v) => {
          const updated = [...classes];
          updated[index].className = v;
          onChange({ ...data, classes: updated });
        }}
      />

      <FormInput
        label="Section"
        value={cls.section}
        placeholder="Enter section"
        onChangeText={(v) => {
          const updated = [...classes];
          updated[index].section = v;
          onChange({ ...data, classes: updated });
        }}
      />
    </View>

    <View style={styles.classRow}>
      <FormInput
        label="Start Session"
        value={cls.startSession}
        placeholder="Enter start session"
        onChangeText={(v) => {
          const updated = [...classes];
          updated[index].startSession = v;
          onChange({ ...data, classes: updated });
        }}
      />

      <FormInput
        label="End Session"
        value={cls.endSession}
        placeholder="Enter end session"
        onChangeText={(v) => {
          const updated = [...classes];
          updated[index].endSession = v;
          onChange({ ...data, classes: updated });
        }}
      />

      {/* BIN ICON */}
      {classes.length > 1 && (
        <TouchableOpacity
          onPress={() => removeClass(index)}
          style={styles.binBtn}
        >
         <Text style={{ color: "#ce1a1a", fontWeight: "700" }}>
          Remove
          
          </Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
))}


      <TouchableOpacity onPress={addClass}>
        <Text style={styles.addMore}>+ Add more class</Text>
      </TouchableOpacity>

      {/* ---------- Subjects ---------- */}
      <Text style={styles.section}>Subjects</Text>
      
      {subjects.map((sub, index) => (
  <View key={index} style={styles.row}>
    <View style={{ flex: 1 }}>
      <FormInput
        label={`Subject ${index + 1}`}
        value={sub}
        placeholder="Enter subject"
        onChangeText={(v) => {
          const updated = [...subjects];
          updated[index] = v;
          onChange({ ...data, subjects: updated });
        }}
      />
    </View>

 {/* BIN ICON */}
    {subjects.length > 1 && (
      <TouchableOpacity onPress={() => removeSubject(index)}>
        <Ionicons
          name="trash-outline"
          size={22}
          color="#ce1a1a"
          backgroundColor="#ffe1e1"
          style={{ padding: 10, borderRadius: 6, marginLeft: 8, marginTop: 15   }}
        />
      </TouchableOpacity>
    )}
    
  </View>
))}
<TouchableOpacity onPress={addSubject}>
        <Text style={styles.addMore}>+ Add more subject</Text>

      </TouchableOpacity>


      {/* ---------- Employment ---------- */}
      <Text style={styles.section}>Employment Details</Text>


      <DropdownSelect
        label="Employment Type"
        options={["Permanent", "Contract"]}
        value={data.employmentType}
        onChange={(v: any) => onChange({ ...data, employmentType: v })}
      />

      <PastDatePickerInput label="Joining Date" value={data.joiningDate} onChange={(d) => onChange({ ...data, joiningDate: d })} />

      <FormInput label="Experience (years)" value={data.experience} keyboardType="numeric" 
      placeholder="Enter Experience in years"/>

      <DropdownSelect
        label="Staff Category( Teaching)"
        options={["Teaching"]}
        value={data.staffCategory}
        onChange={(v: any) => onChange({ ...data, staffCategory: v })}
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

      {/* ---------- Security ---------- */}
      <Text style={styles.section}>Security</Text>

      <FormInput label="Password" secureTextEntry value={data.password}
      placeholder="Enter Password" />

      {/* ---------- Documents ---------- */}
      <Text style={styles.section}>Documents</Text>

      <UploadBox label="Profile Image" />
      <UploadBox label="Aadhaar Card Image" />
      <UploadBox label="Pan Card Image" />
      <UploadBox label="Highest Qualifying Marksheet" />
      <UploadBox label="Resume" />
      <UploadBox label="Caste Certificate Image" />
    </>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  section: {
    fontSize: 20,
    fontWeight: "900",
    marginVertical: 10,
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
  addMore: {
    color: "#1e40af",
    fontWeight: "700",
    marginVertical: 8,
  },
  card: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  row: {
  flexDirection: "row",
  alignItems: "center",
},
// remove: {
//   color: "red",
//   fontWeight: "700",
//   marginLeft: 10,
// },
classCard: {
  borderWidth: 1,
  borderRadius: 8,
  padding: 10,
  marginBottom: 12,
},

classRow: {
  // flexDirection: "row",
  // alignItems: "center",
  // gap: 8,
},

binBtn: {
  // marginTop: 22, // aligns with inputs
  // width: '50%',
  alignItems: "center",
  textAlign: "center",
  justifyContent: "center",
  padding: 8,
  backgroundColor: "#ffe1e1",
  borderRadius: 6,
  marginHorizontal: 5,
  marginTop: 5,
  
},


});
