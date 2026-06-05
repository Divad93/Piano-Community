const SUPABASE_URL = "https://zwfcngrxckzutwyvanol.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3ZmNuZ3J4Y2t6dXR3eXZhbm9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2MDIwMjAsImV4cCI6MjA5NjE3ODAyMH0.fsDFDBq4goHEd1psJijNetJeo0srmKi4XT6f-RhQTXk";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

// UI
const loginBtn = document.getElementById("loginBtn");
const uploadBereich = document.getElementById("uploadBereich");
const audioInput = document.getElementById("audioFile");

// --------------------
// UPLOAD
// --------------------
async function uploadFile() {
  const file = audioInput.files[0];

  if (!file) return alert("Datei fehlt 🎵");

  const fileName = Date.now() + "-" + file.name;

  const { error } = await supabase.storage
    .from("recordings")
    .upload(fileName, file);

  if (error) {
    return alert(error.message);
  }

  const { data } = supabase.storage
    .from("recordings")
    .getPublicUrl(fileName);

  await supabase.from("recordings").insert([
    {
      title: file.name,
      audio_url: data.publicUrl
    }
  ]);

  alert("Upload fertig 🎹");

  loadRecordings();
}

// --------------------
// LOAD RECORDINGS
// --------------------
async function loadRecordings() {
  const container = document.getElementById("recordings");
  container.innerHTML = "";

  const { data } = await supabase
    .from("recordings")
    .select("*")
    .order("id", { ascending: false });

  data.forEach(r => {
    const div = document.createElement("div");
    div.className = "recording";

    div.innerHTML = `
      <h3>🎵 ${r.title}</h3>
      <audio controls src="${r.audio_url}"></audio>
    `;

    container.appendChild(div);
  });
}

// START
loadRecordings();
