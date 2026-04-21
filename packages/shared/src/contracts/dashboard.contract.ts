import * as z from "zod";
import { dashboardFieldTypeSchema } from "../validation/dashboard.schema";

export type DashboardFieldType = z.infer<typeof dashboardFieldTypeSchema>;
