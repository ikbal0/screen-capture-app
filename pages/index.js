import Head from 'next/head'

export default function Home() {

  const displayMediaOptions = {
    video: true,
    audio: true
  };
  
  async function startCapture() {

    if (document.getElementById("videoView").srcObject == null){
      try {

        const data = []

        const myElement = document.getElementById("videoView");
        const stream = myElement.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
      
        const mediaRecorder = new MediaRecorder(stream)

        mediaRecorder.ondataavailable = (e) => {
          data.push(e.data)
        }

        mediaRecorder.start()

        mediaRecorder.onstop = (e) => {
          document.getElementById("videoView").src = URL.createObjectURL(
            new Blob(data, {
              type: data[0].type
            })
          )
        }
      
      } catch (error) {
        console.error(`Error: ${error}`)
      }
    } else {
      alert('no')
    }
  }


  function stopCapture(evt) {
    try {
      let tracks = document.getElementById("videoView").srcObject.getTracks();
    
      tracks.forEach((track) => track.stop());
      document.getElementById("videoView").srcObject = null;
    } catch (error) {
      alert('no')
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className='text-center'>
        <h3>Record</h3>

        <div>
          <button onClick={() => startCapture()}>Start</button>
          <button onClick={() => stopCapture()}>stop</button>
          <video id='videoView' className="h-52 w-full" autoPlay/>
        </div>
        </div>
      </main>
    </>
  )
}
