// import { getSong } from "../service/song.api";
// import { SongContext } from "../song.context";
// import { useContext } from "react";

// export const useSong = () => {
//     const context = useContext(SongContext)

//     const { loading, setLoading, song, setSong } = context

//     async function handleGetSong({mood}) {
//         setLoading(true)
//         const data = await getSong({mood})
//         setSong(data.song)
//         setLoading(false)
//     }

//     return ({ loading, song, handleGetSong})
// }







// import { getSong } from "../service/song.api";
// import { SongContext } from "../song.context";
// import { useContext } from "react";


// export const useSong = () => {

//     const context =
//         useContext(SongContext);


//     const {
//         loading,
//         setLoading,
//         song,
//         setSong,
//         setShouldPlay
//     } = context;


//     async function handleGetSong({
//         mood
//     }) {

//         try {

//             setLoading(true);


//             const cleanMood =
//                 mood
//                     ?.toString()
//                     .trim()
//                     .toLowerCase();


//             console.log(
//                 "Fetching song for:",
//                 cleanMood
//             );


//             const data =
//                 await getSong({
//                     mood: cleanMood
//                 });


//             if (data?.song) {

//                 setSong(data.song);

//                 /*
//                   Song automatically play karega
//                 */
//                 setShouldPlay(true);

//             }

//         } catch (error) {

//             console.error(
//                 "Song fetch error:",
//                 error.response?.data ||
//                 error.message
//             );

//         } finally {

//             setLoading(false);

//         }
//     }


//     return {
//         loading,
//         song,
//         handleGetSong
//     };
// };







import { getSong } from "../service/song.api";
import { SongContext } from "../song.context";
import { useContext } from "react";


export const useSong = () => {

    const context = useContext(SongContext);


    const {
        loading,
        setLoading,
        song,
        setSong,
        setShouldPlay
    } = context;


    async function handleGetSong({ mood }) {

        try {

            setLoading(true);


            // Mood ko clean kar rahe hain
            const cleanMood = mood
                ?.toString()
                .trim()
                .toLowerCase();


            if (!cleanMood) {
                console.log("Mood not found");
                return;
            }


            console.log(
                "🎵 Fetching song for mood:",
                cleanMood
            );


            const data = await getSong({
                mood: cleanMood
            });


            console.log(
                "🎵 Song API response:",
                data
            );


            if (data?.song) {

                setSong(data.song);

                // Player ko batana hai ki new song play karna hai
                setShouldPlay(true);

            } else {

                console.log(
                    "No song found for mood:",
                    cleanMood
                );

            }


        } catch (error) {

            console.error(
                "❌ Song fetch error:",
                error.response?.data ||
                error.message
            );

        } finally {

            setLoading(false);

        }
    }


    return {
        loading,
        song,
        handleGetSong
    };
};