import FireBaseConfig from "./FireBaseConfig";
import {initializeApp} from "firebase/app";
import {deleteObject, getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

class FireBase {
    static async uploadImage(file, eventId) {
        const app = initializeApp(FireBaseConfig.getConfig);
        const storage = getStorage(app);
        const storageRef = ref(storage, `images/${eventId}/${file.name}`);
        try {
            const snapshot = await uploadBytes(storageRef, file);
            return await getDownloadURL(snapshot.ref)
        } catch (ex) {
            throw new Error(ex);
        }
    }

    static async deleteFolder(eventId) {
        const app = initializeApp(FireBaseConfig.getConfig);
        const storage = getStorage(app);
        const storageRef = ref(storage, `images/${eventId}`);

        try {
            await deleteObject(storageRef);
            console.log("Folder deleted successfully");
        } catch (error) {
            console.error("Error deleting folder:", error);
        }
    }
}

export default FireBase