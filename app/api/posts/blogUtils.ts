// blogUtils.ts
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

// Fetch a blog by ID
export async function fetchBlogById(id: string) {
  const blogRef = doc(db, "posts", id);
  const blogSnap = await getDoc(blogRef);

  if (blogSnap.exists()) {
    return { id: blogSnap.id, ...blogSnap.data() }; // Return the blog data with ID
  } else {
    return null; // Return null if the blog does not exist
  }
}
