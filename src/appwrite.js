import {Client, Databases, ID, Query, Account} from "appwrite"

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// const client = new Client().setEndpoint("https://cloud.appwrite.io/v1").setProject(PROJECT_ID)
export const client = new Client().setEndpoint("https://cloud.appwrite.io/v1").setProject(PROJECT_ID)

// for user authentication
export const account = new Account(client);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    // console.log(PROJECT_ID, DATABASE_ID, COLLECTYION_ID);

    // Use APpwrite SDK to check if the search term exists in the databnase
    try{
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal("searchTerm", searchTerm),
        ])
        // console.log("appwrite: ", result)
        // if it does, update the count
        if(result.documents.length > 0){
            const doc = result.documents[0];

            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,
            })
        // if it doesn't, create a new document with the search term and count as 1
        } else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            })
        }
    } catch(error){
        console.log(error)
    }
}

export const getTrendingMovies = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
            Query.limit(5),
            Query.orderDesc("count")
        ])
        // console.log("result in getTrendingMovies", result)
        return result.documents;
    } catch (error) {
        console.log(error)
    }
}