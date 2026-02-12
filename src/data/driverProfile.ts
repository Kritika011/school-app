export type DriverProfile = {
  id: string;
  name: string;
  image: string;
  phone: string;
  email: string;
  licenseNumber: string;
  vehicleNumber: string;
  vehicleType: string;
  routeName: string;
  experience: number;
  address: string;
};

export const driverProfile: DriverProfile = {
  id: "DRV001",
  name: "Suresh Kumar",
  image:
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  phone: "9876543210",
  email: "suresh.driver@gmail.com",
  licenseNumber: "WB12-2023-987654",
  vehicleNumber: "WB 12 AB 3456",
  vehicleType: "School Van",
  routeName: "Rishra – Serampore",
  experience: 6,
  address: "Rishra, Hooghly, West Bengal",
};
