// import { ID, OAuthProvider, Query } from "appwrite";
// import { account, appwriteConfig, database } from "./client";
// import { redirect } from "react-router";

// export const loginWithGoogle = async () => {
//   try {
//     account.createOAuth2Session(OAuthProvider.Google);
//   } catch (error) {
//     console.log("login", error);
//   }
// };

// export const logoutUser = async () => {
//   try {
//     await account.deleteSession("current");
//     return true;
//   } catch (error) {
//     console.log("logout", error);
//   }
// };

// export const getUser = async () => {
//   try {
//     const user = await account.get();
//     if (!user) return redirect("/sign-in");
//     const { documents } = await database.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       [
//         Query.equal("accountId", user.$id),
//         Query.select(["name", "email", "imageUrl", "joinedAt", "accountId"]),
//       ]
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getGooglePicture = async () => {
//   try {
//     const session = await account.getSession("current");
//     const authToken = session.providerAccessToken;

//     if (!authToken) {
//       console.log("auth token not available");
//       return null;
//     }

//     const response = await fetch(
//       "https://people.googleapis.com/v1/people/me?personFields=photos",
//       {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       console.log("failed to fetch proflie photo");
//       return null;
//     }

//     const data = await response.json();

//     const photoUrl =
//       data.photos && data.photos.length > 0 ? data.photos[0].url : null;
//     return photoUrl;
//   } catch (error) {
//     console.log("getphoto", error);
//   }
// };

// export const storeUserData = async () => {
//   try {
//     const user = await account.get();

//     if (!user) return null;

//     const { documents } = await database.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       [Query.equal("accountId", user.$id)]
//     );

//     if (documents.length > 0) {
//       return documents[0];
//     }

//     const newUser = await database.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       ID.unique(),
//       {
//         accountId: user.$id,
//         email: user.email,
//         name: user.name,
//         imageUrl: imageUrl || "",
//         joinedAt: new Date().toISOString(),
//       }
//     );

//     return newUser;
//   } catch (error) {
//     console.log("store", error);
//   }
// };
// export const getExistingUser = async ($id: string) => {
//   try {
//     const user = await account.get();
//     if (!user) return redirect("/sign-in");

//     const { documents } = await database.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       [
//         Query.equal("accountId", user.$id),
//         Query.select(["name", "email", "imageUrl", "joinedAt", "accountId"]),
//       ]
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

import { ID, OAuthProvider, Query } from "appwrite";
import { account, database, appwriteConfig } from "~/appwrite/client";
import { redirect } from "react-router";

export const getExistingUser = async (id: string) => {
  try {
    const { documents, total } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", id)]
    );
    return total > 0 ? documents[0] : null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const storeUserData = async () => {
  try {
    const user = await account.get();
    if (!user) throw new Error("User not found");

    const { providerAccessToken } = (await account.getSession("current")) || {};
    const profilePicture = providerAccessToken
      ? await getGooglePicture(providerAccessToken)
      : null;

    const createdUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: user.$id,
        email: user.email,
        name: user.name,
        imageUrl: profilePicture,
        joinedAt: new Date().toISOString(),
      }
    );

    if (!createdUser.$id) redirect("/sign-in");
  } catch (error) {
    console.error("Error storing user data:", error);
  }
};

const getGooglePicture = async (accessToken: string) => {
  try {
    const response = await fetch(
      "https://people.googleapis.com/v1/people/me?personFields=photos",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (!response.ok) throw new Error("Failed to fetch Google profile picture");

    const { photos } = await response.json();
    return photos?.[0]?.url || null;
  } catch (error) {
    console.error("Error fetching Google picture:", error);
    return null;
  }
};

export const loginWithGoogle = async () => {
  try {
    account.createOAuth2Session(
      OAuthProvider.Google,
      "http://localhost:5173",
      "http://localhost:5173/sign-in"
    );
  } catch (error) {
    console.error("Error during OAuth2 session creation:", error);
  }
};

export const logoutUser = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

export const getUser = async () => {
  try {
    const user = await account.get();
    if (!user) return redirect("/sign-in");

    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        Query.equal("accountId", user.$id),
        Query.select(["name", "email", "imageUrl", "joinedAt", "accountId"]),
      ]
    );

    return documents.length > 0 ? documents[0] : redirect("/sign-in");
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
