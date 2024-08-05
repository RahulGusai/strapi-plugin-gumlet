import { configGumletClient } from '../../server/utils/config';

async function fetchCollectionIdMap(
  collectionIds: string[]
): Promise<{ [key: string]: string }> {
  const client = await configGumletClient();
  const collectionIdMap: { [key: string]: string } = {};

  for (const collectionId of collectionIds) {
    try {
      const response = await client.get(`video/sources/${collectionId}`);
      const collectionName = response.data?.name;
      if (collectionName) {
        collectionIdMap[collectionName] = collectionId;
      }
    } catch (error) {
      console.error(
        `Error fetching collection name for ID ${collectionId}:`,
        error
      );
    }
  }

  return collectionIdMap;
}

export default fetchCollectionIdMap;
