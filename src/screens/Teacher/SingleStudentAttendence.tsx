// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";

// /* ---------- TYPES ---------- */

// type DayStatus = "P" | "A" | "H";

// type MonthAttendance = {
//   month: string;
//   days: DayStatus[];
// };

// type StudentInfo = {
//   name: string;
//   rollNo: string;
//   className: string;
//   session: string;
// };

// /* ---------- DUMMY DATA ---------- */

// const student: StudentInfo = {
//   name: "Ram Sen",
//   rollNo: "104",
//   className: "Class 7 | Sec B",
//   session: "2025 - 2026",
// };

// const months: MonthAttendance[] = [
//   {
//     month: "January",
//     days: Array.from({ length: 31 }, () =>
//       ["P", "A", "H"][Math.floor(Math.random() * 3)] as DayStatus
//     ),
//   },
//   {
//     month: "February",
//     days: Array.from({ length: 28 }, () =>
//       ["P", "A", "H"][Math.floor(Math.random() * 3)] as DayStatus
//     ),
//   },
//   {
//     month: "March",
//     days: Array.from({ length: 31 }, () =>
//       ["P", "A", "H"][Math.floor(Math.random() * 3)] as DayStatus
//     ),
//   },
// ];

// /* ---------- MAIN COMPONENT ---------- */

// const TeacherAttendanceHistory: React.FC = () => {
//   const [year] = useState("2026");

//   const getColor = (status: DayStatus) => {
//     switch (status) {
//       case "P":
//         return "#2e7d32"; // Present
//       case "A":
//         return "#c62828"; // Absent
//       case "H":
//         return "#f9a825"; // Holiday
//       default:
//         return "#ccc";
//     }
//   };

//   return (
//     <LinearGradient
//       colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
//       locations={[0, 0.3, 0.7, 1]}
//       style={{ flex: 1 }}
//     >
//       <ScrollView contentContainerStyle={styles.container}>
//         {/* ---------- HEADER ---------- */}
//         <View style={styles.header}>
//           <Text style={styles.title}>Attendance History</Text>
//           <Text style={styles.year}>Year : {year}</Text>
//         </View>

//         {/* ---------- STUDENT INFO ---------- */}
//         <View style={styles.infoCard}>
//           <Text style={styles.name}>{student.name}</Text>
//           <Text style={styles.meta}>
//             Roll No: {student.rollNo}
//           </Text>
//           <Text style={styles.meta}>{student.className}</Text>
//           <Text style={styles.meta}>
//             Session: {student.session}
//           </Text>
//         </View>

//         {/* ---------- LEGEND ---------- */}
//         <View style={styles.legend}>
//           <LegendItem color="#2e7d32" label="Present" />
//           <LegendItem color="#c62828" label="Absent" />
//           <LegendItem color="#f9a825" label="Holiday" />
//         </View>

//         {/* ---------- MONTHS ---------- */}
//         {months.map((m) => (
//           <View key={m.month} style={styles.monthCard}>
//             <Text style={styles.monthTitle}>{m.month}</Text>

//             <View style={styles.daysGrid}>
//               {m.days.map((d, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   style={[
//                     styles.dayBox,
//                     { backgroundColor: getColor(d) },
//                   ]}
//                 >
//                   <Text style={styles.dayText}>
//                     {index + 1}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//     </LinearGradient>
//   );
// };

// export default TeacherAttendanceHistory;

// /* ---------- LEGEND COMPONENT ---------- */

// const LegendItem = ({
//   color,
//   label,
// }: {
//   color: string;
//   label: string;
// }) => (
//   <View style={styles.legendItem}>
//     <View
//       style={[styles.legendColor, { backgroundColor: color }]}
//     />
//     <Text style={styles.legendText}>{label}</Text>
//   </View>
// );

// /* ---------- STYLES ---------- */

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     paddingBottom: 40,
//   },

//   header: {
//     marginBottom: 16,
//   },

//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#fff",
//   },

//   year: {
//     fontSize: 14,
//     color: "#e6ecff",
//     marginTop: 4,
//   },

//   infoCard: {
//     backgroundColor: "#ffffff",
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 16,
//   },

//   name: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#072445",
//   },

//   meta: {
//     fontSize: 14,
//     color: "#555",
//     marginTop: 4,
//   },

//   legend: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 16,
//   },

//   legendItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//   },

//   legendColor: {
//     width: 14,
//     height: 14,
//     borderRadius: 4,
//   },

//   legendText: {
//     color: "#fff",
//     fontSize: 13,
//   },

//   monthCard: {
//     backgroundColor: "#ffffff",
//     borderRadius: 16,
//     padding: 12,
//     marginBottom: 16,
//   },

//   monthTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "#072445",
//   },

//   daysGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },

//   dayBox: {
//     width: "12.5%", // 8 columns
//     aspectRatio: 1,
//     margin: 2,
//     borderRadius: 6,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   dayText: {
//     fontSize: 10,
//     color: "#fff",
//     fontWeight: "600",
//   },
// });


import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

/* ---------- TYPES ---------- */

type DayStatus = "P" | "A" | "H" | null;

type MonthAttendance = {
  month: number; // 0-11
  year: number;
  days: Record<number, DayStatus>;
};

/* ---------- STUDENT INFO ---------- */

const student = {
  name: "Ram Sen",
  rollNo: "104",
  className: "Class 7 | Sec B",
  session: "2025 - 2026",
};

/* ---------- MONTH DATA (API READY) ---------- */

const months: MonthAttendance[] = [
  {
    month: 0, // January
    year: 2026,
    days: {
      1: "P",
      2: "P",
      3: "A",
      6: "H",
      10: "P",
      15: "A",
      20: "P",
    },
  },
  {
    month: 1, // February
    year: 2026,
    days: {
      1: "P",
      5: "A",
      12: "H",
      18: "P",
      22: "A",
    },
  },
];

/* ---------- HELPERS ---------- */

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getColor = (status: DayStatus) => {
  if (status === "P") return "#2e7d32";
  if (status === "A") return "#c62828";
  if (status === "H") return "#f9a825";
  return "#e0e0e0";
};

const getMonthName = (month: number) =>
  new Date(2026, month).toLocaleString("default", {
    month: "long",
  });

/* ---------- MAIN ---------- */

const TeacherAttendanceHistory: React.FC = () => {
  return (
    <LinearGradient
      colors={["#051e3b", "#3d649a", "#6091d1", "#0e3e79"]}
      locations={[0, 0.3, 0.7, 1]}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* HEADER */}
        <Text style={styles.title}>Attendance History</Text>

        {/* STUDENT CARD */}
        <View style={styles.infoCard}>
          <Text style={styles.name}>{student.name}</Text>
          <Text style={styles.meta}>Roll: {student.rollNo}</Text>
          <Text style={styles.meta}>{student.className}</Text>
          <Text style={styles.meta}>
            Session: {student.session}
          </Text>
        </View>

        {/* LEGEND */}
        <View style={styles.legend}>
          <Legend color="#2e7d32" label="Present" />
          <Legend color="#c62828" label="Absent" />
          <Legend color="#f9a825" label="Holiday" />
        </View>

        {/* MONTH CALENDARS */}
        {months.map((m) => (
          <CalendarMonth key={m.month} data={m} />
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

export default TeacherAttendanceHistory;

/* ---------- CALENDAR MONTH ---------- */

const CalendarMonth = ({ data }: { data: MonthAttendance }) => {
  const firstDay = new Date(
    data.year,
    data.month,
    1
  ).getDay();

  const totalDays = new Date(
    data.year,
    data.month + 1,
    0
  ).getDate();

  const boxes: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  return (
    <View style={styles.monthCard}>
      <Text style={styles.monthTitle}>
        {getMonthName(data.month)} {data.year}
      </Text>

      {/* WEEK HEADER */}
      <View style={styles.weekRow}>
        {weekDays.map((d) => (
          <Text key={d} style={styles.weekDay}>
            {d}
          </Text>
        ))}
      </View>

      {/* DAYS GRID */}
      <View style={styles.grid}>
        {boxes.map((day, i) => {
          const status = day
            ? data.days[day] ?? null
            : null;

          return (
            <View
              key={i}
              style={[
                styles.dayBox,
                {
                  backgroundColor: day
                    ? getColor(status)
                    : "transparent",
                },
              ]}
            >
              {day && (
                <Text style={styles.dayText}>{day}</Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

/* ---------- LEGEND ---------- */

const Legend = ({
  color,
  label,
}: {
  color: string;
  label: string;
}) => (
  <View style={styles.legendItem}>
    <View
      style={[styles.legendColor, { backgroundColor: color }]}
    />
    <Text style={styles.legendText}>{label}</Text>
  </View>
);

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },

  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#072445",
  },

  meta: {
    color: "#555",
    marginTop: 4,
  },

  legend: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  legendColor: {
    width: 14,
    height: 14,
    borderRadius: 4,
  },

  legendText: {
    color: "#fff",
    fontSize: 13,
  },

  monthCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },

  monthTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#072445",
    marginBottom: 8,
  },

  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  weekDay: {
    width: "14.28%",
    textAlign: "center",
    fontSize: 11,
    fontWeight: "600",
    color: "#555",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  dayBox: {
    width: "14.28%",
    aspectRatio: 1,
    marginBottom: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },

  dayText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
});
