import FireBaseConfig from "./FireBaseConfig";
import {initializeApp} from "firebase/app";
import {deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes} from "firebase/storage";

class FireBase {
    static async uploadImage(file, eventId) {
        const app = initializeApp(FireBaseConfig.getConfig);
        const storage = getStorage(app);
        await this.deleteFolder(eventId);
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
        const folderRef = ref(storage, `images/${eventId}`);
        const files = await listAll(folderRef);

        try {
            await Promise.all(files.items.map(async (item) => {
                await deleteObject(item);
            }));
        } catch (error) {
            console.error("Ошибка при удалении файлов:", error);
        }
    }
}

export default FireBase