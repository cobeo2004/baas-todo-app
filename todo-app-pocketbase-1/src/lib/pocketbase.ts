import PocketBase from "pocketbase";
import { TypedPocketBase } from "./types/pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL) as TypedPocketBase;

if (process.env.NODE_ENV === "development") pb.autoCancellation(false);

export { pb };
