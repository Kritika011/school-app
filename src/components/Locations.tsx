import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

export const LOCATION_TASK_NAME = "BACKGROUND_LOCATION_TASK";

// Define the background location task
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error("Background location task error:", error);
    return;
  }

  if (data) {
    const { locations } = data as any;
    console.log("Background Location:", locations);

    // Example: send locations to backend
    // await fetch("https://your-backend.com/api/location", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ locations }),
    // });
  }
});
