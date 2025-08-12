import { Query } from "appwrite";
import { appwriteConfig, database } from "./client";

export const getAllTrips = async (limit: number, offset: number) => {
  const allTrip = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.tripCollectionId,
    [Query.limit(limit), Query.offset(offset), Query.orderDesc("createdAt")]
  );

  if (allTrip.total === 0) {
    console.error("No trips found");
    return { allTrip: [], total: 0 };
  }
  return {
    allTrip: allTrip.documents,
    total: allTrip.total,
  };
};

export const getTripById = async (tripId: string) => {
  const trip = await database.getDocument(
    appwriteConfig.databaseId,
    appwriteConfig.tripCollectionId,
    tripId
  );

  if (!trip.$id) {
    console.log("Trip not found");
    return null;
  }

  return trip;
};
