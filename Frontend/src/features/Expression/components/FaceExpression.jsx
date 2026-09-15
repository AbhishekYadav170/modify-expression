// import { useEffect, useRef, useState } from "react";
// import {detect,init } from "../utils/utils";

// export default function FaceExpression({ onClick = () => { }}) {
//   const videoRef = useRef(null);
//   const landmarkerRef = useRef(null);
//   const animationRef = useRef(null);
//   const streamRef = useRef(null);

//   const [expression, setExpression] = useState("Detecting...");

  

//   useEffect(() => {
    

//     init({landmarkerRef, videoRef, streamRef });

//     return () => {
//       // if (animationRef.current) {
//       //   cancelAnimationFrame(animationRef.current)
//       // }
//       if (landmarkerRef.current) {
//         landmarkerRef.current.close();
//       }

//       if (videoRef.current?.srcObject) {
//         videoRef.current.srcObject
//         .getTracks()
//         .forEach((track) => track.stop());
//       }
//     };
//   }, []);

//    async function handleClick() {
//         const expression = detect({ landmarkerRef, videoRef, setExpression })
//         console.log(expression)
//         onClick(expression)
//     }

//   return (
//     <div style={{ textAlign: "center"}}>
//       <video
//         ref={videoRef}
//         style={{ width: "400px", borderRadius: "12px" }}
//         playsInline
//         // muted
//         />
//         <h2>{expression}</h2>
//         {/* <button onClick={()=>{detect({landmarkerRef, videoRef, setExpression})}}> Detect expression </button> */}
//          <button onClick={handleClick} >Detect expression</button>
//     </div>
//   );


// }



import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";

const moodData = {
    happy: {
        emoji: "😊",
        title: "Happy",
        description: "Let's find some feel-good music for you."
    },

    sad: {
        emoji: "😔",
        title: "Sad",
        description: "We've got some calm music for this moment."
    },

    surprised: {
        emoji: "😮",
        title: "Surprised",
        description: "Time for something energetic and exciting."
    },

    neutral: {
        emoji: "😐",
        title: "Neutral",
        description: "Let's find something that fits your vibe."
    }
};


export default function FaceExpression({
    onClick = () => {}
}) {

    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] =
        useState("Ready");

    const [detectedMood, setDetectedMood] =
        useState(null);

    const [isDetecting, setIsDetecting] =
        useState(false);

    const [cameraReady, setCameraReady] =
        useState(false);


    useEffect(() => {

        const startCamera = async () => {

            try {

                await init({
                    landmarkerRef,
                    videoRef,
                    streamRef
                });

                setCameraReady(true);

            } catch (error) {

                console.error(
                    "Camera error:",
                    error
                );

            }
        };


        startCamera();


        return () => {

            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {

                videoRef.current.srcObject
                    .getTracks()
                    .forEach(
                        (track) => track.stop()
                    );
            }
        };

    }, []);


    const handleDetect = () => {

        if (
            !landmarkerRef.current ||
            !videoRef.current
        ) {
            return;
        }


        setIsDetecting(true);


        const result = detect({
            landmarkerRef,
            videoRef,
            setExpression
        });


        if (result) {

            setDetectedMood(result);

            /*
              Music fetch
            */
            onClick(result);

        }


        setTimeout(() => {
            setIsDetecting(false);
        }, 600);
    };


    const mood =
        detectedMood
            ? moodData[detectedMood]
            : null;


    return (
        <div className="expression-scanner">

            {/* CAMERA STATUS */}

            <div className="scanner-status">

                <div className="scanner-status-left">

                    <span
                        className={
                            cameraReady
                                ? "camera-dot ready"
                                : "camera-dot"
                        }
                    />

                    <span>
                        {cameraReady
                            ? "Camera connected"
                            : "Connecting camera..."}
                    </span>

                </div>


                <span className="scanner-live">
                    LIVE
                </span>

            </div>


            {/* VIDEO */}

            <div className="video-container">

                <video
                    ref={videoRef}
                    className="expression-video"
                    playsInline
                    muted
                />


                <span className="scan-corner top-left" />
                <span className="scan-corner top-right" />
                <span className="scan-corner bottom-left" />
                <span className="scan-corner bottom-right" />


                {isDetecting && (
                    <div className="scan-overlay">

                        <div className="scan-spinner" />

                        <span>
                            Analyzing expression...
                        </span>

                    </div>
                )}


                <div className="scan-line" />

            </div>


            {/* MOOD RESULT */}

            <div
                className={
                    detectedMood
                        ? "mood-result active"
                        : "mood-result"
                }
            >

                {!mood ? (

                    <>

                        <div className="mood-placeholder-icon">
                            ✦
                        </div>

                        <div>

                            <span>
                                YOUR MOOD
                            </span>

                            <strong>
                                Detect your expression
                            </strong>

                        </div>

                    </>

                ) : (

                    <>

                        <div className="mood-emoji-large">
                            {mood.emoji}
                        </div>


                        <div className="mood-result-text">

                            <span>
                                DETECTED MOOD
                            </span>

                            <strong>
                                {mood.title}
                            </strong>

                            <p>
                                {mood.description}
                            </p>

                        </div>


                        <div className="mood-check">
                            ✓
                        </div>

                    </>

                )}

            </div>


            {/* BUTTON */}

            <button
                className="detect-button"
                onClick={handleDetect}
                disabled={
                    !cameraReady ||
                    isDetecting
                }
            >

                <span className="detect-button-icon">

                    {isDetecting
                        ? "◌"
                        : "✦"}

                </span>


                {isDetecting
                    ? "Analyzing..."
                    : detectedMood
                        ? "Detect Again"
                        : "Detect My Expression"}

            </button>

        </div>
    );
}
